#!/usr/bin/env python3
"""Reproducible HTML/architecture audit; no dependencies beyond Python 3 and repo Node packages."""
import argparse
import concurrent.futures
import datetime
import json
import re
import subprocess
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from collections import Counter, deque
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG_JS = r'''
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),ts=require('typescript');
const cache=new Map();
function load(relative){const filename=path.resolve(relative);if(cache.has(filename))return cache.get(filename);const exports={};cache.set(filename,exports);const code=ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;vm.runInThisContext('(function(require,exports){'+code+'\n})',{filename})(id=>load(path.resolve(path.dirname(filename),id+'.ts')),exports);return exports;}
const {publishedPaths}=load('content/data/publication.ts');
const {routes}=load('content/data/navigation.ts');
const {finishes}=load('content/data/finishes.ts');
console.log(JSON.stringify({published:[...new Set(publishedPaths)],routes:[...routes,...finishes.map(f=>({path:'/finishes/'+f.code.toLowerCase(),title:f.name,index:false}))]}));
'''
VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}

def clean(value):
    return ' '.join(value.split())

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.stack=[]; self.title=[]; self.h1=[]; self.meta={}; self.canonicals=[]; self.ids=set()
        self.links=[]; self.images=[]; self.schemas=[]; self.schema_errors=[]; self.lang=''; self.main_text=[]
        self.feed(html)
    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs)
        if tag=='br':self.handle_data(' ')
        if tag=='html': self.lang=attrs.get('lang','')
        if attrs.get('id'): self.ids.add(attrs['id'])
        if tag=='meta': self.meta.setdefault(attrs.get('name',attrs.get('property','')).lower(),[]).append(attrs.get('content',''))
        if tag=='link' and attrs.get('rel')=='canonical': self.canonicals.append(attrs.get('href',''))
        in_main=any(e['tag']=='main' for e in self.stack)
        in_nav=any(e['tag']=='nav' for e in self.stack)
        if tag=='a': self.links.append({'href':attrs.get('href',''),'contextual':in_main and not in_nav})
        if tag=='img': self.images.append(attrs)
        if tag not in VOID: self.stack.append({'tag':tag,'attrs':attrs,'text':[]})
    def handle_endtag(self, tag):
        index=next((i for i in range(len(self.stack)-1,-1,-1) if self.stack[i]['tag']==tag),None)
        if index is None:return
        element=self.stack[index]; del self.stack[index:]
        value=''.join(element['text'])
        if tag=='title':self.title.append(clean(value))
        if tag=='h1':self.h1.append(clean(value))
        if tag=='script' and element['attrs'].get('type')=='application/ld+json':
            try:self.schemas.append(json.loads(value))
            except ValueError as exc:self.schema_errors.append(str(exc))
    def handle_data(self, data):
        for item in self.stack:item['text'].append(data)
        if any(e['tag']=='main' for e in self.stack) and not any(e['tag'] in ('script','style','nav') for e in self.stack):self.main_text.append(data)

def crawl_allowed(path, robots):
    # This site's single wildcard group. Longest match wins; Allow wins ties.
    matches=[]
    for line in robots.splitlines():
        key,sep,pattern=line.partition(':')
        if sep and key.lower() in ('allow','disallow'):
            pattern=pattern.strip()
            if not pattern:continue
            expression='^'+re.escape(pattern).replace(r'\*','.*').replace(r'\$','$')
            if re.search(expression,path):matches.append((len(pattern.rstrip('$')),key.lower()=='allow'))
    return max(matches,default=(0,True))[1]

def schema_nodes(schemas):
    for schema in schemas:
        if isinstance(schema,list):yield from schema_nodes(schema)
        elif isinstance(schema,dict):
            yield schema
            if '@graph' in schema:yield from schema_nodes(schema['@graph'])

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base',default='https://cladvera.vercel.app')
    parser.add_argument('--canonical-origin',default='https://cladvera.vercel.app',help='Expected canonical origin, independent of the crawled site')
    parser.add_argument('--output',required=True)
    args=parser.parse_args(); base=args.base.rstrip('/')
    config=json.loads(subprocess.check_output(['node','-e',CONFIG_JS],cwd=ROOT,text=True))
    routes={r['path']:r for r in config['routes']}; published=set(config['published'])
    def fetch(path, attempt=0):
        req=urllib.request.Request(base+path,headers={'User-Agent':'Cladvera-SEO-Audit/1.0'})
        redirects=[]
        class RedirectRecorder(urllib.request.HTTPRedirectHandler):
            def redirect_request(self, request, fp, code, msg, headers, newurl):
                redirects.append({'status':code,'destination':newurl})
                return super().redirect_request(request,fp,code,msg,headers,newurl)
        try:
            with urllib.request.build_opener(RedirectRecorder()).open(req,timeout=40) as response:
                raw=response.read().decode('utf-8',errors='replace') if any(t in response.headers.get('Content-Type','') for t in ('text','xml','json')) else ''
                return {'path':path,'status':response.status,'redirects':redirects,'final_url':response.url,'headers':dict(response.headers),'raw':raw,'page':Page(raw) if 'text/html' in response.headers.get('Content-Type','') else None}
        except urllib.error.HTTPError as exc:
            raw=exc.read().decode('utf-8',errors='replace')
            return {'path':path,'status':exc.code,'error':str(exc),'headers':dict(exc.headers),'raw':raw,'page':Page(raw) if 'text/html' in exc.headers.get('Content-Type','') else None}
        except Exception as exc:
            if attempt < 2:return fetch(path, attempt+1)
            return {'path':path,'status':0,'error':str(exc),'page':None}
    extras=['/robots.txt','/sitemap.xml','/?utm_source=seo-audit','/products?category=mcm','/technical-resources?application=facade','/samples?products=taktl-facade&intent=sample','/request-quote?intent=documents']
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool: results={r['path']:r for r in pool.map(fetch,list(routes)+extras)}
    failed=[(p,r.get('error')) for p,r in results.items() if r['status']==0]
    if failed:raise RuntimeError(f'Incomplete crawl; do not score: {failed}')
    robots=results['/robots.txt'].get('raw','')
    sitemap_root=ET.fromstring(results['/sitemap.xml'].get('raw',''))
    sitemap=[node.text for node in sitemap_root.iter() if node.tag.endswith('}loc')]
    origin=args.canonical_origin.rstrip('/')
    canonical_origin=urllib.parse.urlsplit(origin)
    def local(href,source):
        url=urllib.parse.urlsplit(urllib.parse.urljoin(base+source,href))
        if url.scheme not in ('http','https') or url.netloc not in (urllib.parse.urlsplit(base).netloc,canonical_origin.netloc):return None
        return (url.path or '/')+('?' +url.query if url.query else ''),urllib.parse.unquote(url.fragment)
    all_links={}; targets=set()
    for path in published:
        page=results[path]['page']
        all_links[path]=[(link,local(link['href'],path)) for link in page.links] if page else []
        targets.update(target[0] for _,target in all_links[path] if target)
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        for result in pool.map(fetch,sorted(targets-set(results))):results[result['path']]=result
    failed=[(p,r.get('error')) for p,r in results.items() if r['status']==0]
    if failed:raise RuntimeError(f'Incomplete link crawl; do not score: {failed}')
    graph={}; incoming={path:set() for path in published}; contextual={path:set() for path in published}
    broken={path:[] for path in published}
    for path,links in all_links.items():
        graph[path]=set()
        for link,target in links:
            if not target:continue
            target_path,fragment=target; dest=results[target_path]
            if dest['status']!=200 or (fragment and dest['page'] and fragment not in dest['page'].ids):broken[path].append(link['href'])
            if target_path in published and target_path!=path:
                graph[path].add(target_path); incoming[target_path].add(path)
                if link['contextual']:contextual[target_path].add(path)
    depth={'/':0}; queue=deque(['/'])
    while queue:
        path=queue.popleft()
        for target in graph.get(path,[]):
            if target not in depth:depth[target]=depth[path]+1;queue.append(target)
    indexed=[p for p,r in routes.items() if p in published and r['index']]
    titles=Counter(results[p]['page'].title[0] for p in indexed if results[p]['page'] and results[p]['page'].title)
    descriptions=Counter(results[p]['page'].meta.get('description',[''])[0] for p in indexed if results[p]['page'])
    rows=[]
    for path,route in routes.items():
        result=results[path];page=result['page'];role='indexable' if path in indexed else 'utility' if path in published else 'redirect' if result.get('redirects') else 'draft'
        hops=result.get('redirects',[])
        row={'path':path,'url':origin+path,'role':role,'status':hops[0]['status'] if hops else result['status'],'redirects':hops,'final_status':result['status'],'crawl_allowed':crawl_allowed(path,robots),'in_sitemap':origin+path in sitemap,'score':None}
        if not page:
            row['error']=result.get('error','No HTML')
            if role=='indexable':row.update(score=0,issues=['Expected indexable HTML page unavailable'])
            else:row['exclusion_confirmed']=row['crawl_allowed'] and result['status']==404 and not row['in_sitemap']
            rows.append(row)
            continue
        title=page.title[0] if page.title else '';description=page.meta.get('description',[''])[0];meta_robots=','.join(page.meta.get('robots',[])+page.meta.get('googlebot',[])).lower()
        nodes=list(schema_nodes(page.schemas));types=[n.get('@type') for n in nodes]
        row.update(title=title,title_length=len(title),description=description,description_length=len(description),h1=page.h1,robots=meta_robots,canonical=page.canonicals,schemas=types,depth=depth.get(path),incoming_pages=len(incoming.get(path,[])),contextual_incoming=sorted(contextual.get(path,[])),broken_links=sorted(set(broken.get(path,[]))))
        if role=='indexable':
            checks=[]
            def check(group,label,weight,ok):checks.append({'group':group,'check':label,'weight':weight,'passed':bool(ok)})
            check('Crawl','HTTP 200 at requested path',5,result['status']==200 and urllib.parse.urlsplit(result['final_url']).path==path)
            check('Crawl','Canonical URL crawlable',10,row['crawl_allowed'])
            check('Crawl','Index permitted by HTML and HTTP',10,'noindex' not in meta_robots and 'noindex' not in str(result['headers'].get('x-robots-tag',result['headers'].get('X-Robots-Tag',''))).lower())
            check('Crawl','Present once in sitemap',5,sitemap.count(origin+path)==1)
            check('Metadata','Unique title within project limit',8,len(page.title)==1 and 0<len(title)<=60 and titles[title]==1)
            check('Metadata','Unique description within project limits',6,len(page.meta.get('description',[]))==1 and 120<=len(description)<=160 and descriptions[description]==1)
            check('Metadata','Single clean self canonical',6,len(page.canonicals)==1 and urllib.parse.urlsplit(page.canonicals[0])._replace(path=urllib.parse.urlsplit(page.canonicals[0]).path or '/')==urllib.parse.urlsplit(origin+path))
            check('Architecture','At least two contextual incoming pages',8,len(contextual[path])>=2 or path=='/')
            check('Architecture','Reachable within two link steps',4,path in depth and depth[path]<=2)
            check('Architecture','Contextual onward link to another search page',4,any(link['contextual'] and target and target[0] in indexed and target[0]!=path for link,target in all_links[path]))
            check('Architecture','Internal links and fragments resolve',4,not broken[path])
            check('Semantics','One nonempty H1',6,len(page.h1)==1 and bool(page.h1[0]))
            check('Semantics','Page entity present with URL and website relationship',8,not page.schema_errors and any(n.get('@type') in ('WebPage','CollectionPage','ItemPage','AboutPage','ContactPage') and n.get('url')==origin+path and n.get('isPartOf',{}).get('@id')==origin+'/#website' for n in nodes))
            check('Semantics','Breadcrumb hierarchy (home exempt)',6,path=='/' or any(n.get('@type')=='BreadcrumbList' and len(n.get('itemListElement',[]))>=2 and n['itemListElement'][-1].get('item')==origin+path for n in nodes))
            check('Access','English document language',3,page.lang=='en')
            check('Access','Image alt attributes present (empty decorative alt allowed)',3,all('alt' in img for img in page.images))
            check('Access','Server-rendered main text',4,bool(clean(' '.join(page.main_text))))
            row.update(score=sum(c['weight'] for c in checks if c['passed']),checks=checks,issues=[c['check'] for c in checks if not c['passed']])
        else:row['exclusion_confirmed']=row['crawl_allowed'] and (result['status']==404 or 'noindex' in meta_robots or role=='redirect') and not row['in_sitemap']
        rows.append(row)
    queries=[]
    for path in extras[2:]:
        page=results[path]['page']
        queries.append({'path':path,'status':results[path]['status'],'crawl_allowed':crawl_allowed(path,robots),'canonical':page.canonicals if page else [],'robots':page.meta.get('robots',[]) if page else []})
    summary={'page_urls':len(rows),'indexable':len(indexed),'utility':sum(r['role']=='utility' for r in rows),'redirect':sum(r['role']=='redirect' for r in rows),'draft':sum(r['role']=='draft' for r in rows),'sitemap_urls':len(sitemap),'average_score':round(sum(r['score'] for r in rows if r['score'] is not None)/len(indexed),1),'unique_link_targets_checked':len(targets),'broken_links':sum(len(r.get('broken_links',[])) for r in rows),'unreachable_indexable':[p for p in indexed if p not in depth]}
    report={'captured_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'base':base,'canonical_origin':origin,'rubric_version':1,'summary':summary,'pages':rows,'query_checks':queries}
    output=Path(args.output);output.parent.mkdir(parents=True,exist_ok=True);output.write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(summary,indent=2))
    for row in rows:
        if row.get('issues'):print(row['path'],row['score'],':','; '.join(row['issues']))

if __name__=='__main__':main()

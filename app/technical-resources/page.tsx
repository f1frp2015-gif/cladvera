import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Badge, Breadcrumbs, Cta, Section } from "@/components/ui";
import { catalogApplications, catalogCategories, catalogProducts, productRequestHref } from "@/content/data/catalog";
import { filterTechnicalResources, resourceAvailability } from "@/content/data/technical-resources";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const path = "/technical-resources";
const description = "Find architectural panel technical documents for UHPC, metal composite, HPL and GFRP. Review manufacturer sources and request product data and test reports.";
export const metadata = buildPageMetadata({ title: "Architectural Panel Technical Documents | Cladvera", description, path });

const reviewSet = [
  { title: "Product identity and construction", body: "Name the manufacturer, family, offered grade, core, faces, thickness, size and finish. Record the document date and revision.", note: "Product data / offered construction" },
  { title: "Performance evidence", body: "Request relevant reports for the actual construction and project jurisdiction. Match the test method, specimen, results and assembly to the proposal.", note: "Reports / project requirements" },
  { title: "Interfaces and installation", body: "Coordinate fixing details, supporting structure, joints, movement, substrate and installation responsibilities. Request project details where needed.", note: "Attachments / assembly coordination" },
  { title: "Samples and closeout", body: "Agree physical finish references, mock-up requirements, care guidance and warranty terms for the ordered product.", note: "Physical references / care / terms" },
];

const inputClass = "mt-[10px] min-h-[48px] w-full min-w-0 rounded-none border-0 border-b border-line-strong bg-transparent px-0 py-[12px] text-f14 font-normal normal-case tracking-normal text-ink focus:border-accent";
const textLinkClass = "inline-flex min-h-[44px] items-center gap-[10px] text-f14 text-ink underline decoration-line-strong underline-offset-4 hover:text-accent";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const get = (key: string) => typeof params[key] === "string" ? params[key] as string : "";
  const filters = { q: get("q"), category: get("category"), application: get("application"), availability: get("availability") };
  const products = filterTechnicalResources(filters);
  const linkedCount = catalogProducts.filter(product => product.documentUrl).length;
  const hasFilters = Object.values(filters).some(Boolean);
  const activeFilters = [
    { key: "q", label: filters.q && `Search: ${filters.q}` },
    { key: "category", label: catalogCategories.find(category => category.id === filters.category)?.label || filters.category },
    { key: "application", label: catalogApplications.find(application => application.id === filters.application)?.label || filters.application },
    { key: "availability", label: resourceAvailability.find(status => status.id === filters.availability)?.label || filters.availability },
  ].filter(filter => filter.label);
  function withoutFilter(key: string) {
    const query = new URLSearchParams(Object.entries(filters).filter(([name, value]) => name !== key && value));
    return `${path}${query.size ? `?${query}` : ""}#resource-results`;
  }

  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Panel documents and technical resources", description, path, type: "CollectionPage" })} />
      <header className="border-b border-line bg-paper">
        <div className="site-container pb-[48px] pt-[24px] md:pb-[64px] md:pt-[32px]">
          <Breadcrumbs items={[{ name: "Technical resources", path }]} />
          <div className="mt-[48px] grid gap-[36px] md:mt-[68px] lg:grid-cols-[1.4fr_0.8fr] lg:items-end lg:gap-[80px]">
            <div>
              <p className="eyebrow mb-[22px]">Cladvera / Technical library</p>
              <h1 className="text-[clamp(2.5rem,5.4vw,4.75rem)] font-medium leading-[1.04] tracking-[-0.055em]">Architectural panel <br /><span className="editorial-serif tracking-[-0.04em]">technical documents</span></h1>
            </div>
            <div>
              <p className="max-w-[460px] text-f18 leading-[1.7] text-ink-2">Start with the source. Find product literature, see what is linked and define the evidence your project needs.</p>
              <Link href="#document-register" className={`${textLinkClass} mt-[20px]`}>Browse the document register <span aria-hidden="true">↓</span></Link>
            </div>
          </div>
          <dl className="mt-[44px] grid gap-[24px] border-t border-line pt-[24px] sm:grid-cols-3 md:mt-[56px]">
            {[
              { label: "Product families", count: catalogProducts.length },
              { label: "With a source file linked", count: linkedCount },
              { label: "Documents by request", count: catalogProducts.length - linkedCount },
            ].map(item => (
              <div key={item.label} className="flex items-baseline gap-[16px]"><dt className="order-2 max-w-[170px] font-mono text-[10px] uppercase leading-[1.6] tracking-[0.08em] text-ink-3">{item.label}</dt><dd className="text-[32px] font-normal tracking-[-0.04em]">{String(item.count).padStart(2, "0")}</dd></div>
            ))}
          </dl>
        </div>
      </header>

      <Section id="document-register">
        <form key={JSON.stringify(filters)} action={`${path}#resource-results`} method="get" aria-label="Filter technical resources" className="border-y border-line-strong py-[28px] md:py-[32px]">
          <div className="mb-[28px] flex flex-wrap items-baseline justify-between gap-[16px]">
            <h2 className="text-f24 font-medium tracking-[-0.035em]">Find product documents.</h2>
            <Link href="#review-package" className="text-f12 text-ink-2 underline underline-offset-4 hover:text-accent">What to include in a review package ↓</Link>
          </div>
          <div className="grid gap-[24px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-[32px]">
            <label className="min-w-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">Search the register<input name="q" type="search" defaultValue={filters.q} placeholder="Product, manufacturer or document" className={inputClass} /></label>
            <label className="min-w-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">Material / product role
              <select name="category" defaultValue={filters.category} className={inputClass}>
                <option value="">All materials & components</option>
                {filters.category && !catalogCategories.some(item => item.id === filters.category) && <option value={filters.category}>Unknown material: {filters.category}</option>}
                {catalogCategories.map(category => <option value={category.id} key={category.id}>{category.label}</option>)}
              </select>
            </label>
            <label className="min-w-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">Application
              <select name="application" defaultValue={filters.application} className={inputClass}>
                <option value="">All applications</option>
                {filters.application && !catalogApplications.some(item => item.id === filters.application) && <option value={filters.application}>Unknown application: {filters.application}</option>}
                {catalogApplications.map(application => <option value={application.id} key={application.id}>{application.label}</option>)}
              </select>
            </label>
            <label className="min-w-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">Document access
              <select name="availability" defaultValue={filters.availability} className={inputClass}>
                <option value="">All document access</option>
                {filters.availability && !resourceAvailability.some(item => item.id === filters.availability) && <option value={filters.availability}>Unknown access: {filters.availability}</option>}
                {resourceAvailability.map(status => <option value={status.id} key={status.id}>{status.label}</option>)}
              </select>
            </label>
          </div>
          <div className="mt-[28px] flex flex-wrap items-center gap-[24px]">
            <button type="submit" className="inline-flex min-h-[48px] items-center gap-[32px] bg-ink px-[22px] py-[12px] text-f14 font-medium text-paper hover:bg-accent">Find documents <span aria-hidden="true">→</span></button>
            <Link href={`${path}#resource-results`} className={textLinkClass}>Reset filters</Link>
          </div>
        </form>

        <div id="resource-results" className="mb-[28px] mt-[48px] md:mt-[64px]">
          <div className="flex flex-wrap items-baseline justify-between gap-[16px]">
            <h2 className="text-[30px] font-medium leading-[1.15] tracking-[-0.04em] md:text-[40px]">Document register <span className="ml-[8px] align-top font-mono text-f12 text-accent">({products.length})</span></h2>
            <p className="text-f12 text-ink-3">{hasFilters ? `${products.length} of ${catalogProducts.length}` : catalogProducts.length} product families</p>
          </div>
          <p className="mt-[14px] max-w-[760px] text-f14 text-ink-2">A linked file is a starting reference. Confirm its scope and current revision for the offered product; additional reports and project details may still be needed.</p>
          {hasFilters && <nav aria-label="Active resource filters" className="mt-[24px] flex flex-wrap gap-[10px]">{activeFilters.map(filter => <Link key={filter.key} href={withoutFilter(filter.key)} aria-label={`Remove filter: ${filter.label}`} className="inline-flex min-h-[44px] max-w-full items-center gap-[18px] border border-line-strong px-[14px] py-[10px] text-f12 text-ink-2 hover:border-accent hover:text-accent"><span className="break-words [overflow-wrap:anywhere]">{filter.label}</span><span aria-hidden="true">×</span></Link>)}</nav>}
        </div>

        {products.length ? <div className="border-t border-line-strong">
          {products.map(product => {
            const category = catalogCategories.find(item => item.id === product.category);
            const isExternalSource = product.sourceUrl.startsWith("http");
            const index = catalogProducts.findIndex(item => item.id === product.id) + 1;
            return (
              <article key={product.id} id={product.id} className="grid min-w-0 gap-[24px] border-b border-line py-[32px] md:py-[40px] lg:grid-cols-[0.85fr_1.1fr_0.8fr] lg:gap-[40px]">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.07em] text-ink-3">{String(index).padStart(2, "0")} / {product.manufacturer}</p>
                  <h3 className="mt-[14px] text-[25px] font-medium leading-[1.2] tracking-[-0.035em]"><Link href={product.path} className="hover:text-accent">{product.name}</Link></h3>
                  {category && <Link href={category.path} className="mt-[16px] inline-flex min-h-[36px] items-center text-f12 text-accent hover:underline">{category.label}</Link>}
                </div>
                <div>
                  <Badge tone={product.documentUrl ? "accent" : "neutral"}>{product.documentUrl ? "Source file linked" : "Documents by request"}</Badge>
                  <p className="mt-[14px] text-f14 leading-[1.7] text-ink-2">{product.documentation}</p>
                  {product.documentUrl && <a href={product.documentUrl} target="_blank" rel="noopener noreferrer" className={`${textLinkClass} mt-[12px] font-medium`}><span>{product.documentLabel ?? "Open source document"}{/\.pdf(?:$|[?#])/i.test(product.documentUrl) && <span className="ml-[8px] font-mono text-[10px] text-ink-3">PDF</span>}</span><span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>}
                  <div><a href={product.sourceUrl} target={isExternalSource ? "_blank" : undefined} rel={isExternalSource ? "noopener noreferrer" : undefined} className={`${textLinkClass} mt-[6px] text-ink-2`}>{isExternalSource ? "Manufacturer source" : "Supplier document context"}<span className="sr-only"> for {product.name}{isExternalSource ? " (opens in a new tab)" : ""}</span><span aria-hidden="true">{isExternalSource ? "↗" : "→"}</span></a></div>
                </div>
                <div className="border-t border-line pt-[20px] lg:border-l lg:border-t-0 lg:pl-[24px] lg:pt-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">Confirm for your project</p>
                  <p className="mt-[12px] text-f14 leading-[1.7] text-ink-2">{product.confirm}</p>
                  <Link href={productRequestHref(product.id, "documents")} className="mt-[16px] inline-flex min-h-[44px] items-center gap-[18px] text-f14 font-medium text-accent hover:underline">Request documents<span className="sr-only"> for {product.name}</span><span aria-hidden="true">→</span></Link>
                </div>
              </article>
            );
          })}
        </div> : <div className="border-y border-line bg-paper-2 px-[24px] py-[48px] text-center">
          <h3 className="text-f24 font-medium tracking-[-0.025em]">No product families match these filters</h3>
          <p className="mx-auto mt-[12px] max-w-[520px] text-f14 text-ink-2">Try a product or manufacturer name, choose another material, or request help with the documents your project needs.</p>
          <div className="mt-[24px] flex flex-wrap justify-center gap-[24px]"><Cta href={`${path}#resource-results`} variant="secondary">Clear all filters</Cta><Cta href="/request-quote?intent=documents" variant="ghost">Request document assistance →</Cta></div>
        </div>}
      </Section>

      <Section id="review-package" tone="muted">
        <div className="mb-[40px] grid gap-[28px] lg:grid-cols-2 lg:items-end lg:gap-[80px]">
          <div><p className="eyebrow">A project review / Four parts</p><h2 className="editorial-title mt-[18px]">Build the<br /><span className="editorial-serif">review package.</span></h2></div>
          <p className="max-w-[480px] text-f16 text-ink-2">Use these four groups to describe the information your team needs. The document scope and availability are confirmed for the named product.</p>
        </div>
        <div className="grid gap-x-[40px] gap-y-[32px] md:grid-cols-2">
          {reviewSet.map((item, index) => <div key={item.title} className="border-t border-line-strong pt-[20px]"><p className="font-mono text-f12 text-accent">0{index + 1}</p><h3 className="mt-[18px] text-f24 font-medium tracking-[-0.025em]">{item.title}</h3><p className="mt-[12px] max-w-[520px] text-f14 leading-[1.7] text-ink-2">{item.body}</p><p className="mt-[20px] font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">{item.note}</p></div>)}
        </div>
        <aside className="mt-[44px] grid gap-[18px] border-t border-line pt-[24px] lg:grid-cols-[0.8fr_1.4fr] lg:gap-[80px]">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.08em]">CAD, BIM and specification files</h3>
          <p className="max-w-[680px] text-f14 text-ink-2">Include the required format and intended use in your request. File availability, product coverage and revision are confirmed by the source. A linked data sheet does not imply that CAD, BIM or a project specification is also available.</p>
        </aside>
        <div className="mt-[32px] flex flex-wrap gap-[12px]"><Cta href="/request-quote?intent=documents">Request a document package</Cta><Cta href="/compare" variant="secondary">Review your shortlist</Cta></div>
      </Section>

      <Section>
        <div className="grid gap-[28px] md:grid-cols-[1fr_1.4fr] md:gap-[64px]">
          <h2 className="text-[30px] font-medium leading-[1.15] tracking-[-0.035em]">Use the evidence.<br />Define the next decision.</h2>
          <div className="flex flex-wrap items-start gap-x-[32px] gap-y-[12px]"><Cta href="/architects" variant="ghost">Architect selection workflow ↗</Cta><Cta href="/guides/facade-materials" variant="ghost">Facade material guide ↗</Cta><Cta href="/sourcing/china#import-planning" variant="ghost">China sourcing & import planning ↗</Cta><Cta href="/procurement" variant="ghost">Procurement checklist ↗</Cta><Cta href="/products" variant="ghost">Product finder ↗</Cta></div>
        </div>
      </Section>
    </>
  );
}

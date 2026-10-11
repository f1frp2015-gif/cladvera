import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Breadcrumbs, Cta, Faq, Section } from "@/components/ui";
import { materialGuide, materialGuideFaq } from "@/content/data/material-guide";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const path = "/guides/facade-materials";
const description = "Compare ACM/MCM, exterior HPL, architectural UHPC and GFRP/GRP for facade selection. Understand material names, specification inputs and sourcing questions.";
export const metadata = buildPageMetadata({ title: "ACM, HPL, UHPC & GFRP: Facade Material Guide | Cladvera", description, path });

export default function Page() {
  return <>
    <JsonLd data={buildWebPageSchema({ name: "Facade panel material selection guide", description, path, dateModified: "2026-10-09" })} />
    <header className="border-b border-line bg-paper">
      <div className="site-container pb-[40px] pt-[24px] md:pb-[56px] md:pt-[32px]">
        <div className="border-b border-line pb-[24px]"><Breadcrumbs items={[{ name: "Architects", path: "/architects" }, { name: "Facade material guide", path }]} /></div>
        <div className="grid gap-[32px] pb-[36px] pt-[40px] lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-[80px] lg:pb-[48px] lg:pt-[64px]">
          <div><p className="eyebrow mb-[22px]">Material guide / 01</p><h1 className="text-[clamp(2.5rem,5.4vw,4.75rem)] font-normal leading-[1.04] tracking-[-0.055em]">Facade materials,<br /><span className="editorial-serif">compared.</span></h1></div>
          <div><p className="max-w-[540px] text-f16 leading-[1.8] text-ink-2 md:text-f18">Compare ACM and MCM, exterior HPL, architectural UHPC and GFRP / GRP using the products in the Cladvera catalogue. Begin with what each material is, then identify the drawings and evidence your specification needs.</p><div className="mt-[24px] flex flex-wrap gap-[12px]"><Cta href="#material-comparison">Compare the material families</Cta><Cta href="/products" variant="ghost">Explore product candidates <span aria-hidden="true">↗</span></Cta></div></div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-[12px] border-t border-line pt-[18px] font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3"><p>Cladvera material desk · Reviewed 9 October 2026</p><p>Construction / Context / Evidence</p></div>
      </div>
    </header>

    <Section>
      <div className="grid gap-[28px] lg:grid-cols-[0.8fr_1.2fr] lg:gap-[80px]">
        <div><p className="eyebrow mb-[18px]">The first decision</p><h2 className="max-w-[470px] text-[32px] font-normal leading-[1.12] tracking-[-0.045em] md:text-[42px]">Compare construction<br /><span className="editorial-serif">before comparing price.</span></h2></div>
        <div><p className="max-w-[720px] text-f18 leading-[1.7] text-ink-2">Metal composite panels combine faces and a core; HPL is a consolidated laminate; UHPC is a concrete material; GFRP is a glass-reinforced polymer. A useful comparison records the exact construction, finish, panel geometry, attachment approach and available evidence for each candidate.</p><p className="mt-[20px] max-w-[620px] border-l border-accent pl-[18px] text-f14 leading-[1.8] text-ink-3">The catalogue covers different material systems. Similar appearance or a shared application does not establish equivalent performance.</p></div>
      </div>
      <nav aria-label="Material guide sections" className="mt-[40px] grid grid-cols-2 gap-x-[24px] border-b border-line md:mt-[48px] sm:grid-cols-3 lg:grid-cols-5">
        {materialGuide.map((item, index) => <Link key={item.id} href={`#${item.id}`} className="group flex min-h-[84px] flex-col items-start justify-between gap-[10px] border-t border-line py-[14px] text-f12 hover:text-accent"><span className="font-mono text-[10px] text-ink-3">0{index + 1} /</span><span className="flex w-full items-start justify-between gap-[10px]">{item.label}<span aria-hidden="true" className="text-accent transition-transform group-hover:translate-y-[2px]">↓</span></span></Link>)}
      </nav>
    </Section>

    <Section id="material-comparison" tone="muted">
      <div className="mb-[32px] grid gap-[20px] border-t border-ink pt-[24px] lg:grid-cols-2 lg:items-end lg:gap-[80px]"><div><p className="eyebrow mb-[18px]">Decision matrix</p><h2 className="text-[32px] font-normal leading-[1.12] tracking-[-0.045em] md:text-[42px]">The material<br /><span className="editorial-serif">selection matrix.</span></h2></div><p className="max-w-[500px] text-f14 leading-[1.8] text-ink-2">Use this as a brief for a technical review. It is not a performance ranking or an approval of a proposed substitution.</p></div>
      <div className="hidden border-y border-line-strong lg:block">
        <table className="w-full table-fixed text-left text-f14">
          <caption className="sr-only">Current Cladvera material families, design contexts and information to request</caption>
          <thead><tr className="border-b border-line-strong"><th scope="col" className="w-[22%] py-[20px] pr-[24px] font-mono text-[10px] font-normal uppercase tracking-[0.1em] text-ink-3">Material family</th><th scope="col" className="w-[39%] px-[24px] py-[20px] font-mono text-[10px] font-normal uppercase tracking-[0.1em] text-ink-3">Design context</th><th scope="col" className="py-[20px] pl-[24px] font-mono text-[10px] font-normal uppercase tracking-[0.1em] text-ink-3">Bring to the first review</th></tr></thead>
          <tbody>{materialGuide.map((item, index) => <tr key={item.id} className="border-b border-line last:border-0"><th scope="row" className="py-[28px] pr-[24px] align-top font-normal"><span aria-hidden="true" className="mb-[12px] block font-mono text-[10px] text-ink-3">0{index + 1}</span><Link href={`#${item.id}`} className="text-f18 font-medium leading-[1.4] text-ink underline decoration-line-strong underline-offset-[5px] hover:text-accent">{item.label}</Link></th><td className="px-[24px] py-[28px] align-top leading-[1.8] text-ink-2">{item.candidate}</td><td className="py-[28px] pl-[24px] align-top leading-[1.8] text-ink-2">{item.request}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="grid gap-[32px] lg:hidden">
        {materialGuide.map((item, index) => <article key={item.id} className="border-t border-line-strong pt-[20px]" aria-labelledby={`matrix-${item.id}`}><div className="mb-[22px] flex items-start gap-[16px]"><span aria-hidden="true" className="pt-[5px] font-mono text-[10px] text-accent">0{index + 1}</span><h3 id={`matrix-${item.id}`} className="text-f24 font-normal tracking-[-0.035em]"><Link href={`#${item.id}`} className="underline decoration-line-strong underline-offset-[5px] hover:text-accent">{item.label}</Link></h3></div><dl className="grid gap-[22px] sm:grid-cols-2 sm:gap-[32px]"><div><dt className="mb-[8px] font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">Design context</dt><dd className="text-f14 leading-[1.8] text-ink-2">{item.candidate}</dd></div><div><dt className="mb-[8px] font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">Bring to the first review</dt><dd className="text-f14 leading-[1.8] text-ink-2">{item.request}</dd></div></dl></article>)}
      </div>
    </Section>

    <Section>
      <div className="grid gap-[56px] md:gap-[72px]">
        {materialGuide.map((item, index) => <article key={item.id} id={item.id} className="scroll-mt-[112px] border-t border-line-strong pt-[24px] md:pt-[32px]" aria-labelledby={`definition-${item.id}`}>
          <div className="grid gap-[28px] lg:grid-cols-[0.8fr_1.2fr] lg:gap-[80px]">
            <div><p className="eyebrow">0{index + 1} / {item.label}</p><h2 id={`definition-${item.id}`} className="mt-[24px] max-w-[460px] text-[30px] font-normal leading-[1.12] tracking-[-0.04em] md:text-[40px]">{item.name}</h2><Cta href={item.href} variant="ghost" className="mt-[24px]">{item.link} <span aria-hidden="true">↗</span></Cta></div>
            <div><p className="max-w-[730px] text-f18 leading-[1.75] text-ink-2">{item.meaning}</p><div className="mt-[28px] border-l border-accent pl-[20px]"><h3 className="mb-[12px] font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">Before specification</h3><p className="max-w-[670px] text-f14 leading-[1.8] text-ink-2">{item.review}</p></div><p className="mt-[24px] border-t border-line pt-[14px] text-f12 leading-[1.8] text-ink-3">Product source: <a href={item.source} className="underline underline-offset-4 hover:text-accent" target="_blank" rel="noopener noreferrer">{item.sourceLabel} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></p></div>
          </div>
        </article>)}
      </div>
    </Section>

    <Section tone="muted">
      <div className="grid gap-[28px] lg:grid-cols-[0.8fr_1.2fr] lg:gap-[80px]"><div><p className="eyebrow mb-[18px]">From selection to supply</p><h2 className="max-w-[470px] text-[32px] font-normal leading-[1.12] tracking-[-0.045em] md:text-[42px]">Keep the material<br /><span className="editorial-serif">and supply decisions connected.</span></h2></div><div><p className="max-w-[730px] text-f16 leading-[1.8] text-ink-2">Cladvera coordinates product inquiries as a supplier. China-sourced core ranges and the separately identified TAKTL range follow their own order and documentation review. Establish the manufacturer, origin and dispatch location alongside the technical selection.</p><div className="mt-[28px] border-t border-line-strong">{[{ href: "/sourcing/china", title: "Sourcing panels from China", description: "Review product scope, origin, import planning and the information needed for an export inquiry." }, { href: "/technical-resources", title: "Build the document review", description: "Find manufacturer sources and request reports for the exact construction and project." }, { href: "/procurement", title: "Compare the quoted scope", description: "Carry quantities, drawings, approvals and delivery requirements into the panel RFQ." }].map((item, index) => <Link key={item.href} href={item.href} className="group flex items-start gap-[18px] border-b border-line py-[20px]"><span aria-hidden="true" className="pt-[4px] font-mono text-[10px] text-accent">0{index + 1}</span><span className="flex-1"><span className="block text-f16 font-medium group-hover:text-accent">{item.title}</span><span className="mt-[8px] block text-f14 leading-[1.7] text-ink-2">{item.description}</span></span><span aria-hidden="true" className="text-accent">↗</span></Link>)}</div></div></div>
    </Section>
    <Section id="questions"><div className="grid gap-[28px] lg:grid-cols-[0.55fr_1.45fr] lg:gap-[80px]"><div><p className="eyebrow">The material desk</p><p className="mt-[20px] max-w-[250px] text-[28px] leading-[1.2] tracking-[-0.04em]">Clear terms.<br /><span className="editorial-serif">Better questions.</span></p></div><div className="[&_dl]:rounded-none [&_dl]:border-x-0 [&_dl>div]:px-0 [&_dl>div]:py-[24px] [&_h2]:font-normal [&_h2]:tracking-[-0.035em]"><Faq items={materialGuideFaq} title="Facade material questions" /></div></div></Section>
    <Section tone="muted"><div className="grid gap-[28px] border-t border-ink pt-[28px] lg:grid-cols-2 lg:gap-[64px]"><h2 className="max-w-[560px] text-[32px] font-normal leading-[1.12] tracking-[-0.045em] md:text-[44px]">Bring the candidates<br /><span className="editorial-serif">into one project brief.</span></h2><div><p className="max-w-[600px] text-f16 leading-[1.8] text-ink-2">Use the product finder to shortlist named products. A shared comparison can help your team record open questions before requesting samples or a quotation.</p><div className="mt-[24px] flex flex-wrap gap-[12px]"><Cta href="/compare">Open your product comparison</Cta><Cta href="/request-quote?intent=documents" variant="secondary">Request a document review</Cta></div></div></div></Section>
  </>;
}

import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Cta, Faq, LinkCard, PageHeader, Section } from "@/components/ui";
import { materialGuide, materialGuideFaq } from "@/content/data/material-guide";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const path = "/guides/facade-materials";
const description = "Compare ACM/MCM, exterior HPL, architectural UHPC and GFRP/GRP for facade selection. Understand material names, specification inputs and sourcing questions.";
export const metadata = buildPageMetadata({ title: "ACM, HPL, UHPC & GFRP: Facade Material Guide | Cladvera", description, path });

export default function Page() {
  return <>
    <JsonLd data={buildWebPageSchema({ name: "Facade panel material selection guide", description, path, dateModified: "2026-10-09" })} />
    <PageHeader eyebrow="Material guide / 01" title="Facade materials, compared." lede="Compare ACM and MCM, exterior HPL, architectural UHPC and GFRP / GRP using the products in the Cladvera catalogue. Begin with what each material is, then identify the drawings and evidence your specification needs." crumbs={[{ name: "Architects", path: "/architects" }, { name: "Facade material guide", path }]} actions={<><Cta href="#material-comparison">Compare the material families</Cta><Cta href="/products" variant="secondary">Explore product candidates</Cta></>}>
      <p className="mt-[22px] font-mono text-f12 text-ink-3">Cladvera material desk · Reviewed 9 October 2026</p>
    </PageHeader>

    <Section title="Compare construction before comparing price" lede="The catalogue covers different material systems. Similar appearance or a shared application does not establish equivalent performance.">
      <p className="max-w-[850px] text-f18 text-ink-2">Metal composite panels combine faces and a core; HPL is a consolidated laminate; UHPC is a concrete material; GFRP is a glass-reinforced polymer. A useful comparison records the exact construction, finish, panel geometry, attachment approach and available evidence for each candidate.</p>
      <nav aria-label="Material guide sections" className="mt-[32px] flex flex-wrap gap-x-[28px] gap-y-[8px] border-y border-line py-[16px]">
        {materialGuide.map(item => <Link key={item.id} href={`#${item.id}`} className="inline-flex min-h-[44px] items-center text-f14 text-accent underline underline-offset-4">{item.label} ↓</Link>)}
      </nav>
    </Section>

    <Section id="material-comparison" title="The material selection matrix" tone="muted" lede="Use this as a brief for a technical review. It is not a performance ranking or an approval of a proposed substitution.">
      <div className="overflow-x-auto border-y border-line-strong" role="region" aria-label="Material comparison table" tabIndex={0}>
        <table className="w-full min-w-[720px] text-left text-f14">
          <caption className="sr-only">Current Cladvera material families, design contexts and information to request</caption>
          <thead><tr className="border-b border-line-strong"><th scope="col" className="w-[22%] py-[20px] pr-[24px] font-medium">Material family</th><th scope="col" className="w-[39%] py-[20px] pr-[24px] font-medium">Design context</th><th scope="col" className="py-[20px] font-medium">Bring to the first review</th></tr></thead>
          <tbody>{materialGuide.map(item => <tr key={item.id} className="border-b border-line last:border-0"><th scope="row" className="py-[24px] pr-[24px] align-top font-medium"><Link href={`#${item.id}`} className="text-accent underline underline-offset-4">{item.label}</Link></th><td className="py-[24px] pr-[24px] align-top text-ink-2">{item.candidate}</td><td className="py-[24px] align-top text-ink-2">{item.request}</td></tr>)}</tbody>
        </table>
      </div>
      <p className="mt-[12px] text-f12 text-ink-3 md:hidden">Scroll the comparison horizontally to read all columns.</p>
    </Section>

    {materialGuide.map((item, index) => <Section key={item.id} id={item.id}>
      <div className="grid gap-[28px] border-t border-line-strong pt-[24px] lg:grid-cols-[0.75fr_1.25fr] lg:gap-[80px]">
        <div><p className="eyebrow">0{index + 1} / {item.label}</p><h2 className="mt-[24px] text-[32px] leading-[1.12] tracking-[-0.04em] md:text-[42px]">{item.name}</h2><Cta href={item.href} variant="ghost" className="mt-[24px]">{item.link} ↗</Cta></div>
        <div className="grid gap-[20px]"><p className="text-f18 text-ink-2">{item.meaning}</p><div className="border-t border-line pt-[20px]"><h3 className="text-f16 font-medium">Before specification</h3><p className="mt-[8px] text-f16 text-ink-2">{item.review}</p></div><p className="text-f12 text-ink-3">Product source: <a href={item.source} className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">{item.sourceLabel} ↗</a></p></div>
      </div>
    </Section>)}

    <Section title="Keep the material and supply decisions connected" tone="muted">
      <p className="max-w-[820px] text-f16 text-ink-2">Cladvera coordinates product inquiries as a supplier. China-sourced core ranges and the separately identified TAKTL range follow their own order and documentation review. Establish the manufacturer, origin and dispatch location alongside the technical selection.</p>
      <div className="mt-[32px] grid gap-[32px] md:grid-cols-3">
        <LinkCard href="/sourcing/china" title="Sourcing panels from China" description="Review product scope, origin, import planning and the information needed for an export inquiry." />
        <LinkCard href="/technical-resources" title="Build the document review" description="Find manufacturer sources and request reports for the exact construction and project." />
        <LinkCard href="/procurement" title="Compare the quoted scope" description="Carry quantities, drawings, approvals and delivery requirements into the panel RFQ." />
      </div>
    </Section>
    <Section id="questions"><Faq items={materialGuideFaq} title="Facade material questions" /></Section>
    <Section title="Bring the candidates into one project brief" tone="muted"><p className="max-w-[760px] text-f16 text-ink-2">Use the product finder to shortlist named products. A shared comparison can help your team record open questions before requesting samples or a quotation.</p><div className="mt-[24px] flex flex-wrap gap-[12px]"><Cta href="/compare">Open your product comparison</Cta><Cta href="/request-quote?intent=documents" variant="secondary">Request a document review</Cta></div></Section>
  </>;
}

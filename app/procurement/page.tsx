import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Callout, Cta, LinkCard, PageHeader, Section } from "@/components/ui";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const path = "/procurement";
const description = "Prepare an architectural panel RFQ with material, quantities, drawings and delivery needs. Compare quoted scope, coordinate approvals and plan procurement.";
export const metadata = buildPageMetadata({ title: "Architectural Panel Procurement & RFQ Guide | Cladvera", description, path });

const rfqItems = [
  { title: "Project and destination", body: "Project name, location, building use, delivery destination and your role in the purchase." },
  { title: "Product and finish", body: "Manufacturer, family, proposed construction, finish references and acceptable alternatives. Identify the production origin separately from the dispatch location." },
  { title: "Quantity and geometry", body: "Area or part quantities, dimensions, layout, openings and the current drawing or cut-list revision." },
  { title: "Supply scope", body: "State the requested panel preparation, accessories, packaging and any engineering or installation scope to be priced." },
  { title: "Review requirements", body: "Required product data, test reports, samples, mock-ups, approvals and who will review each item." },
  { title: "Schedule and commercial basis", body: "Target approval and delivery dates, phasing, destination and preferred delivery term for discussion. Identify who will arrange freight, import clearance and unloading." },
];

const procurementStages = [
  { title: "Prepare the RFQ", owner: "Buyer with the design team", decision: "Record the product shortlist, quantities, drawings, performance requirements and target dates.", record: "One scope package and a list of outstanding selections." },
  { title: "Review the offered construction", owner: "Cladvera, manufacturer and buyer", decision: "Confirm the exact product, finish, formats, available preparation and documents that can be offered.", record: "A defined offer with unconfirmed items identified." },
  { title: "Compare quotations", owner: "Buyer", decision: "Compare the same quantities, inclusions, exclusions, delivery term, payment terms and validity period.", record: "A scope comparison and clarification record." },
  { title: "Complete approvals", owner: "Design team, buyer and supplier", decision: "Resolve product documents, drawing revisions, sample or mock-up approval and any agreed first-article review.", record: "An approved order scope and the release conditions." },
  { title: "Release and coordinate production", owner: "Buyer and supplier", decision: "Agree the purchase order, production schedule, inspection requirements, packaging and change process.", record: "An order acknowledgement and milestone schedule." },
  { title: "Receive and close out", owner: "Buyer, logistics team and installer", decision: "Coordinate delivery access, inspect received goods and record any discrepancies against the shipment documents.", record: "Receiving records and the agreed care, warranty and replacement information." },
];

const releaseRecords = [
  { label: "Product release", owner: "Buyer, design team and supplier", record: "Named manufacturer and construction; approved drawing and finish revisions; quantities, preparation and agreed acceptance criteria." },
  { label: "Evidence review", owner: "Design team and responsible reviewers", record: "A register matching each requested document or report to the actual product and assembly, with outstanding items and their owners." },
  { label: "Shipment handoff", owner: "Seller, logistics team and importer", record: "Origin and ship-from confirmation; draft invoice and packing data; required transport and origin records; packing and delivery-access instructions." },
  { label: "Receiving plan", owner: "Buyer, logistics team and installer", record: "Site contact, unloading method, inspection and discrepancy records, storage requirements and the agreed process for missing or damaged items." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Panel procurement process", description, path })} />
      <PageHeader eyebrow="For buyers, contractors and fabricators" title="Architectural panel procurement, from RFQ to delivery" lede="Build a clear request for facade panels, interior boards or custom elements. Connect the selected material to quantities, drawings, approval requirements and delivery needs, then buy against an agreed scope." crumbs={[{ name: "Procurement", path }]} actions={<><Cta href="/request-quote">Prepare a panel RFQ</Cta><Cta href="/compare" variant="secondary">Compare product families</Cta></>} />

      <Section title="What to include in an RFQ" lede="Early budget inquiries can begin with estimates. Mark assumptions so the offered scope can be updated as the design develops.">
        <div className="grid gap-x-[32px] gap-y-[28px] md:grid-cols-2 lg:grid-cols-3">{rfqItems.map((item, index) => <div key={item.title} className="border-t border-line-strong pt-[20px]"><p className="mb-[16px] font-mono text-[10px] text-accent">0{index + 1} /</p><h3 className="text-f18 font-medium">{item.title}</h3><p className="mt-[12px] text-f14 leading-[1.8] text-ink-2">{item.body}</p></div>)}</div>
        <p className="mt-[28px] max-w-[860px] border-t border-line pt-[20px] text-f14 leading-[1.8] text-ink-2">For China-sourced metal composite panels, HPL, interior boards and GFRP, use the <Link href="/sourcing/china#product-scope" className="text-accent underline underline-offset-4">material-specific China sourcing checklist</Link>. If the material route is still open, <Link href="/guides/facade-materials" className="text-accent underline underline-offset-4">compare facade material constructions</Link> before comparing quotations.</p>
      </Section>

      <Section title="From inquiry to delivery" tone="muted" lede="The final sequence and responsibilities are agreed for the project and its procurement route.">
        <ol className="grid gap-[16px] md:grid-cols-2 lg:grid-cols-3">
          {procurementStages.map((stage, index) => (
            <li key={stage.title} className="rounded-card border border-line bg-paper p-[20px]">
              <p className="font-mono text-f12 text-accent">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-[6px] text-f18 font-semibold">{stage.title}</h3><p className="mt-[5px] text-f12 text-ink-3">{stage.owner}</p><p className="mt-[12px] text-f14 text-ink-2">{stage.decision}</p><p className="mt-[16px] border-t border-line pt-[12px] text-f14"><span className="font-semibold">Record: </span><span className="text-ink-2">{stage.record}</span></p>
            </li>
          ))}
        </ol>
        <p className="mt-[28px] max-w-[860px] border-t border-line pt-[20px] text-f14 leading-[1.8] text-ink-2">Before order release, review the <Link href="/architects#specification-notes" className="text-accent underline underline-offset-4">architect&apos;s specification notes</Link>, agree <Link href="/samples" className="text-accent underline underline-offset-4">material sample requirements</Link> and assemble the <Link href="/technical-resources#review-package" className="text-accent underline underline-offset-4">technical review package</Link>. Record the approvals and unresolved items with the purchase scope.</p>
      </Section>

      <Section title="Compare the full quoted scope">
        <div className="grid gap-[20px] md:grid-cols-2"><Callout title="Product and technical basis">Check the manufacturer, construction, thickness, finish, quantity, preparation, hardware and drawing revision. Record sample, testing and documentation requirements explicitly.</Callout><Callout title="Commercial and delivery basis">Check currency, unit basis, packaging, delivery term and named place, freight, exclusions, payment, validity and proposed timing. Duties, taxes and brokerage are payable by the importer unless the agreed quotation expressly states otherwise.</Callout></div>
        <p className="mt-[16px] max-w-[820px] text-f14 text-ink-2">Price, minimum quantity, availability and delivery timing are confirmed for the offered construction and order. A product appearing in the catalogue is a starting point for selection.</p>
      </Section>

      <Section id="export-handoff" title="Record the handoff before shipment." tone="muted" lede="Keep procurement, technical review and import planning connected through named records and responsible parties. A shipment document set does not replace the building team's product and assembly review.">
        <dl className="border-t border-line-strong">{releaseRecords.map((item, index) => <div key={item.label} className="grid gap-[18px] border-b border-line py-[24px] lg:grid-cols-[300px_1fr] lg:gap-[36px]"><dt className="flex items-start gap-[20px]"><span aria-hidden="true" className="pt-[5px] font-mono text-[10px] text-accent">0{index + 1}</span><span><span className="block text-f18 font-medium">{item.label}</span><span className="mt-[8px] block text-f12 text-ink-3">{item.owner}</span></span></dt><dd className="max-w-[720px] text-f14 leading-[1.8] text-ink-2">{item.record}</dd></div>)}</dl>
        <div className="mt-[24px] flex flex-wrap gap-x-[28px] gap-y-[12px]"><Cta href="/sourcing/china#import-planning" variant="ghost">China-to-US / Canada import planning <span aria-hidden="true">↗</span></Cta><Cta href="/technical-resources" variant="ghost">Build the evidence register <span aria-hidden="true">↗</span></Cta></div>
        <p className="mt-[20px] max-w-[850px] text-f12 leading-[1.8] text-ink-3">The China-sourcing pathway covers the named China-associated ranges. <Link href="/suppliers/taktl" className="text-accent underline underline-offset-4">TAKTL architectural UHPC</Link> follows its separate US manufacturer and project-supply route; do not assign one origin or shipment basis to the entire catalogue.</p>
      </Section>

      <Section title="Coordinate bespoke elements before order release">
        <p className="max-w-[820px] text-f16 text-ink-2"><Link href="/suppliers/taktl/custom-elements" className="text-accent underline underline-offset-4">Custom UHPC elements</Link> and <Link href="/materials/gfrp-custom-elements" className="text-accent underline underline-offset-4">molded GFRP architectural forms</Link> need an agreed geometry and development scope. Include interface drawings, module breakdown, fixing zones, finish references, prototype requirements and tooling ownership in the request. Confirm engineering responsibilities, acceptance criteria and approved revisions before production is released.</p>
        <div className="mt-[20px] flex flex-wrap gap-[12px]"><Cta href="/applications#custom">Explore custom architectural forms</Cta><Cta href="/request-quote" variant="secondary">Discuss a custom RFQ</Cta></div>
      </Section>

      <Section title="Continue your project"><div className="grid gap-[16px] md:grid-cols-3"><LinkCard href="/products" title="Find architectural panels" description="Find products by material, application and manufacturer, then shortlist the appropriate families." /><LinkCard href="/technical-resources" title="Review panel technical documents" description="Review available manufacturer documents or request a product-specific document package." /><LinkCard href="/request-quote" title="Request a project quotation" description="Carry selected products into the project request with drawings, quantities and delivery needs." /></div></Section>
    </>
  );
}

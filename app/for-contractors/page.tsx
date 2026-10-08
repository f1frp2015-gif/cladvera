import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import RegionBlock from "@/components/region/RegionBlock";
import { Callout, Cta, Faq, KeyValueList, PageHeader, Section } from "@/components/ui";
import { materials } from "@/content/data/materials";
import { regions } from "@/content/data/regions";
import { site } from "@/content/data/site";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Supply modes, stock and lead times, container rules, terms, the document pack and private label for panel fabricators and distributors.";

export const metadata = buildPageMetadata({
  title: "For Fabricators, Distributors and Contractors",
  description,
  path: "/for-contractors",
});

const modes = [
  { mode: "Full sheets", included: "Sheets to the data-sheet size, protective film, crate, document pack", excluded: "Cutting, routing, installation", use: "Fabricators with their own CNC; stocking distributors" },
  { mode: "Cut to size", included: "Parts to the cut list, numbered, pre-drilled where specified", excluded: "Routing and folding unless confirmed for the ordered panel; installation", use: "Installers without a shop; phased projects" },
  { mode: "Fabricated panels", included: "Fabrication only where confirmed for the material, offered SKU and approved drawings", excluded: "Sub-frame, anchors, installation", use: "Contractors with an approved system and drawings" },
];

const faq = [
  {
    q: "Can panels be supplied as full sheets or cut-to-size parts?",
    a: "Full sheets, cut-to-size parts and fabricated panels are discussed against the specific material and order. ALMINE panel formats and fabrication limits need confirmation before an ACM tray or other part is offered. Installation is not included.",
  },
  {
    q: "What information is needed to order ACM sheets for fabrication?",
    a: "Send the project location and use, desired panel format, quantity, finish preference, drawings, required test reports and schedule. Face metal, core, fabrication limits and shipping terms can then be confirmed for the offered ALMINE construction.",
  },
  {
    q: "What is the minimum order?",
    a: "Per finish: the figure in the stock table for each material, all marked to confirm until the mill schedule is fixed. Several finishes and thicknesses can share one container; samples and small orders ship LCL.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "For fabricators, distributors and contractors", description, path: "/for-contractors" })} />
      <PageHeader
        eyebrow="Fabricators and distributors"
        title="For fabricators, distributors and contractors"
        lede="Raw sheets, cut to size, or private label. Stock, minimums and lead times in one table; commercial terms and the document pack written out."
        crumbs={[{ name: "Fabricators and distributors", path: "/for-contractors" }]}
        actions={
          <>
            <Cta href="/request-quote">Upload drawings</Cta>
            <Cta href="/stock-and-lead-times" variant="secondary">Stocking list</Cta>
          </>
        }
      />

      <Section title="Supply modes">
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f14">
            <thead>
              <tr className="border-b border-line bg-paper-2 text-left">
                <th className="px-[12px] py-[10px] font-medium">Mode</th>
                <th className="px-[12px] py-[10px] font-medium">Included</th>
                <th className="px-[12px] py-[10px] font-medium">Excluded</th>
                <th className="px-[12px] py-[10px] font-medium">Typical use</th>
              </tr>
            </thead>
            <tbody>
              {modes.map((m) => (
                <tr key={m.mode} className="border-b border-line align-top last:border-b-0">
                  <td className="px-[12px] py-[10px] font-medium text-ink">{m.mode}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{m.included}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{m.excluded}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{m.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Stock and lead times" tone="muted">
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f14">
            <thead>
              <tr className="border-b border-line bg-paper-2 text-left">
                <th className="px-[12px] py-[10px] font-medium">Line</th>
                <th className="px-[12px] py-[10px] font-medium">Stock</th>
                <th className="px-[12px] py-[10px] font-medium">Minimum</th>
                <th className="px-[12px] py-[10px] font-medium">Lead time</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => (
                <tr key={m.slug} className="border-b border-line align-top last:border-b-0">
                  <td className="px-[12px] py-[10px] font-medium"><Link href={`/materials/${m.slug}`} className="hover:text-accent">{m.shortName}</Link></td>
                  <td className="px-[12px] py-[10px] text-ink-2">{m.stock.note}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{m.stock.moq}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{m.stock.leadTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[12px] text-f14 text-ink-2">Mixed containers: several finishes and thicknesses per container, minimum per finish as above; LCL for samples and small orders. Transit by port is on <Link href="/stock-and-lead-times" className="underline">stock and lead times</Link>.</p>
      </Section>

      <Section title="Fabrication resources">
        <p className="max-w-[760px] text-f14 text-ink-2">
          Routing, folding, blade and hole data per material, and the accepted file formats (DWG, DXF, PDF, XLSX cut lists; Revit on request), are on <Link href="/fabrication" className="underline">fabrication</Link>.
        </p>
      </Section>

      <Section title="Commercial conditions" tone="muted">
        <KeyValueList
          items={[
            { label: "Incoterms", value: "FOB China port, CIF or CFR destination port, DAP job site or warehouse. DDP is not offered." },
            { label: "Payment", value: "T/T deposit and balance or letter of credit; terms per quote." },
            { label: "Insurance", value: "Marine cargo insurance included under CIF; under FOB and CFR the buyer insures." },
            { label: "Packing and marking", value: "Crates labelled with finish code, batch and sheet range; sheets numbered with direction arrows." },
            { label: "Sample approval", value: "Signed master and range samples before production; mock-up by quote." },
          ]}
        />
        <div className="mt-[16px]">
          <RegionBlock
            us={<p className="text-f14 text-ink-2">{regions.US.dutyNote}</p>}
            ca={<p className="text-f14 text-ink-2">{regions.CA.dutyNote}</p>}
            className="rounded-card border border-line bg-paper p-[16px]"
          />
        </div>
      </Section>

      <Section title="Compliance document pack">
        <p className="max-w-[760px] text-f14 text-ink-2">
          Every shipment carries the document pack on <Link href="/supply-and-delivery" className="underline">supply and delivery</Link> and the test reports listed on <Link href="/compliance" className="underline">compliance</Link>. Crate labels referencing report numbers are planned once reports are issued.
        </p>
      </Section>

      <Section title="Private label and distribution" tone="muted">
        <div className="grid gap-[16px] md:grid-cols-3">
          <Callout title="Private-label sheets">Your brand on film, crates and data sheets, with the same batch records.</Callout>
          <Callout title="Line card and samples">A line-card template and co-branded sample chips are planned for stocking distributors.</Callout>
          <Callout title="Territories">Territory discussions follow first orders; no exclusivity is granted before deliveries.</Callout>
        </div>
      </Section>

      <Section title="Pricing and estimate tolerance">
        <p className="max-w-[760px] text-f14 text-ink-2">
          Budget ranges carry a ±20 percent tolerance until drawings are received; quotes against drawings are firm for their validity period. The <Link href="/pricing-guide" className="underline">pricing guide</Link> lists what moves a quote.
        </p>
      </Section>

      <Section title="Contact" tone="muted">
        <KeyValueList
          items={[
            { label: "Email", value: <a href={`mailto:${site.contact.email}`} className="underline">{site.contact.email}</a> },
            ...(site.contact.phone ? [{ label: "Phone", value: <a href={`tel:${site.contact.phone}`} className="underline">{site.contact.phone}</a> }] : []),
            { label: "Reply", value: `Within ${site.contact.replyTime}` },
            { label: "North American hours", value: "A named contact for North American working hours is to be announced." },
          ]}
        />
      </Section>

      <Section>
        <Faq items={faq} />
      </Section>
    </>
  );
}

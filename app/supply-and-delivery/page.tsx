import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import RegionBlock from "@/components/region/RegionBlock";
import { Callout, Cta, Faq, PageHeader, Section, Steps } from "@/components/ui";
import { materials } from "@/content/data/materials";
import { regions } from "@/content/data/regions";
import { site } from "@/content/data/site";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Trade terms, importer duties, the seller document pack, tariff references and lead times for panels shipped from China to the US and Canada.";

export const metadata = buildPageMetadata({
  title: "Supply and Delivery: Incoterms, Duties and Documents",
  description,
  path: "/supply-and-delivery",
});

const importerPays = [
  "Customs duty at the general (MFN) rate",
  "Section 301 duties (United States)",
  "Section 232 aluminum duties on ACM (United States)",
  "Antidumping and countervailing duty cash deposits where a product is within scope",
  "The China surtax on ACM (Canada)",
  "GST or HST and state or provincial taxes",
  "Merchandise processing and harbor maintenance fees (United States)",
  "ISF filing, brokerage and inland freight",
];

const documentPack = [
  "Commercial invoice and packing list",
  "Origin statement and “Made in China” marking on crates and sheets",
  "Bill of materials per product",
  "Aluminum smelt and cast country information for ACM (Section 232 declarations and Canadian SOR/2025-154 traceability)",
  "Wood species scientific name and country of harvest for veneer (Lacey Act declaration data)",
  "Formaldehyde test report and third-party certifier certificate where a wood core is used",
  "ISPM 15 packaging declaration",
  "Fire and performance test reports listed on the compliance matrix",
];

const timeline = [
  { title: "Sample approval", body: "Master and range samples signed; mock-up where required." },
  { title: "Production", body: "Per the lead time on the stock page; batch and sheet numbers recorded." },
  { title: "Booking", body: "Container or LCL booked; freight re-confirmed against the quote." },
  { title: "Ocean transit", body: "25 to 40 days typical depending on the lane (TBC per booking)." },
  { title: "Clearance", body: "The importer's broker files entry; documents are issued before arrival." },
  { title: "Inland", body: "To the job site or warehouse under DAP, or collected by the buyer under CIF or CFR." },
];

const faq = [
  {
    q: "What is the lead time for ACM or HPL panels from China to the United States or Canada?",
    a: "Production is 3 to 7 weeks depending on the material and whether colours are standard or custom, plus 14 to 42 days of ocean transit depending on the port, plus clearance and inland delivery. Sample approval comes first. The stock page lists both components per line.",
  },
  {
    q: "Who pays duties and taxes?",
    a: "The importer. Quotes are FOB, CIF, CFR or DAP; DDP is not offered. The duty layers that apply to each material in each country are summarised on the material pages and confirmed by the importer's broker.",
  },
  {
    q: "What documents come with a shipment?",
    a: "The document pack listed on this page: invoice, packing list, origin statement, bill of materials, aluminum smelt and cast information for ACM, wood declarations for veneer, formaldehyde documents where a wood core is used, the ISPM 15 declaration and the test reports.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Supply and delivery", description, path: "/supply-and-delivery" })} />
      <PageHeader
        eyebrow="Supply"
        title="Supply and delivery"
        lede="How panels are sold, who imports them, what documents travel with them and how long the chain takes. Duties and taxes are payable by the importer."
        crumbs={[{ name: "Supply and delivery", path: "/supply-and-delivery" }]}
        actions={<Cta href="/request-quote">Request a quote</Cta>}
      />

      <Section title="Trade terms">
        <div className="grid gap-[16px] md:grid-cols-2">
          <Callout title="Offered">
            <ul className="grid gap-[4px]">
              <li>FOB China port (default)</li>
              <li>CIF or CFR destination port</li>
              <li>DAP job site or warehouse</li>
            </ul>
          </Callout>
          <Callout title="Not offered: DDP" tone="warn">
            Classification, antidumping and countervailing duty deposits and Section 232 declarations must be made by a resident importer with a customs broker. A delivered-duty-paid price would hide those decisions, so it is not quoted.
          </Callout>
        </div>
      </Section>

      <Section title="Import responsibility" tone="muted">
        <p className="mb-[12px] max-w-[760px] text-f14 text-ink-2">The buyer or its customs broker is the importer of record and pays:</p>
        <ul className="grid gap-[6px] text-f14 text-ink-2 md:grid-cols-2">
          {importerPays.map((i) => (
            <li key={i} className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>{i}</li>
          ))}
        </ul>
        <div className="mt-[16px]">
          <RegionBlock
            us={<p className="text-f14 text-ink-2">{regions.US.dutyNote}</p>}
            ca={<p className="text-f14 text-ink-2">{regions.CA.dutyNote}</p>}
            className="rounded-card border border-line bg-paper p-[16px]"
          />
        </div>
      </Section>

      <Section title="Seller document pack">
        <ul className="grid gap-[6px] text-f14 text-ink-2 md:grid-cols-2">
          {documentPack.map((d) => (
            <li key={d} className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>{d}</li>
          ))}
        </ul>
      </Section>

      <Section title="Tariff references" lede="For orientation only. CBP and CBSA classification rulings govern, and the broker confirms the rate per entry." tone="muted">
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f14">
            <thead>
              <tr className="border-b border-line bg-paper-2 text-left">
                <th className="px-[12px] py-[10px] font-medium">Line</th>
                <th className="px-[12px] py-[10px] font-medium">United States (HTSUS)</th>
                <th className="px-[12px] py-[10px] font-medium">Canada (Customs Tariff)</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => (
                <tr key={m.slug} className="border-b border-line align-top last:border-b-0">
                  <td className="px-[12px] py-[10px] font-medium"><Link href={`/materials/${m.slug}`} className="hover:text-accent">{m.shortName}</Link></td>
                  <td className="px-[12px] py-[10px] font-mono text-f12 text-ink-2">{m.supply.US.tariffReference.join("; ")}</td>
                  <td className="px-[12px] py-[10px] font-mono text-f12 text-ink-2">{m.supply.CA.tariffReference.join("; ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Lead time and packing">
        <Steps steps={timeline} />
        <ul className="mt-[16px] grid gap-[6px] text-f14 text-ink-2 md:grid-cols-2">
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>Crate and pallet specifications, and the area and weight limits per crate, are published per material (TBC).</li>
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>UHPC transit damage documented at unloading within the agreed period is replaced from the same batch (policy terms TBC).</li>
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>Sheets are numbered and crates labelled by finish code, batch and sheet range so phased shipments install in order.</li>
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>Solid-wood packaging is ISPM 15 treated and marked; plywood crates carry the declaration.</li>
        </ul>
      </Section>

      <Section title="Public projects" tone="muted">
        <RegionBlock
          us={<p className="text-f14 text-ink-2">{regions.US.procurementNote}</p>}
          ca={<p className="text-f14 text-ink-2">{regions.CA.procurementNote}</p>}
          className="rounded-card border border-line bg-paper p-[16px]"
        />
      </Section>

      <Section title="What we commit to">
        <ul className="grid gap-[8px] text-f14 text-ink-2">
          {site.commitments.map((c) => (
            <li key={c} className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>{c}</li>
          ))}
        </ul>
      </Section>

      <Section tone="muted">
        <Faq items={faq} />
      </Section>
    </>
  );
}

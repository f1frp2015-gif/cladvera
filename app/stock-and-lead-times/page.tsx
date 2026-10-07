import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Callout, Cta, PageHeader, Section } from "@/components/ui";
import { finishes } from "@/content/data/finishes";
import { materials } from "@/content/data/materials";
import { site } from "@/content/data/site";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Stock status, minimum order and production lead time for each panel line, with typical ocean transit from China to US and Canadian ports.";

export const metadata = buildPageMetadata({
  title: "Stock and Lead Times for Panels Shipped to the US and Canada",
  description,
  path: "/stock-and-lead-times",
});

const updated = "2026-10-07";

const lanes = [
  { lane: "Shanghai / Ningbo / Shenzhen to Los Angeles or Long Beach", ocean: "14 to 20 days" },
  { lane: "to Houston", ocean: "30 to 38 days" },
  { lane: "to New York / New Jersey", ocean: "30 to 40 days" },
  { lane: "to Savannah", ocean: "30 to 38 days" },
  { lane: "to Vancouver", ocean: "16 to 22 days" },
  { lane: "to Toronto (Vancouver rail or via Montreal)", ocean: "25 to 35 days" },
  { lane: "to Montreal", ocean: "32 to 42 days" },
];

export default function Page() {
  const plannedStock = finishes.filter((f) => f.stock === "planned-stock");
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Stock and lead times", description, path: "/stock-and-lead-times", dateModified: updated })} />
      <PageHeader
        eyebrow="Supply"
        title="Stock and lead times"
        lede="Where stock is held, what the minimums are, how long production takes and how long the ocean leg adds by port. Table updated 2026-10-07."
        crumbs={[{ name: "Stock and lead times", path: "/stock-and-lead-times" }]}
        actions={<Cta href="/request-quote">Request a project quote</Cta>}
      />

      <Section>
        <Callout title="Stock locations">
          Mill stock is held in China. There is no North American warehouse yet; a third-party warehouse for a short list of 8 mm phenolic decors and 4 mm FR ACM colours is under evaluation and will be listed here with its location when confirmed.
        </Callout>
      </Section>

      <Section title="By material" tone="muted">
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f14">
            <thead>
              <tr className="border-b border-line bg-paper-2 text-left">
                <th className="px-[12px] py-[10px] font-medium">Line</th>
                <th className="px-[12px] py-[10px] font-medium">Stock status</th>
                <th className="px-[12px] py-[10px] font-medium">Minimum order</th>
                <th className="px-[12px] py-[10px] font-medium">Production lead time</th>
                <th className="px-[12px] py-[10px] font-medium">Packing</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => (
                <tr key={m.slug} className="border-b border-line align-top last:border-b-0">
                  <td className="px-[12px] py-[10px] font-medium"><Link href={`/materials/${m.slug}`} className="hover:text-accent">{m.shortName}</Link></td>
                  <td className="px-[12px] py-[10px] text-ink-2">{m.stock.note}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{m.stock.moq}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{m.stock.leadTime}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{m.stock.perCrate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="mb-[8px] mt-[24px] text-f18 font-semibold">Planned stock programme</h3>
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f14">
            <thead>
              <tr className="border-b border-line bg-paper-2 text-left">
                <th className="px-[12px] py-[10px] font-medium">Code</th>
                <th className="px-[12px] py-[10px] font-medium">Finish</th>
                <th className="px-[12px] py-[10px] font-medium">Material</th>
                <th className="px-[12px] py-[10px] font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {plannedStock.map((f) => (
                <tr key={f.code} className="border-b border-line last:border-b-0">
                  <td className="px-[12px] py-[10px] font-mono text-f12"><Link href={`/finishes/${f.code.toLowerCase()}`} className="hover:text-accent">{f.code}</Link></td>
                  <td className="px-[12px] py-[10px]">{f.name}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{f.materials.map((s) => materials.find((m) => m.slug === s)?.shortName).join(", ")}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">Planned stock programme</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Transit by lane" lede="Typical port-to-port ocean transit; confirmed per booking. Customs clearance and inland delivery vary by port and broker. Door-to-door time is production plus ocean transit plus clearance and inland.">
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f14">
            <thead>
              <tr className="border-b border-line bg-paper-2 text-left">
                <th className="px-[12px] py-[10px] font-medium">Lane</th>
                <th className="px-[12px] py-[10px] font-medium">Ocean transit (typical, TBC)</th>
                <th className="px-[12px] py-[10px] font-medium">Clearance and inland</th>
              </tr>
            </thead>
            <tbody>
              {lanes.map((l) => (
                <tr key={l.lane} className="border-b border-line last:border-b-0">
                  <td className="px-[12px] py-[10px]">{l.lane}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{l.ocean}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">Varies</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Mixed containers" tone="muted">
        <ul className="grid gap-[8px] text-f14 text-ink-2 md:grid-cols-2">
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>Several finishes and thicknesses can share one container; the minimum per finish is the figure in the table above.</li>
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>Samples and small orders ship LCL or by air as the buyer prefers.</li>
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>UHPC is weight-limited before it is volume-limited; the packing column states the planning figure.</li>
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>Crates are labelled with finish code, batch and sheet range for phased installation.</li>
        </ul>
      </Section>

      <Section title="Freight">
        <p className="max-w-[760px] text-f14 text-ink-2">
          Ocean rates float with the spot indices and are not published here. A quote carries its freight line, the lane assumed and a validity period; the freight is re-confirmed at booking.
        </p>
      </Section>

      <Section title="PDF and updates" tone="muted">
        <p className="max-w-[760px] text-f14 text-ink-2">
          A PDF export of this table and email updates are planned. To be notified when the table changes, write to <a href={`mailto:${site.contact.email}?subject=Stock%20updates`} className="underline">{site.contact.email}</a> with the subject “Stock updates”.
        </p>
      </Section>
    </>
  );
}

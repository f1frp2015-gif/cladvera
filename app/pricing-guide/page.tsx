import { notFound } from "next/navigation";
import { isPublishedPath } from "@/content/data/publication";
import JsonLd from "@/components/seo/JsonLd";
import RegionBlock from "@/components/region/RegionBlock";
import { Callout, Cta, Faq, PageHeader, Section } from "@/components/ui";
import { regions } from "@/content/data/regions";
import { site } from "@/content/data/site";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "What moves a panel quote: cost drivers for ACM, phenolic HPL, veneer and UHPC, landed-cost layers by country and how quotes are built.";

export const metadata = buildPageMetadata({
  title: "Pricing Guide: Cost Drivers and Landed Cost for Panels",
  description,
  path: "/pricing-guide",
});

const drivers = [
  { material: "ALMINE metal composite", items: "The offered panel construction, face metal, coating, size, quantity, fabrication, freight and applicable import treatment all need confirmation" },
  { material: "Phenolic HPL", items: "Thickness, decor, single or double face, cut-to-size work, quantity and container mix" },
  { material: "Wood veneer", items: "Species, cut, range matching and sequence sets, core type, quantity" },
  { material: "UHPC", items: "Texture and mould cost, panel size and number of unique panels, thickness, anchor type, freight weight" },
];

const faq = [
  {
    q: "How much do ACM panels cost per square foot?",
    a: "No verified per-square-foot price is available for the ALMINE range. Provide the project location, panel use, approximate area, finish preference and drawings so the offered SKU, documents and quote basis can be checked.",
  },
  {
    q: "How much do UHPC panels cost per square foot?",
    a: "Texture and mould cost, panel size and count, thickness, the anchor system and freight weight drive the price. One North American manufacturer publishes a material floor of USD 20 per square foot with a 5,000 square foot minimum; we benchmark against it and quote against drawings.",
  },
  {
    q: "How much do exterior HPL panels cost per square foot?",
    a: "Thickness, decor, single or double face, cut-to-size work and quantity set the material price; freight and the importer's duties set the landed cost. North American distributors publish per-sheet retail prices for comparable 8 mm panels, which we use as a reference point when quoting.",
  },
];

export default function Page() {
  if (!isPublishedPath("/pricing-guide")) notFound();

  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Pricing guide", description, path: "/pricing-guide" })} />
      <PageHeader
        eyebrow="Supply"
        title="Pricing guide"
        lede="No fixed prices. This page explains what moves a quote so a budget can be framed before drawings exist."
        crumbs={[{ name: "Pricing guide", path: "/pricing-guide" }]}
        actions={<Cta href="/request-quote">Request a quote</Cta>}
      />

      <Section title="Why quotes are drawings-based">
        <p className="max-w-[760px] text-f14 text-ink-2">
          Sheet utilisation, the number of unique parts, the attachment system and the delivery term change the price more than the material grade does. A budget range from an area alone carries a ±20 percent tolerance; a quote from elevations or a cut list does not.
        </p>
      </Section>

      <Section title="Cost drivers by material" tone="muted">
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f14">
            <thead>
              <tr className="border-b border-line bg-paper-2 text-left">
                <th className="px-[12px] py-[10px] font-medium">Material</th>
                <th className="px-[12px] py-[10px] font-medium">What moves the price</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((d) => (
                <tr key={d.material} className="border-b border-line align-top last:border-b-0">
                  <td className="px-[12px] py-[10px] font-medium text-ink">{d.material}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{d.items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Landed cost, not FOB">
        <p className="mb-[12px] max-w-[760px] text-f14 text-ink-2">
          A quote shows the FOB or CIF value and lists the layers the importer adds: duties, freight, packing, brokerage and inland delivery. The duty layers differ by country:
        </p>
        <RegionBlock
          us={<p className="text-f14 text-ink-2">{regions.US.dutyNote}</p>}
          ca={<p className="text-f14 text-ink-2">{regions.CA.dutyNote}</p>}
          className="rounded-card border border-line bg-paper-2 p-[16px]"
        />
      </Section>

      <Section title="Public reference points" tone="muted">
        <div className="grid gap-[16px] md:grid-cols-2">
          <Callout title="Phenolic (HPL) panels">
            North American distributors publish per-sheet retail prices for comparable 8 mm exterior panels, with crate and freight charges listed separately. These are the reference points a quote is benchmarked against.
          </Callout>
          <Callout title="UHPC panels">
            One North American UHPC manufacturer publishes a material floor of about USD 20 per square foot with a 5,000 square foot minimum. It is cited as a public reference point, not as a partner or a price of ours.
          </Callout>
        </div>
      </Section>

      <Section title="How a quote is structured">
        <div className="grid gap-[16px] md:grid-cols-3">
          <Callout title="Included">Material, finish codes, thickness, quantities and sheet sizes, packing, the Incoterm and the validity period.</Callout>
          <Callout title="Excluded">Duties and taxes, brokerage, inland freight unless DAP, installation, and engineering unless stated.</Callout>
          <Callout title="Tolerance">Budget ranges carry a ±20 percent tolerance until drawings are received; quotes against drawings are firm for their validity period.</Callout>
        </div>
        <ul className="mt-[16px] grid gap-[6px] text-f14 text-ink-2">
          {site.commitments.slice(0, 1).map((c) => (
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

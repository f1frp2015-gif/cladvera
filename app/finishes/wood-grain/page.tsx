import { notFound } from "next/navigation";
import { isPublishedPath } from "@/content/data/publication";
import JsonLd from "@/components/seo/JsonLd";
import { Cta, Faq, PageHeader, Section } from "@/components/ui";
import { FinishCard } from "@/components/ui/Swatch";
import { finishesInFamily, variationLabel } from "@/content/data/finishes";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Compare real veneer and printed wood-grain HPL finishes by structure, texture, repeat, variation, direction and documentation.";

export const metadata = buildPageMetadata({
  title: "Wood-Grain Finishes: Veneer and Printed HPL",
  description,
  path: "/finishes/wood-grain",
});

const rows = [
  { label: "Structure", veneer: "Real wood veneer on a phenolic core under a UV overlay", hpl: "Printed decor paper in a phenolic compact laminate" },
  { label: "Texture", veneer: "Open pore under the overlay", hpl: "Embossed pore, flat panel" },
  { label: "Repeat", veneer: "None; every sheet differs", hpl: "Stated per decor" },
  { label: "Variation class", veneer: variationLabel.natural, hpl: variationLabel.moderate },
  { label: "Direction", veneer: "Grain direction per elevation", hpl: "Grain direction per elevation" },
  { label: "Wood documentation", veneer: "Lacey Act species and origin per shipment", hpl: "None" },
  { label: "Maintenance", veneer: "Washing per warranty; overlay protects the wood", hpl: "Washing per warranty" },
  { label: "Where used", veneer: "Lobbies, hospitality, low-rise facades", hpl: "Facades, soffits, interiors" },
];

const faq = [
  { q: "Is HPL wood grain real wood?", a: "No. It is a printed decor paper pressed into the laminate, usually with an embossed pore. Real wood is offered as veneer on a phenolic core." },
  { q: "Wood veneer vs HPL for exterior cladding: how do they compare?", a: "Veneer gives natural variation and needs range samples and Lacey Act declarations; printed HPL is uniform within a decor, has a stated repeat and needs no wood documentation." },
  { q: "How do I control grain direction across a facade?", a: "Choose horizontal or vertical grain per elevation, number sheets to the layout drawing, and stagger sheets so pattern repeats do not line up across adjacent panels." },
  { q: "How much variation should I expect in veneer?", a: "Enough that a single chip cannot represent an order. Approval is on a signed master and a range set of at least five pieces." },
];

export default function Page() {
  if (!isPublishedPath("/finishes/wood-grain")) notFound();

  const items = [...finishesInFamily("natural-veneer"), ...finishesInFamily("wood-grain")];
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Wood-grain finishes", description, path: "/finishes/wood-grain", type: "CollectionPage" })} />
      <PageHeader eyebrow="Finishes" title="Wood-grain finishes: real veneer and printed HPL" crumbs={[{ name: "Finishes", path: "/finishes" }, { name: "Wood-grain", path: "/finishes/wood-grain" }]} actions={<Cta href="/samples">Compare wood-grain samples</Cta>} />
      <Section>
        <p className="max-w-[820px] text-f18 text-ink-2">
          A printed wood-grain pattern is an image on decor paper or a coating; its texture, if any, is an embossed pore on a flat panel, and the pattern repeats. Real veneer is a slice of wood with its own figure and colour on every sheet. Printed decors are uniform and documented like any laminate; veneer is approved on range samples and declared under the Lacey Act.
        </p>
        <p className="mt-[12px] max-w-[820px] text-f14 text-ink-3">Wood-grain availability in the ALMINE metal composite range has not been verified. Request its current color card and a physical sample before specification.</p>
      </Section>
      <Section title="Three ways to a wood look" tone="muted">
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f14">
            <thead><tr className="border-b border-line bg-paper-2 text-left"><th className="px-[12px] py-[10px] font-medium">Property</th><th className="px-[12px] py-[10px] font-medium">Real veneer</th><th className="px-[12px] py-[10px] font-medium">Printed HPL</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-line align-top last:border-b-0">
                  <th scope="row" className="px-[12px] py-[10px] text-left font-medium">{r.label}</th>
                  <td className="px-[12px] py-[10px] text-ink-2">{r.veneer}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{r.hpl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section title="Planning direction and repeat">
        <p className="max-w-[760px] text-f14 text-ink-2">Decide horizontal or vertical grain per elevation before the layout is drawn. Number every sheet to the drawing, keep one direction per wall, and stagger printed decors so repeats do not align across neighbouring sheets.</p>
      </Section>
      <Section title="Finishes" tone="muted">
        <div className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
          {items.map((f) => <FinishCard key={f.code} finish={f} />)}
        </div>
      </Section>
      <Section><Faq items={faq} /></Section>
    </>
  );
}

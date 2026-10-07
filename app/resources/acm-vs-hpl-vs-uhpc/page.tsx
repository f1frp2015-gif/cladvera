import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Callout, Cta, Faq, PageHeader, Section } from "@/components/ui";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "ACM vs phenolic HPL vs UHPC for exterior cladding: thickness, weight, fire route, attachment and US and Canadian duty layers compared.";

export const metadata = buildPageMetadata({
  title: "ACM vs HPL vs UHPC Cladding Panels Compared",
  description,
  path: "/resources/acm-vs-hpl-vs-uhpc",
});

const rows: Array<{ label: string; acm: string; hpl: string; uhpc: string }> = [
  { label: "Material", acm: "Two aluminum skins on a PE or FR mineral-filled core", hpl: "Phenolic resin and kraft paper compact laminate with a decorative face", uhpc: "Fibre-reinforced ultra high performance concrete" },
  { label: "Thickness", acm: "4 mm standard (3 and 6 mm on request) (TBC)", hpl: "6, 8, 10 and 12 mm (TBC)", uhpc: "15 to 30 mm (TBC)" },
  { label: "Weight", acm: "≈ 5.5 to 7.6 kg/m², 1.1 to 1.6 lb/ft² (TBC)", hpl: "≈ 11.5 kg/m² at 8 mm, 2.4 lb/ft² (TBC)", uhpc: "≈ 36 to 72 kg/m², 7.4 to 14.7 lb/ft² (TBC)" },
  { label: "Fire route (US)", acm: "FR core; NFPA 285 assembly above 40 ft on Type I to IV", hpl: "Combustible wall covering; NFPA 285 assembly above 40 ft on Type I to IV", uhpc: "Noncombustible panel" },
  { label: "Fire route (Canada)", acm: "CAN/ULC S134 assembly on noncombustible construction", hpl: "CAN/ULC S134 assembly on noncombustible construction", uhpc: "Noncombustible panel" },
  { label: "Interior use", acm: "Yes", hpl: "Yes", uhpc: "Yes (feature walls)" },
  { label: "Attachment", acm: "Routed and folded trays on extrusion systems", hpl: "Exposed fasteners with sliding points, or undercut anchors from 8 mm", uhpc: "Cast-in inserts or undercut anchors under delegated design" },
  { label: "Directional finishes", acm: "Metallic and brushed", hpl: "Wood-grain decors", uhpc: "Ribbed and board-formed" },
  { label: "Variation class", acm: "Uniform per coil batch", hpl: "Uniform or printed with a stated repeat", uhpc: "Natural; approved on range samples" },
  { label: "Sheet or panel size", acm: "1,220 or 1,500 mm wide, up to 5,000 mm long (TBC)", hpl: "Up to 1,530 × 3,050 mm (TBC)", uhpc: "Up to 1,200 × 3,000 mm standard (TBC)" },
  { label: "US duty layers (China origin)", acm: "General + Section 301 + Section 232 on full value", hpl: "General + Section 301", uhpc: "General + Section 301" },
  { label: "Canada duty layers", acm: "MFN + 25 % surtax + GST", hpl: "MFN + GST", uhpc: "MFN + GST" },
  { label: "Wood documentation", acm: "None", hpl: "None", uhpc: "None" },
  { label: "Main cost driver", acm: "Duty stack, coating and colour", hpl: "Thickness, decor and cut-to-size work", uhpc: "Moulds, panel count and freight weight" },
  { label: "Best for", acm: "Folded metal looks, interiors, low-rise", hpl: "Wood and solid decors with the fewest import barriers", uhpc: "Noncombustible, textured, mineral facades" },
];

const faq = [
  {
    q: "ACM vs HPL vs UHPC for exterior cladding: which should I use?",
    a: "Use phenolic HPL for wood or solid decors with flat panels and the fewest import barriers; ACM for folded metal looks, interiors and low-rise walls, accepting the highest US duty on China-origin aluminum; UHPC where a noncombustible, textured mineral facade is wanted and an engineer will design the anchors.",
  },
  {
    q: "Is ACM the same as ACP or MCM?",
    a: "ACM and ACP name the same product: aluminum skins on a polymer or mineral core. MCM (metal composite material) is the building code term that also covers copper, zinc and stainless skins.",
  },
  {
    q: "Is HPL wood grain real wood?",
    a: "No. Wood-grain HPL carries a printed decor paper, usually with an embossed pore texture. Real wood is offered as veneer on a phenolic core, which needs range samples and Lacey Act declarations.",
  },
  {
    q: "How do ACM, HPL and UHPC compare on weight per square foot?",
    a: "Planning values: 4 mm ACM about 1.1 to 1.6 lb/ft², 8 mm phenolic HPL about 2.4 lb/ft², and 15 to 30 mm UHPC about 7.4 to 14.7 lb/ft² (1 kg/m² = 0.2048 lb/ft²). Data sheets for the ordered SKU govern.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "ACM vs HPL vs UHPC", description, path: "/resources/acm-vs-hpl-vs-uhpc" })} />
      <PageHeader
        eyebrow="Resources"
        title="ACM vs HPL vs UHPC for exterior cladding"
        crumbs={[{ name: "ACM vs HPL vs UHPC", path: "/resources/acm-vs-hpl-vs-uhpc" }]}
        actions={<Cta href="/samples">Compare samples side by side</Cta>}
      />
      <Section>
        <p className="max-w-[820px] text-f18 text-ink-2">
          Choose phenolic HPL for flat wood-grain or solid decors with the fewest import barriers; ACM for folded metal looks, interiors and walls below 40 ft, accepting that China-origin ACM carries the highest US duty stack; and UHPC for noncombustible, textured, mineral facades where a North American engineer designs the anchors and the freight weight is planned.
        </p>
      </Section>
      <Section title="Side by side" lede="Values marked TBC are planning values from the material pages; the data sheet for the ordered SKU governs." tone="muted">
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f14">
            <thead>
              <tr className="border-b border-line bg-paper-2 text-left">
                <th className="px-[12px] py-[10px] font-medium">Property</th>
                <th className="px-[12px] py-[10px] font-medium"><Link href="/materials/acm-panels" className="hover:text-accent">ACM</Link></th>
                <th className="px-[12px] py-[10px] font-medium"><Link href="/materials/exterior-hpl-panels" className="hover:text-accent">Phenolic HPL</Link></th>
                <th className="px-[12px] py-[10px] font-medium"><Link href="/materials/uhpc-panels" className="hover:text-accent">UHPC</Link></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-line align-top last:border-b-0">
                  <th scope="row" className="px-[12px] py-[10px] text-left font-medium">{r.label}</th>
                  <td className="px-[12px] py-[10px] text-ink-2">{r.acm}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{r.hpl}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{r.uhpc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section>
        <div className="grid gap-[16px] md:grid-cols-3">
          <Callout title="When ACM is still right">Interiors, column covers and ceilings; exterior walls below 40 ft; private-label volumes for distributors who import on their own account.</Callout>
          <Callout title="When UHPC is wrong">No engineer of record for anchors; tight freight budgets where weight governs; projects that need a generic listing rather than project engineering.</Callout>
          <Callout title="Fiber cement">A noncombustible, lower-cost alternative with its own listings. We do not supply it; it is mentioned because specifiers compare it.</Callout>
        </div>
        <p className="mt-[12px] text-f12 text-ink-3">Test status for each line is on the <Link href="/compliance" className="underline">compliance matrix</Link>.</p>
      </Section>
      <Section tone="muted">
        <Faq items={faq} />
      </Section>
    </>
  );
}

import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Callout, Cta, Faq, PageHeader, Section } from "@/components/ui";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Compare metal composite panels, phenolic HPL and UHPC for cladding. ALMINE panel dimensions, face metal, test reports and import costs require SKU review.";

export const metadata = buildPageMetadata({
  title: "ACM vs HPL vs UHPC Cladding Panels Compared",
  description,
  path: "/resources/acm-vs-hpl-vs-uhpc",
});

const rows: Array<{ label: string; acm: string; hpl: string; uhpc: string }> = [
  { label: "Material", acm: "ALMINE describes metal faces over an inorganic core; confirm whether the ordered faces are aluminum", hpl: "Phenolic resin and kraft paper compact laminate with a decorative face", uhpc: "Fibre-reinforced ultra high performance concrete" },
  { label: "Thickness", acm: "Request the ordered SKU data sheet", hpl: "6, 8, 10 and 12 mm (TBC)", uhpc: "15 to 30 mm (TBC)" },
  { label: "Weight", acm: "Request measured mass for the ordered construction", hpl: "≈ 11.5 kg/m² at 8 mm, 2.4 lb/ft² (TBC)", uhpc: "≈ 36 to 72 kg/m², 7.4 to 14.7 lb/ft² (TBC)" },
  { label: "Fire route (US)", acm: "Confirm panel classification and complete wall-assembly requirements for the project", hpl: "Combustible wall covering; NFPA 285 assembly above 40 ft on Type I to IV", uhpc: "Noncombustible panel" },
  { label: "Fire route (Canada)", acm: "Confirm panel test report and wall-assembly requirements for the project", hpl: "CAN/ULC S134 assembly on noncombustible construction", uhpc: "Noncombustible panel" },
  { label: "Interior use", acm: "Yes", hpl: "Yes", uhpc: "Yes (feature walls)" },
  { label: "Attachment", acm: "Request manufacturer details for the selected panel and engineered assembly", hpl: "Exposed fasteners with sliding points, or undercut anchors from 8 mm", uhpc: "Cast-in inserts or undercut anchors under delegated design" },
  { label: "Directional finishes", acm: "Confirm current color card and physical samples", hpl: "Wood-grain decors", uhpc: "Ribbed and board-formed" },
  { label: "Variation class", acm: "Confirm by finish and batch", hpl: "Uniform or printed with a stated repeat", uhpc: "Natural; approved on range samples" },
  { label: "Sheet or panel size", acm: "Request available formats for the ordered SKU", hpl: "Up to 1,530 × 3,050 mm (TBC)", uhpc: "Up to 1,200 × 3,000 mm standard (TBC)" },
  { label: "US duty layers (China origin)", acm: "Confirm classification, origin and current tariff treatment", hpl: "General + Section 301", uhpc: "General + Section 301" },
  { label: "Canada duty layers", acm: "Confirm classification, origin and current tariff treatment", hpl: "MFN + GST", uhpc: "MFN + GST" },
  { label: "Wood documentation", acm: "Confirm SKU material declaration", hpl: "None", uhpc: "None" },
  { label: "Main cost driver", acm: "Panel build-up, finish, fabrication, shipping and current duties", hpl: "Thickness, decor and cut-to-size work", uhpc: "Moulds, panel count and freight weight" },
  { label: "Best for", acm: "Review by panel and project use", hpl: "Wood and solid decors with the fewest import barriers", uhpc: "Noncombustible, textured, mineral facades" },
];

const faq = [
  {
    q: "ACM vs HPL vs UHPC for exterior cladding: which should I use?",
    a: "Compare the required appearance, panel build-up, tested assembly, fixing system and project location. For ALMINE metal composite panels, confirm face metal and obtain the exact SKU data sheet and test reports before specifying them as ACM.",
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
    a: "Weight depends on the exact core, faces and thickness. ALMINE has not published a verified weight for these three panels on its public product page; request the ordered SKU data sheet before comparing weights.",
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
          Compare appearance, weight, fire documentation, attachment and landed cost for the exact panel and project. ALMINE lists an architectural A2 panel, a transit panel and a medical panel in its metal composite range. Its public catalogue does not establish each product&apos;s aluminum face construction, dimensions or North American assembly acceptance.
        </p>
      </Section>
      <Section title="Side by side" lede="The ALMINE column requires a product-specific data sheet and test reports. Other planning values marked TBC also require verification." tone="muted">
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f14">
            <thead>
              <tr className="border-b border-line bg-paper-2 text-left">
                <th className="px-[12px] py-[10px] font-medium">Property</th>
                <th className="px-[12px] py-[10px] font-medium"><Link href="/materials/acm-panels" className="hover:text-accent">ALMINE metal composite</Link></th>
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
          <Callout title="For metal composite panels">Match the exact panel build-up and tested assembly to the project. ALMINE&apos;s A2 description alone does not approve an exterior wall system.</Callout>
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

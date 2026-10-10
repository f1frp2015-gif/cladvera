import { notFound } from "next/navigation";
import { isPublishedPath } from "@/content/data/publication";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Callout, Cta, Faq, PageHeader, Section } from "@/components/ui";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "UHPC and GFRC facade panels are different materials: matrix, fibres, strength, thickness, standards and what a specifier should ask.";

export const metadata = buildPageMetadata({
  title: "UHPC vs GFRC Facade Panels: Not the Same Material",
  description,
  path: "/resources/uhpc-vs-gfrc",
});

const rows = [
  { label: "Matrix", uhpc: "Dense cementitious mix with very low water-binder ratio", gfrc: "Cement-sand mortar" },
  { label: "Reinforcement", uhpc: "Steel or PVA micro-fibres dispersed through the mix", gfrc: "Alkali-resistant glass fibres, sprayed or premixed" },
  { label: "Compressive strength", uhpc: "Above about 120 MPa (17,400 psi), tested to ASTM C1856", gfrc: "Lower; typically well below UHPC (per product data)" },
  { label: "Typical thickness", uhpc: "15 to 30 mm", gfrc: "12 to 25 mm skin, often on a steel stud frame" },
  { label: "Weight", uhpc: "≈ 36 to 72 kg/m² (TBC per product)", gfrc: "Per product and frame" },
  { label: "Surfaces", uhpc: "Smooth, sandblasted, ribbed, board-formed from the mould", gfrc: "Wide range including sculpted shapes" },
  { label: "Standards and guides", uhpc: "ASTM C1856, ACI 239R, PCI UHPC guidelines", gfrc: "PCI MNL-128 (GFRC), CSI 03 49 00" },
];

const faq = [
  { q: "Are UHPC and GFRC facade panels the same material?", a: "No. UHPC is a dense matrix with dispersed micro-fibres and compressive strength above about 120 MPa; GFRC is a glass-fibre reinforced mortar with a lower-strength matrix, usually made as a thin skin on a frame. Some products blend the two, so classify by the data sheet, not the name." },
  { q: "Which is lighter?", a: "It depends on the product: a thin GFRC skin can be lighter per square metre, but its steel frame adds weight. Compare the installed weight of panel plus frame or anchors." },
  { q: "Which is stronger?", a: "UHPC has the higher compressive and flexural strength, which is why it can be cast as a flat, unframed 15 to 30 mm panel." },
  { q: "Can GFRC details be used for UHPC panels?", a: "No. Anchors are designed and tested with the specific panel; details from one product do not transfer to another." },
];

export default function Page() {
  if (!isPublishedPath("/resources/uhpc-vs-gfrc")) notFound();

  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "UHPC vs GFRC", description, path: "/resources/uhpc-vs-gfrc" })} />
      <PageHeader eyebrow="Resources" title="UHPC vs GFRC facade panels" crumbs={[{ name: "UHPC vs GFRC", path: "/resources/uhpc-vs-gfrc" }]} actions={<Cta href="/materials/uhpc-panels">UHPC facade panels</Cta>} />
      <Section>
        <p className="max-w-[820px] text-f18 text-ink-2">
          No. UHPC and GFRC are different materials. UHPC is a dense, micro-fibre reinforced concrete with compressive strength above about 120 MPa, cast as flat 15 to 30 mm panels; GFRC is a glass-fibre reinforced mortar, usually a thinner skin on a steel frame, with a lower-strength matrix. Some products combine features of both, so compare data sheets, not names.
        </p>
      </Section>
      <Section title="Side by side" tone="muted">
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f14">
            <thead><tr className="border-b border-line bg-paper-2 text-left"><th className="px-[12px] py-[10px] font-medium">Property</th><th className="px-[12px] py-[10px] font-medium">UHPC</th><th className="px-[12px] py-[10px] font-medium">GFRC</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-line align-top last:border-b-0">
                  <th scope="row" className="px-[12px] py-[10px] text-left font-medium">{r.label}</th>
                  <td className="px-[12px] py-[10px] text-ink-2">{r.uhpc}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{r.gfrc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section>
        <div className="grid gap-[16px] md:grid-cols-2">
          <Callout title="What to ask for">Mix data, fibre type and dosage, ASTM C1856 and C1609 test reports, freeze-thaw data (ASTM C666) and anchor tests carried out with the panel.</Callout>
          <Callout title="How we supply UHPC">Only with a North American precaster or engineer of record responsible for anchors. See <Link href="/materials/uhpc-panels" className="underline">UHPC facade panels</Link>.</Callout>
        </div>
      </Section>
      <Section tone="muted"><Faq items={faq} /></Section>
    </>
  );
}

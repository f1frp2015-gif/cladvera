import { notFound } from "next/navigation";
import { isPublishedPath } from "@/content/data/publication";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import RegionBlock from "@/components/region/RegionBlock";
import { Callout, Cta, Faq, PageHeader, Section } from "@/components/ui";
import { FinishCard } from "@/components/ui/Swatch";
import { finishes } from "@/content/data/finishes";
import { materials } from "@/content/data/materials";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Commercial interior wall panels compared: phenolic HPL, veneer, ACM and UHPC by flame-spread class, cleanability, lighting and substrate.";

export const metadata = buildPageMetadata({
  title: "Commercial Interior Wall Panels by Material",
  description,
  path: "/applications/interior-wall-panels",
});

const notes: Record<string, { clean: string; uses: string }> = {
  "exterior-hpl-panels": { clean: "High; resists cleaning chemicals and impact", uses: "Corridors, washrooms, healthcare" },
  "interior-hpl-panels": { clean: "High for compact; depends on substrate for thin HPL", uses: "Lobbies, offices, hospitality" },
  "acm-panels": { clean: "ALMINE describes a washable transit face and an antibacterial medical face; request cleaning and impact reports", uses: "Architectural and healthcare interiors, subject to the ordered SKU" },
  "wood-veneer-panels": { clean: "Moderate; overlay protects the veneer", uses: "Lobbies, hospitality, boardrooms" },
  "uhpc-panels": { clean: "Moderate; sealed surface", uses: "Feature walls, lobbies, retail" },
};

const faq = [
  { q: "What wall panels are used in commercial interiors?", a: "Compact laminate and HPL, real veneer panels, metal and ACM panels, and concrete-look panels such as UHPC. They are chosen by flame-spread class, cleanability, impact resistance and how they read under the project lighting." },
  { q: "What is the difference between decorative wall panels and architectural panels?", a: "Decorative wall panels in retail stores are DIY products for homes, such as slat, fluted or PVC panels. Architectural panels are specified for commercial buildings by flame-spread class, substrate, attachment system and documentation." },
  { q: "Do interior HPL panels need a formaldehyde certificate?", a: "Phenolic compact laminate does not fall under TSCA Title VI or SOR/2021-148. Panels laminated onto MDF or particleboard do, and need certification and labelling before sale." },
  { q: "Which panels suit washrooms and wet areas?", a: "Phenolic compact laminate is the usual choice because the core is not affected by moisture and needs no edge banding. Veneer and MDF-core panels are kept out of wet zones." },
];

export default function Page() {
  if (!isPublishedPath("/applications/interior-wall-panels")) notFound();

  const interiorFinishes = finishes.filter((f) => f.use.includes("interior")).slice(0, 8);
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Commercial interior wall panels", description, path: "/applications/interior-wall-panels" })} />
      <PageHeader eyebrow="Applications" title="Commercial interior wall panels" crumbs={[{ name: "Interior wall panels", path: "/applications/interior-wall-panels" }]} actions={<Cta href="/samples">Request samples</Cta>} />
      <Section>
        <p className="max-w-[820px] text-f18 text-ink-2">
          Commercial interiors use compact laminate and HPL panels, real veneer panels, ACM and metal panels, and concrete-look panels such as UHPC. The choice turns on the interior finish class the code requires, how the surface stands up to cleaning and impact, and how it reads under the project lighting.
        </p>
      </Section>
      <Section title="Materials for interiors" tone="muted">
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f14">
            <thead><tr className="border-b border-line bg-paper-2 text-left"><th className="px-[12px] py-[10px] font-medium">Material</th><th className="px-[12px] py-[10px] font-medium">Interior</th><th className="px-[12px] py-[10px] font-medium">Flame-spread status</th><th className="px-[12px] py-[10px] font-medium">Cleanability</th><th className="px-[12px] py-[10px] font-medium">Best uses</th></tr></thead>
            <tbody>
              {materials.map((m) => (
                <tr key={m.slug} className="border-b border-line align-top last:border-b-0">
                  <td className="px-[12px] py-[10px] font-medium"><Link href={`/materials/${m.slug}`} className="hover:text-accent">{m.shortName}</Link></td>
                  <td className="px-[12px] py-[10px] text-ink-2">{m.use.includes("interior") ? "Yes" : "No"}</td>
                  <td className="px-[12px] py-[10px] text-ink-2"><Link href="/compliance" className="underline">See compliance</Link></td>
                  <td className="px-[12px] py-[10px] text-ink-2">{notes[m.slug]?.clean}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{notes[m.slug]?.uses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section title="Interior finish classes">
        <RegionBlock
          us={<p className="text-f14 text-ink-2">IBC Chapter 8 classifies interior finishes by ASTM E84: Class A flame-spread index 0 to 25, Class B 26 to 75, Class C 76 to 200, each with a smoke-developed index of 450 or less. Required classes depend on occupancy and location; sprinklered buildings may permit one class lower in most occupancies.</p>}
          ca={<p className="text-f14 text-ink-2">The National Building Code limits interior finish flame-spread ratings tested to CAN/ULC S102 by occupancy and location, with a general limit of 150 and lower limits for exits and corridors in some buildings.</p>}
          className="rounded-card border border-line bg-paper-2 p-[16px]"
        />
      </Section>
      <Section tone="muted">
        <div className="grid gap-[16px] md:grid-cols-3">
          <Callout title="Lighting and touch">Wall-wash and grazing light exaggerate texture and flatness. Specify viewing conditions and judge samples under them; see the <Link href="/resources/panel-color-variation" className="underline">colour-variation guide</Link>.</Callout>
          <Callout title="Substrates">Phenolic cores carry no formaldehyde rules. MDF or particleboard cores need TSCA Title VI (US) or SOR/2021-148 (Canada) certification.</Callout>
          <Callout title="Joints and layout">Reveal joints, sheets numbered to the elevation, and one grain direction per wall.</Callout>
        </div>
      </Section>
      <Section title="Interior finishes">
        <div className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
          {interiorFinishes.map((f) => <FinishCard key={f.code} finish={f} />)}
        </div>
      </Section>
      <Section tone="muted"><Faq items={faq} /></Section>
    </>
  );
}

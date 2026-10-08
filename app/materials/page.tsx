import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import RegionBlock from "@/components/region/RegionBlock";
import { Badge, Cta, LinkCard, PageHeader, Section } from "@/components/ui";
import { materials, materialsForRegion } from "@/content/data/materials";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Exterior cladding and interior panels by material: phenolic HPL, UHPC, ACM and real wood veneer, with duty and building code notes.";

export const metadata = buildPageMetadata({
  title: "Architectural Panels by Material: HPL, UHPC, ACM, Veneer",
  description,
  path: "/materials",
});

const matrix = [
  { label: "Typical thickness", values: ["6 to 12 mm", "15 to 30 mm", "4 mm (3 and 6 on request)", "6 to 10 mm (phenolic core)"] },
  { label: "Weight", values: ["≈ 11.5 kg/m² at 8 mm", "≈ 36 to 72 kg/m²", "≈ 5.5 to 7.6 kg/m²", "≈ 9 to 14 kg/m²"] },
  { label: "Combustibility", values: ["Combustible; assembly test above 40 ft", "Noncombustible", "FR core; assembly test above 40 ft", "Combustible; assembly test above 40 ft"] },
  { label: "US duty layers", values: ["General + §301", "General + §301", "General + §301 + §232 (full value)", "Pending ruling"] },
  { label: "Canada duty layers", values: ["MFN + GST", "MFN + GST", "MFN + 25 % surtax + GST", "MFN + GST"] },
  { label: "Wood documentation", values: ["None", "None", "None", "Lacey Act; formaldehyde if wood core"] },
  { label: "Variation class", values: ["Uniform or printed", "Natural", "Uniform or printed", "Natural"] },
];

const order = ["exterior-hpl-panels", "uhpc-panels", "acm-panels", "wood-veneer-panels"] as const;

export default function Page() {
  const compared = order.map((slug) => materials.find((m) => m.slug === slug)!);
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Materials", description, path: "/materials", type: "CollectionPage" })} />
      <PageHeader
        eyebrow="Materials"
        title="Exterior cladding and interior panels by material"
        lede="Four lines, each with its own page for specifications, finishes, test status, stock and documents. The order below follows the country you selected: the lowest-friction line first."
        crumbs={[{ name: "Materials", path: "/materials" }]}
        actions={
          <>
            <Cta href="/resources/acm-vs-hpl-vs-uhpc">Compare ACM, HPL and UHPC</Cta>
            <Cta href="/samples" variant="secondary">Request samples</Cta>
          </>
        }
      />

      <Section>
        <RegionBlock us={<MaterialGrid region="US" />} ca={<MaterialGrid region="CA" />} />
      </Section>

      <Section title="Material matrix" lede="Planning values for comparison; the material pages carry the specification rows and their confirmation status." tone="muted">
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f14">
            <thead>
              <tr className="border-b border-line bg-paper-2 text-left">
                <th className="px-[12px] py-[10px] font-medium">Property</th>
                {compared.map((m) => (
                  <th key={m.slug} className="px-[12px] py-[10px] font-medium">
                    <Link href={`/materials/${m.slug}`} className="hover:text-accent">{m.shortName}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row) => (
                <tr key={row.label} className="border-b border-line last:border-b-0 align-top">
                  <th scope="row" className="px-[12px] py-[10px] text-left font-medium">{row.label}</th>
                  {row.values.map((v, i) => (
                    <td key={i} className="px-[12px] py-[10px] text-ink-2">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="By use">
        <div className="grid gap-[16px] md:grid-cols-2">
          <LinkCard href="/applications/interior-wall-panels" title="Commercial interior wall panels" description="Lobbies, corridors, hospitality and retail: materials by flame-spread class, cleanability and impact." />
          <LinkCard href="/compliance" title="Exterior walls" description="What each material needs for low-rise and high-rise exterior use in the United States and Canada." />
        </div>
      </Section>

      <Section title="TAKTL collection" tone="muted">
        <LinkCard
          href="/suppliers/taktl"
          title="TAKTL architectural UHPC products"
          description="TAKTL facade panels, KORSA, SOLA, custom elements and hardware are available for project inquiries through Cladvera. Specifications and lead times are confirmed by product and project."
          meta={<Badge tone="accent">Manufacturer collection</Badge>}
        />
      </Section>
    </>
  );
}

function MaterialGrid({ region }: { region: "US" | "CA" }) {
  return (
    <div className="grid gap-[16px] md:grid-cols-2">
      {materialsForRegion(region).map((m, index) => (
        <LinkCard
          key={m.slug}
          href={`/materials/${m.slug}`}
          title={m.name}
          description={m.definition}
          meta={
            <>
              <Badge tone={index === 0 ? "accent" : "neutral"}>{index === 0 ? "Lead line" : `Rank ${index + 1}`}</Badge>
              <Badge>{m.use.join(" / ")}</Badge>
              {m.priority === "P1" && <Badge tone="pending">Phase 2</Badge>}
            </>
          }
        />
      ))}
    </div>
  );
}

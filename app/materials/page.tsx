import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import RegionBlock from "@/components/region/RegionBlock";
import { Badge, Cta, LinkCard, PageHeader, Section } from "@/components/ui";
import { materials, materialsForRegion } from "@/content/data/materials";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Explore Compactwood wood fiber HPL, UHPC, ALMINE metal composite and veneer panels, with product-specific documentation and project review notes.";

export const metadata = buildPageMetadata({
  title: "Architectural Panels by Material: HPL, UHPC, ACM, Veneer",
  description,
  path: "/materials",
});

const matrix = [
  { label: "Typical thickness", values: ["Compactwood SKU data sheet required", "15 to 30 mm", "ALMINE SKU data sheet required", "6 to 10 mm (phenolic core)"] },
  { label: "Weight", values: ["Request measured mass for selected panel", "≈ 36 to 72 kg/m²", "ALMINE SKU data sheet required", "≈ 9 to 14 kg/m²"] },
  { label: "Combustibility", values: ["Compactwood cites GB 8624 B1/B2; request reports and assembly evidence", "Noncombustible", "ALMINE A2 claim; obtain report and assembly evidence", "Combustible; assembly test above 40 ft"] },
  { label: "US duty layers", values: ["Confirm classification and duties per SKU", "General + §301", "Confirm classification and duties per SKU", "Pending ruling"] },
  { label: "Canada duty layers", values: ["Confirm classification and duties per SKU", "MFN + GST", "Confirm classification and duties per SKU", "MFN + GST"] },
  { label: "Wood documentation", values: ["Wood fiber core; confirm origin and declaration requirements", "None", "No wood described; verify SKU", "Lacey Act; formaldehyde if wood core"] },
  { label: "Variation class", values: ["Confirm selected finish and approval sample", "Natural", "Confirm finish and approval sample", "Natural"] },
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
        lede="Four material lines with product information, document status and project review notes. Confirm construction, availability and applicable requirements for each ordered panel."
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

      <Section title="Material matrix" lede="Planning comparison only; request the selected manufacturer's current SKU data sheet and project documents." tone="muted">
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
              <Badge tone={index === 0 ? "accent" : "neutral"}>{index === 0 ? "Featured" : `Line ${index + 1}`}</Badge>
              <Badge>{m.use.join(" / ")}</Badge>
              {m.priority === "P1" && <Badge tone="pending">Confirm SKU</Badge>}
            </>
          }
        />
      ))}
    </div>
  );
}

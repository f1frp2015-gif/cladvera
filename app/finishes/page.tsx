import JsonLd from "@/components/seo/JsonLd";
import { Badge, Callout, Cta, PageHeader, Section } from "@/components/ui";
import { FinishCard } from "@/components/ui/Swatch";
import { finishFamilies, finishesInFamily } from "@/content/data/finishes";
import { materials } from "@/content/data/materials";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Illustrative HPL, veneer and UHPC finishes, plus guidance for requesting ALMINE's current metal-panel color card, offered SKU and approval samples.";

export const metadata = buildPageMetadata({
  title: "Panel Finishes, Textures and Color Variation",
  description,
  path: "/finishes",
});

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Finishes", description, path: "/finishes", type: "CollectionPage" })} />
      <PageHeader
        eyebrow="Finishes"
        title="Finishes, textures and colour variation"
        lede="The finish entries below are pre-launch placeholders for HPL, veneer and UHPC. ALMINE metal-panel finishes require a current color card, offered SKU and approval samples."
        crumbs={[{ name: "Finishes", path: "/finishes" }]}
        actions={<Cta href="/samples">Build a sample set</Cta>}
      >
        <div className="mt-[16px] flex flex-wrap gap-[6px]">
          {materials.filter((m) => m.slug !== "acm-panels").map((m) => (
            <Badge key={m.slug}>{m.shortName}</Badge>
          ))}
        </div>
      </PageHeader>

      <Section>
        <Callout tone="warn" title="Finish data pending">
          Codes, names and swatches below are placeholders for other material lines. No ALMINE metal-panel finishes are listed. Request its current color card, confirm the offered panel SKU and coating, and approve a physical sample before selection.
        </Callout>
      </Section>

      {finishFamilies.map((family) => {
        const items = finishesInFamily(family.slug);
        if (items.length === 0) return null;
        return (
          <Section key={family.slug} id={family.slug} title={family.name} lede={family.description} tone="muted">
            <div className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
              {items.map((f) => (
                <FinishCard key={f.code} finish={f} />
              ))}
            </div>
            {family.path && (
              <div className="mt-[16px]">
                <Cta href={family.path} variant="ghost">About {family.name.toLowerCase()} →</Cta>
              </div>
            )}
          </Section>
        );
      })}
    </>
  );
}

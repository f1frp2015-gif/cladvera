import JsonLd from "@/components/seo/JsonLd";
import { Badge, Callout, Cta, PageHeader, Section } from "@/components/ui";
import { FinishCard } from "@/components/ui/Swatch";
import { finishFamilies, finishesInFamily } from "@/content/data/finishes";
import { materials } from "@/content/data/materials";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Panel finishes for ACM, phenolic HPL, wood veneer and UHPC: colour, gloss, texture, grain direction and variation class, each on its own page with sample options.";

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
        lede="Every finish is listed with its gloss, texture, direction and variation class, and whether range samples are issued. Printed patterns and real surface texture are labelled separately."
        crumbs={[{ name: "Finishes", path: "/finishes" }]}
        actions={<Cta href="/samples">Build a sample set</Cta>}
      >
        <div className="mt-[16px] flex flex-wrap gap-[6px]">
          {materials.map((m) => (
            <Badge key={m.slug}>{m.shortName}</Badge>
          ))}
        </div>
      </PageHeader>

      <Section>
        <Callout tone="warn" title="Placeholder library">
          Codes, names and swatches illustrate the structure. Real SKUs with photographed swatches, full-sheet images and gloss readings replace them before launch.
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

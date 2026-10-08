import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import TaktlVisual from "@/components/taktl/TaktlVisual";
import { Badge, Callout, PageHeader, Section } from "@/components/ui";
import { taktlColors, taktlFinishes, taktlProducts, taktlSources, taktlTextures } from "@/content/data/taktl";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "A source-linked reference to TAKTL architectural UHPC facade panels, KORSA aggregate, SOLA, custom elements and hardware, with color and texture options.";

export const metadata = buildPageMetadata({
  title: "TAKTL Architectural UHPC Products | Reference Catalogue",
  description,
  path: "/suppliers/taktl",
  noindex: true,
});

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "TAKTL product reference", description, path: "/suppliers/taktl", type: "CollectionPage" })} />
      <PageHeader
        eyebrow="Manufacturer reference"
        title="TAKTL architectural UHPC products"
        lede="Five manufacturer product and accessory groups, with direct links to TAKTL's current pages and documents. Colors, textures and finishes are choices within the panel system."
        crumbs={[{ name: "TAKTL reference", path: "/suppliers/taktl" }]}
      >
        <div className="mt-[18px] flex flex-wrap gap-[6px]">
          <Badge>Manufacturer: TAKTL, USA</Badge>
          <Badge tone="warn">Cladvera sourcing TBC</Badge>
        </div>
      </PageHeader>

      <Section title="Product families" lede="The facade panel is the base product. Aggregate, self-cleaning and custom elements extend it; hardware is an attachment category." tone="muted">
        <div className="grid gap-[16px] md:grid-cols-2 xl:grid-cols-3">
          {taktlProducts.map((product) => (
            <Link key={product.slug} href={`/suppliers/taktl/${product.slug}`} className="group overflow-hidden rounded-card border border-line bg-paper hover:border-line-strong hover:shadow-card">
              <TaktlVisual visual={product.visual} className="h-[170px] rounded-none border-0 border-b border-line" />
              <div className="p-[18px]">
                <p className="font-mono text-f12 uppercase tracking-[0.06em] text-ink-3">{product.type}</p>
                <h2 className="mt-[5px] text-f20 font-semibold group-hover:text-accent">{product.name} →</h2>
                <p className="mt-[8px] text-f14 text-ink-2">{product.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <Callout title="How to use this catalogue">
          These are TAKTL-branded manufacturer references, not confirmed Cladvera SKUs. Product facts are summarized in original wording; product photography, test reports and downloadable files remain on TAKTL&apos;s site. Verify current specifications and availability with TAKTL.
        </Callout>
      </Section>

      <Section title="Standard colors" lede="Codes and names are TAKTL's published options. The list is text-only because screen color is not an approval sample.">
        <div className="grid gap-[8px] sm:grid-cols-2 lg:grid-cols-3">
          {taktlColors.map(([code, name]) => (
            <div key={code} className="flex items-center justify-between rounded-card border border-line bg-paper px-[16px] py-[12px]">
              <span className="font-medium">{name}</span>
              <span className="font-mono text-f12 text-ink-3">{code}</span>
            </div>
          ))}
        </div>
        <a href={taktlSources.colors} target="_blank" rel="noopener noreferrer" className="mt-[14px] inline-block text-f14 font-medium text-accent underline underline-offset-4">View TAKTL color information ↗</a>
      </Section>

      <Section title="Standard textures" lede="These are surface options for TAKTL facade elements, not separate panel materials." tone="muted">
        <div className="grid gap-[8px] sm:grid-cols-2 lg:grid-cols-3">
          {taktlTextures.map((name, index) => (
            <div key={name} className="flex items-center gap-[14px] rounded-card border border-line bg-paper px-[16px] py-[12px]">
              <span className="font-mono text-f12 text-ink-3">{String(index + 1).padStart(2, "0")}</span>
              <span className="font-medium">{name}</span>
            </div>
          ))}
        </div>
        <a href={taktlSources.textures} target="_blank" rel="noopener noreferrer" className="mt-[14px] inline-block text-f14 font-medium text-accent underline underline-offset-4">View TAKTL texture information ↗</a>
      </Section>

      <Section title="Surface treatments and specialty options">
        <div className="flex flex-wrap gap-[8px]">
          {taktlFinishes.map((name) => <Badge key={name} tone="accent">{name}</Badge>)}
        </div>
        <p className="mt-[16px] max-w-[760px] text-f14 text-ink-2">
          Finish compatibility varies by texture and product. For example, exposed aggregate requires a process that reveals the mineral face. Confirm a proposed color, texture and finish combination with TAKTL before specification.
        </p>
        <a href={taktlSources.finishes} target="_blank" rel="noopener noreferrer" className="mt-[14px] inline-block text-f14 font-medium text-accent underline underline-offset-4">View TAKTL finish information ↗</a>
      </Section>
    </>
  );
}

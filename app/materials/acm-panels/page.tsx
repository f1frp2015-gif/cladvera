import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { CollectionNextSteps } from "@/components/catalog/ProductJourney";
import AlmineVisual from "@/components/almine/AlmineVisual";
import { Badge, Callout, Cta, PageHeader, Section } from "@/components/ui";
import { almineProducts, almineSourceUrl, almineTechnicalSources } from "@/content/data/almine";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const path = "/materials/acm-panels";
const description =
  "Explore ALMINE A2 metal composite panels, tunnel traffic panels and medical antibacterial panels, with manufacturer sources and project verification notes.";

export const metadata = buildPageMetadata({
  title: "ALMINE Metal Composite Panels | Cladvera",
  description,
  path,
});

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "ALMINE metal composite panels", description, path, type: "CollectionPage" })} />
      <PageHeader
        eyebrow="ACM / MCM · manufacturer range"
        title="ALMINE metal composite panels"
        lede="Three products from ALMINE's A-grade fireproof metal composite range: an architectural A2 panel, a rail and tunnel panel, and a medical panel. Review the manufacturer information and request the exact construction and test documents for your project."
        crumbs={[{ name: "Products", path: "/products" }, { name: "ACM / MCM panels", path }]}
        actions={<><Cta href="/products?category=mcm">Select metal composite panels</Cta><Cta href="/technical-resources" variant="secondary">Technical documents</Cta></>}
      >
        <div className="mt-[16px] flex flex-wrap gap-[6px]">
          <Badge>Manufacturer: Jiangsu ALMINE, China</Badge>
          <Badge tone="pending">Exact ACM construction: confirm by SKU</Badge>
        </div>
      </PageHeader>

      <Section title="ALMINE product families" lede="The manufacturer lists these as separate products within its A-grade fireproof metal composite panel category." tone="muted">
        <div className="grid gap-[16px] md:grid-cols-2 xl:grid-cols-3">
          {almineProducts.map((product) => (
            <Link key={product.slug} href={`${path}/${product.slug}`} className="group overflow-hidden rounded-card border border-line bg-paper hover:border-line-strong hover:shadow-card">
              <AlmineVisual visual={product.visual} className="h-[170px] rounded-none border-0 border-b border-line" />
              <div className="p-[18px]">
                <p className="font-mono text-f12 uppercase tracking-[0.06em] text-ink-3">{product.category}</p>
                <h2 className="mt-[5px] text-f20 font-semibold group-hover:text-accent">{product.name} →</h2>
                <p className="mt-[8px] text-f14 text-ink-2">{product.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="ACM and MCM: confirm the face metal">
        <div className="grid gap-[20px] lg:grid-cols-[1.3fr_1fr]">
          <p className="max-w-[760px] text-f16 text-ink-2">
            ALMINE names this range metal composite panels. ACM is the aluminum-faced subset of metal composite material (MCM). Its public description says the A2 panel has two metal faces, but does not identify the face alloy and gauge of every offered construction. Ask for a product-specific data sheet before treating a panel as an ACM specification.
          </p>
          <Callout title="Before specification">
            Obtain the exact sheet build-up, dimensions, coating and finish samples, applicable fire test reports, and attachment details. A panel-level A2 description does not establish approval of a North American exterior wall assembly.
          </Callout>
        </div>
      </Section>

      <Section title="Manufacturer source" tone="muted">
        <div className="grid gap-[16px] md:grid-cols-2">
          <a href={almineSourceUrl} target="_blank" rel="noopener noreferrer" className="rounded-card border border-line bg-paper p-[20px] hover:border-line-strong hover:shadow-card">
            <span className="font-mono text-f12 uppercase tracking-[0.08em] text-accent">ALMINE official catalogue ↗</span>
            <span className="mt-[6px] block text-f18 font-semibold">A-Grade fireproof metal composite panel range</span>
            <span className="mt-[4px] block text-f14 text-ink-2">Current manufacturer descriptions for the three products above.</span>
          </a>
          {almineTechnicalSources.map((source) => (
            <a key={source.name} href={source.url} target="_blank" rel="noopener noreferrer" className="rounded-card border border-line bg-paper p-[20px] hover:border-line-strong hover:shadow-card">
              <span className="font-mono text-f12 uppercase tracking-[0.08em] text-accent">Technical source ↗</span>
              <span className="mt-[6px] block text-f18 font-semibold">{source.name}</span>
              <span className="mt-[4px] block text-f14 text-ink-2">{source.note}</span>
            </a>
          ))}
        </div>
      </Section>
      <CollectionNextSteps category="mcm" />
    </>
  );
}

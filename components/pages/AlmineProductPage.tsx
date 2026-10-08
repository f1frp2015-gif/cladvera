import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import ProductJourney from "@/components/catalog/ProductJourney";
import AlmineVisual from "@/components/almine/AlmineVisual";
import { Badge, Callout, Cta, PageHeader, Section } from "@/components/ui";
import { catalogProducts, productRequestHref } from "@/content/data/catalog";
import { almineProducts, findAlmineProduct, type AlmineProductSlug } from "@/content/data/almine";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

export function almineProductMetadata(slug: AlmineProductSlug) {
  const product = findAlmineProduct(slug);
  return buildPageMetadata({
    title: product.metaTitle,
    description: product.metaDescription,
    path: `/materials/acm-panels/${slug}`,
  });
}

export default function AlmineProductPage({ slug }: { slug: AlmineProductSlug }) {
  const product = findAlmineProduct(slug);
  const path = `/materials/acm-panels/${slug}`;
  const catalogProduct = catalogProducts.find(item => item.path === path)!;

  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: product.name, description: product.metaDescription, path, type: "ItemPage" })} />
      <PageHeader
        eyebrow="ALMINE · metal composite panel"
        title={product.name}
        lede={product.summary}
        crumbs={[{ name: "Products", path: "/products" }, { name: "ACM / MCM panels", path: "/materials/acm-panels" }, { name: product.name, path }]}
        actions={<><Cta href={productRequestHref(catalogProduct.id)}>Request project pricing</Cta><Cta href={productRequestHref(catalogProduct.id, "sample")} variant="secondary">Request a sample</Cta></>}
      >
        <div className="mt-[16px]"><Badge>{product.category}</Badge></div>
      </PageHeader>

      <Section>
        <div className="grid items-start gap-[24px] lg:grid-cols-[1.1fr_1fr]">
          <AlmineVisual visual={product.visual} className="h-[280px] md:h-[360px]" />
          <div>
            <h2 className="mb-[16px] text-f24 font-semibold">Manufacturer description</h2>
            <dl className="divide-y divide-line rounded-card border border-line">
              {product.manufacturerFacts.map((fact) => (
                <div key={fact.label} className="grid gap-[2px] px-[16px] py-[12px] sm:grid-cols-[155px_1fr]">
                  <dt className="text-f14 font-medium">{fact.label}</dt>
                  <dd className="text-f14 text-ink-2">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-[10px] text-f12 text-ink-3">Summarized from ALMINE&apos;s public catalogue; confirm the ordered panel and current data sheet.</p>
          </div>
        </div>
      </Section>

      <Section title="Confirm before specification" tone="muted">
        <ul className="grid gap-[10px] md:grid-cols-2">
          {product.confirm.map((item) => (
            <li key={item} className="rounded-card border border-line bg-paper p-[16px] text-f14 text-ink-2">{item}</li>
          ))}
        </ul>
        <div className="mt-[20px]">
          <Callout title="Fire and assembly documentation">
            A2 is the manufacturer&apos;s product designation here. Confirm the classification standard, tested construction, report number and project jurisdiction. Exterior wall acceptance depends on the complete proposed assembly and the authority having jurisdiction.
          </Callout>
        </div>
      </Section>

      <Section title="Manufacturer source">
        <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-card border border-line bg-paper p-[20px] hover:border-line-strong hover:shadow-card">
          <span className="font-mono text-f12 uppercase tracking-[0.08em] text-accent">Source page ↗</span>
          <span className="mt-[6px] block text-f18 font-semibold">{product.name} at ALMINE</span>
          <span className="mt-[4px] block text-f14 text-ink-2">Opens the manufacturer&apos;s A-grade metal composite panel catalogue.</span>
        </a>
      </Section>

      <Section title="More ALMINE panels" tone="muted">
        <div className="grid gap-[16px] md:grid-cols-2">
          {almineProducts.filter((item) => item.slug !== slug).map((item) => (
            <Link key={item.slug} href={`/materials/acm-panels/${item.slug}`} className="rounded-card border border-line bg-paper p-[16px] hover:border-line-strong hover:shadow-card">
              <span className="font-mono text-f12 text-ink-3">{item.category}</span>
              <span className="mt-[4px] block text-f16 font-semibold">{item.name} →</span>
            </Link>
          ))}
        </div>
      </Section>
      <ProductJourney productId={catalogProduct.id} />
    </>
  );
}

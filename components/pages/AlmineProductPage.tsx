import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import ProductJourney from "@/components/catalog/ProductJourney";
import ProductSectionNav from "@/components/catalog/ProductSectionNav";
import AlmineVisual from "@/components/almine/AlmineVisual";
import { Cta, PageHeader, Section } from "@/components/ui";
import { catalogProducts, productRequestHref } from "@/content/data/catalog";
import { almineProducts, findAlmineProduct, type AlmineProductSlug } from "@/content/data/almine";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const sections = [
  { id: "product-overview", label: "Overview" },
  { id: "product-details", label: "Material description" },
  { id: "product-design", label: "Project review" },
  { id: "product-documents", label: "Documents" },
] as const;

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
  const collectionIndex = almineProducts.findIndex(item => item.slug === slug) + 1;

  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: product.name, description: product.metaDescription, path, type: "ItemPage" })} />
      <PageHeader
        eyebrow={`ALMINE / Material dossier ${String(collectionIndex).padStart(2, "0")}`}
        title={product.name}
        lede={product.summary}
        crumbs={[{ name: "Products", path: "/products" }, { name: "Metal composite panels", path: "/materials/acm-panels" }, { name: product.name, path }]}
        actions={<><Cta href={productRequestHref(catalogProduct.id)}>Request project pricing <span aria-hidden="true">↗</span></Cta><Cta href={productRequestHref(catalogProduct.id, "sample")} variant="secondary">Request a sample</Cta></>}
      >
        <p className="mt-[20px] font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">{product.category} <span aria-hidden="true" className="px-[10px]">/</span> Manufacturer: ALMINE</p>
      </PageHeader>
      <ProductSectionNav items={sections} />

      <section id="product-overview" aria-label={`${product.name} overview`} className="scroll-mt-[64px]">
        <div className="site-container py-[28px] md:py-[48px]">
          <figure>
            <div role="img" aria-label={`${product.name}: illustration, not a product photograph or sample`} className="bg-paper-2 p-[16px] md:p-[28px]">
              <AlmineVisual visual={product.visual} className="h-[240px] rounded-none border-0 md:h-[360px] xl:h-[440px]" />
            </div>
            <figcaption className="flex flex-wrap justify-between gap-[12px] border-b border-line py-[16px] font-mono text-[10px] text-ink-3"><span>ALMINE / Metal composite panel family</span><span>Illustration · not a product sample</span></figcaption>
          </figure>
        </div>
      </section>

      <Section id="product-details" className="scroll-mt-[64px]">
        <div className="grid gap-[36px] lg:grid-cols-[0.8fr_1.3fr] lg:gap-[100px]">
          <div>
            <p className="eyebrow mb-[20px]">01 / Material profile</p>
            <h2 className="text-[34px] font-normal leading-[1.1] tracking-[-0.04em] md:text-[46px]">Understand<br /><span className="editorial-serif">the construction.</span></h2>
            <p className="mt-[24px] max-w-[400px] text-f16 text-ink-2">{catalogProduct.construction}</p>
          </div>
          <div>
            <h3 className="mb-[18px] font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-ink-3">Manufacturer description</h3>
            <dl className="divide-y divide-line border-y border-line-strong">
              {product.manufacturerFacts.map(fact => (
                <div key={fact.label} className="grid gap-[10px] py-[20px] sm:grid-cols-[155px_1fr] sm:gap-[28px]">
                  <dt className="text-f14 font-medium">{fact.label}</dt>
                  <dd className="text-f14 leading-[1.7] text-ink-2">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-[18px] max-w-[620px] text-f12 text-ink-3">Summarized from ALMINE&apos;s public catalogue; confirm the ordered panel and current data sheet.</p>
            <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-[10px] inline-flex min-h-[44px] items-center gap-[24px] text-f12 font-medium text-accent hover:underline">View the manufacturer catalogue <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </Section>

      <Section id="product-design" tone="muted" className="scroll-mt-[64px]">
        <div className="grid gap-[36px] lg:grid-cols-[0.8fr_1.3fr] lg:gap-[100px]">
          <div>
            <p className="eyebrow mb-[20px]">02 / Project review</p>
            <h2 className="text-[34px] font-normal leading-[1.1] tracking-[-0.04em] md:text-[46px]">Confirm before<br /><span className="editorial-serif">specification.</span></h2>
            <p className="mt-[24px] max-w-[400px] text-f16 text-ink-2">Match the proposed construction, finish and supporting evidence to the intended use.</p>
          </div>
          <ol className="divide-y divide-line border-y border-line-strong">
            {product.confirm.map((item, index) => (
              <li key={item} className="flex items-start gap-[24px] py-[24px]"><span aria-hidden="true" className="pt-[4px] font-mono text-[10px] text-accent">{String(index + 1).padStart(2, "0")}</span><span className="text-f16 leading-[1.7] text-ink-2">{item}</span></li>
            ))}
          </ol>
        </div>
        <div className="mt-[40px] grid gap-[16px] border-t border-line-strong pt-[24px] md:grid-cols-[240px_1fr] md:gap-[40px]">
          <h3 className="text-f14 font-medium">Fire and assembly documentation</h3>
          <p className="max-w-[800px] text-f14 leading-[1.7] text-ink-2">A2 is the manufacturer&apos;s product designation here. Confirm the classification standard, tested construction, report number and project jurisdiction. Exterior wall acceptance depends on the complete proposed assembly and the authority having jurisdiction.</p>
        </div>
      </Section>

      <Section id="product-documents" className="scroll-mt-[64px]">
        <div className="grid gap-[36px] lg:grid-cols-[0.8fr_1.3fr] lg:gap-[100px]">
          <div>
            <p className="eyebrow mb-[20px]">03 / Specification resources</p>
            <h2 className="text-[34px] font-normal leading-[1.1] tracking-[-0.04em] md:text-[46px]">Review the source.<br /><span className="editorial-serif">Request the detail.</span></h2>
            <p className="mt-[24px] max-w-[400px] text-f16 text-ink-2">The catalogue describes the product family. Request current documents for the specific panel construction and finish you intend to use.</p>
          </div>
          <div className="border-y border-line-strong">
            <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-[24px] border-b border-line py-[24px]"><div><p className="mb-[10px] font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">Manufacturer catalogue / Linked source</p><h3 className="text-f20 font-medium group-hover:text-accent">{product.name} at ALMINE</h3><p className="mt-[10px] text-f14 text-ink-2">Opens the manufacturer&apos;s A-grade metal composite panel catalogue.</p></div><span aria-hidden="true" className="text-f20 text-accent">↗</span></a>
            <Link href={productRequestHref(catalogProduct.id, "documents")} className="group flex items-start justify-between gap-[24px] py-[24px]"><div><p className="mb-[10px] font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">Product-specific / On request</p><h3 className="text-f20 font-medium group-hover:text-accent">Request data sheets and reports</h3><p className="mt-[10px] text-f14 text-ink-2">Identify the offered core, face metal, finish and project requirements for review.</p></div><span aria-hidden="true" className="text-f20 text-accent">↗</span></Link>
          </div>
        </div>
        <nav aria-label="More ALMINE panel families" className="mt-[48px] border-t border-line pt-[24px]">
          <p className="eyebrow mb-[16px]">Within the ALMINE collection</p>
          <div className="flex flex-wrap gap-x-[32px] gap-y-[10px]">{almineProducts.filter(item => item.slug !== slug).map(item => <Link key={item.slug} href={`/materials/acm-panels/${item.slug}`} className="inline-flex min-h-[44px] items-center gap-[16px] text-f14 text-ink-2 hover:text-accent">{item.name}<span aria-hidden="true">↗</span></Link>)}</div>
        </nav>
      </Section>
      <ProductJourney productId={catalogProduct.id} />
    </>
  );
}

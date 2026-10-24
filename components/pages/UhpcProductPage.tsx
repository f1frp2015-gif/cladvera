import Link from "next/link";
import CatalogVisual from "@/components/catalog/CatalogVisual";
import ProductJourney from "@/components/catalog/ProductJourney";
import ProductSectionNav from "@/components/catalog/ProductSectionNav";
import JsonLd from "@/components/seo/JsonLd";
import { Breadcrumbs, Cta, Section } from "@/components/ui";
import { findCatalogProduct, productRequestHref } from "@/content/data/catalog";
import { findUhpcProduct, uhpcCollectionPath, uhpcProducts, type UhpcProductSlug } from "@/content/data/uhpc";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const sections = [
  { id: "product-overview", label: "Overview" },
  { id: "product-brief", label: "Design brief" },
  { id: "product-evidence", label: "Evidence to confirm" },
] as const;

export function uhpcProductMetadata(slug: UhpcProductSlug) {
  const product = findUhpcProduct(slug);
  return buildPageMetadata({
    title: product.metaTitle,
    description: product.metaDescription,
    path: `${uhpcCollectionPath}/${slug}`,
  });
}

export default function UhpcProductPage({ slug }: { slug: UhpcProductSlug }) {
  const product = findUhpcProduct(slug);
  const path = `${uhpcCollectionPath}/${slug}`;
  const catalogProduct = findCatalogProduct(product.id)!;

  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: product.name, description: product.metaDescription, path, type: "ItemPage" })} />
      <header id="product-overview" aria-labelledby="product-title" className="scroll-mt-[64px] border-b border-line bg-paper">
        <div className="site-container pb-[40px] pt-[24px] md:pb-[52px] md:pt-[28px]">
          <div className="mb-[28px] md:mb-[36px]">
            <Breadcrumbs items={[
              { name: "Products", path: "/products" },
              { name: "Architectural UHPC", path: uhpcCollectionPath },
              { name: product.name, path },
            ]} />
          </div>
          <div className="grid items-center gap-[32px] lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:gap-[64px]">
            <div className="min-w-0 lg:order-2">
              <p className="eyebrow mb-[16px]">Architectural UHPC / Design inquiry</p>
              <h1 id="product-title" className="max-w-[620px] text-[clamp(2.4rem,3.6vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.05em]">{product.name}</h1>
              <p className="mt-[16px] text-f12 text-ink-3">Manufacturer: To be confirmed</p>
              <p className="mt-[8px] text-f12 text-ink-3">Production location: {product.productionLocation ?? "To be confirmed"}</p>
              <p className="mt-[20px] max-w-[600px] text-f16 leading-[1.65] text-ink-2">{product.summary}</p>
              <div className="mt-[28px] flex flex-wrap gap-[10px]">
                <Cta href={productRequestHref(product.id)}>Discuss your design brief <span aria-hidden="true">↗</span></Cta>
                <Cta href="#product-evidence" variant="secondary">Evidence to confirm <span aria-hidden="true">↓</span></Cta>
              </div>
              <p className="mt-[24px] border-l-2 border-accent pl-[16px] text-f12 leading-[1.7] text-ink-3">This is a material inquiry category. Product capabilities, samples and supply availability require confirmation for the actual proposed source.</p>
            </div>
            <div className="min-w-0 lg:order-1">
              <CatalogVisual product={catalogProduct} sizes="(max-width: 1023px) calc(100vw - 40px), 50vw" />
            </div>
          </div>
        </div>
      </header>
      <ProductSectionNav items={sections} />

      <Section id="product-brief" className="scroll-mt-[64px]">
        <div className="grid gap-[28px] lg:grid-cols-[0.8fr_1.3fr] lg:gap-[100px]">
          <div>
            <p className="eyebrow mb-[20px]">01 / Architectural intent</p>
            <h2 className="text-[34px] font-normal leading-[1.1] tracking-[-0.04em] md:text-[46px]">Define the design.<br /><span className="editorial-serif">Build the brief.</span></h2>
          </div>
          <p className="max-w-[680px] text-f18 leading-[1.7] text-ink-2">{product.designIntent}</p>
        </div>
        <div className="mt-[40px] grid gap-[32px] md:grid-cols-3">
          {product.brief.map((item, index) => (
            <article key={item.title} className="border-t border-line-strong pt-[24px]">
              <p className="font-mono text-[11px] text-accent">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-[20px] text-f24 font-medium leading-[1.25] tracking-[-0.03em]">{item.title}</h3>
              <p className="mt-[16px] text-f14 leading-[1.75] text-ink-2">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="product-evidence" tone="muted" className="scroll-mt-[64px]">
        <div className="grid gap-[36px] lg:grid-cols-[0.8fr_1.3fr] lg:gap-[100px]">
          <div>
            <p className="eyebrow mb-[20px]">02 / Before specification</p>
            <h2 className="text-[34px] font-normal leading-[1.1] tracking-[-0.04em] md:text-[46px]">Confirm the source.<br /><span className="editorial-serif">Review the evidence.</span></h2>
            <p className="mt-[24px] text-f16 text-ink-2">Verified product data and test reports are not yet published for this category. Request documents identifying the actual proposed manufacturer, product and assembly before a specification or purchasing decision.</p>
          </div>
          <div>
            <h3 className="border-b border-line-strong pb-[18px] text-f18 font-medium">Project confirmation checklist</h3>
            <ul className="divide-y divide-line">
              {product.confirmations.map(item => <li key={item} className="flex gap-[16px] py-[20px] text-f16 text-ink-2"><span aria-hidden="true" className="text-accent">—</span><span>{item}</span></li>)}
            </ul>
            <Cta href={productRequestHref(product.id, "documents")} className="mt-[24px]">Request a technical review <span aria-hidden="true">↗</span></Cta>
            <p className="mt-[18px] text-f12 leading-[1.7] text-ink-3">Cladvera coordinates sourcing and project inquiries as a supplier. Product identity, origin documents, sample scope, price and lead time are confirmed in the project proposal.</p>
          </div>
        </div>
        <nav aria-label="Other UHPC design inquiries" className="mt-[48px] border-t border-line-strong pt-[24px]">
          <p className="eyebrow mb-[16px]">Continue the design brief</p>
          <div className="flex flex-wrap gap-x-[32px] gap-y-[10px]">{uhpcProducts.filter(item => item.slug !== slug).map(item => <Link key={item.slug} href={`${uhpcCollectionPath}/${item.slug}`} className="inline-flex min-h-[44px] items-center gap-[16px] text-f14 text-ink-2 hover:text-accent">{item.name}<span aria-hidden="true">↗</span></Link>)}</div>
        </nav>
      </Section>
      <ProductJourney productId={product.id} />
    </>
  );
}

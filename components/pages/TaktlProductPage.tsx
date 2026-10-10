import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import ProductJourney from "@/components/catalog/ProductJourney";
import ProductSectionNav from "@/components/catalog/ProductSectionNav";
import { Breadcrumbs, Cta, Section } from "@/components/ui";
import { catalogProducts, productRequestHref } from "@/content/data/catalog";
import { findTaktlProduct, taktlProducts, type TaktlProductSlug } from "@/content/data/taktl";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const sections = [
  { id: "product-overview", label: "Overview" },
  { id: "product-details", label: "Material facts" },
  { id: "product-design", label: "Design choices" },
  { id: "product-documents", label: "Documents" },
] as const;

export function taktlProductMetadata(slug: TaktlProductSlug) {
  const product = findTaktlProduct(slug);
  return buildPageMetadata({
    title: product.metaTitle,
    description: product.metaDescription,
    path: `/suppliers/taktl/${slug}`,
  });
}

export default function TaktlProductPage({ slug }: { slug: TaktlProductSlug }) {
  const product = findTaktlProduct(slug);
  const path = `/suppliers/taktl/${slug}`;
  const catalogProduct = catalogProducts.find(item => item.path === path)!;
  const isHardware = slug === "hardware";
  const collectionIndex = taktlProducts.findIndex(item => item.slug === slug) + 1;

  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: product.name, description: product.metaDescription, path, type: "ItemPage" })} />
      <header id="product-overview" aria-labelledby="product-title" className="scroll-mt-[64px] border-b border-line bg-paper">
        <div className="site-container pb-[40px] pt-[24px] md:pb-[52px] md:pt-[28px]">
          <div className="mb-[28px] md:mb-[36px]">
            <Breadcrumbs items={[
              { name: "Products", path: "/products" },
              { name: "TAKTL products", path: "/suppliers/taktl" },
              { name: product.name, path },
            ]} />
          </div>
          <div className="grid gap-[28px] lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:gap-x-[48px] lg:gap-y-0 xl:gap-x-[64px]">
            <div className="min-w-0 lg:col-start-2 lg:row-start-1">
              <p className="eyebrow mb-[14px]">TAKTL / Material dossier {String(collectionIndex).padStart(2, "0")}</p>
              <h1 id="product-title" className="max-w-[620px] text-[clamp(2.4rem,3.6vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.05em]">{product.name}</h1>
              <div className="mt-[16px] flex flex-wrap gap-x-[20px] gap-y-[5px] text-f12 text-ink-3">
                <span>{product.type}</span>
                <span>Manufacturer: <Link href="/suppliers/taktl" className="text-ink underline decoration-line-strong underline-offset-4 hover:text-accent">TAKTL</Link></span>
              </div>
              <p className="mt-[18px] max-w-[600px] text-f16 leading-[1.65] text-ink-2">{product.summary}</p>
              <div className="mt-[24px] flex flex-wrap gap-[10px]">
                <Cta href={productRequestHref(catalogProduct.id, "sample")}>Request a sample <span aria-hidden="true">↗</span></Cta>
                <Cta href="#product-documents" variant="secondary">Technical documents <span aria-hidden="true">↓</span></Cta>
              </div>
              <Link href={productRequestHref(catalogProduct.id)} className="mt-[6px] inline-flex min-h-[44px] items-center gap-[20px] text-f12 text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-accent">Request project pricing <span aria-hidden="true">↗</span></Link>
            </div>
            <figure className="flex min-w-0 flex-col lg:col-start-1 lg:row-span-2 lg:row-start-1">
              <div className="relative aspect-[4/3] overflow-hidden bg-paper-2 lg:aspect-auto lg:min-h-[520px] lg:flex-1">
                <Image
                  src={product.imageUrl}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), (max-width: 1439px) 50vw, 676px"
                  preload
                  className={isHardware ? "object-contain p-[24px]" : "object-cover"}
                />
              </div>
              <figcaption className="flex flex-wrap justify-between gap-x-[20px] gap-y-[6px] border-b border-line py-[14px] font-mono text-[10px] leading-[1.5] text-ink-3">
                <span>TAKTL / {product.type}</span><span>Image: TAKTL</span>
              </figcaption>
            </figure>
            <div className="min-w-0 lg:col-start-2 lg:row-start-2 lg:pt-[24px]">
              <p className="mb-[12px] font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">At a glance / Manufacturer facts</p>
              <dl className="divide-y divide-line border-y border-line-strong">
                {product.facts.slice(0, 3).map(fact => (
                  <div key={fact.label} className="grid grid-cols-[110px_minmax(0,1fr)] gap-[16px] py-[13px] sm:grid-cols-[140px_minmax(0,1fr)]">
                    <dt className="text-f12 font-medium">{fact.label}</dt>
                    <dd className="text-f12 leading-[1.65] text-ink-2">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <Link href="#product-details" className="mt-[8px] inline-flex min-h-[44px] items-center gap-[16px] text-f12 text-ink-2 hover:text-accent">Full material profile and source <span aria-hidden="true">↓</span></Link>
            </div>
          </div>
        </div>
      </header>
      <ProductSectionNav items={sections} />

      <Section id="product-details" className="scroll-mt-[64px]">
        <div className="grid gap-[36px] lg:grid-cols-[0.8fr_1.3fr] lg:gap-[100px]">
          <div>
            <p className="eyebrow mb-[20px]">01 / Material profile</p>
            <h2 className="text-[34px] font-normal leading-[1.1] tracking-[-0.04em] md:text-[46px]">The material,<br /><span className="editorial-serif">in detail.</span></h2>
            <p className="mt-[24px] max-w-[400px] text-f16 text-ink-2">{catalogProduct.construction}</p>
          </div>
          <div>
            <h3 className="mb-[18px] font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-ink-3">Manufacturer facts</h3>
            <dl className="divide-y divide-line border-y border-line-strong">
              {product.facts.map(fact => (
                <div key={fact.label} className="grid gap-[10px] py-[20px] sm:grid-cols-[180px_1fr] sm:gap-[28px]">
                  <dt className="text-f14 font-medium">{fact.label}</dt>
                  <dd className="text-f14 leading-[1.7] text-ink-2">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-[18px] max-w-[620px] text-f12 text-ink-3">Values summarize TAKTL literature. Confirm the current revision, assembly and project requirements with the manufacturer.</p>
            <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-[10px] inline-flex min-h-[44px] items-center gap-[24px] text-f12 font-medium text-accent hover:underline">View the manufacturer source <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </Section>

      <Section id="product-design" tone="muted" className="scroll-mt-[64px]">
        <div className="mb-[36px] grid gap-[22px] lg:grid-cols-[0.8fr_1.3fr] lg:gap-[100px]">
          <div><p className="eyebrow mb-[20px]">02 / {isHardware ? "System coordination" : "Architectural possibilities"}</p><h2 className="text-[34px] font-normal leading-[1.1] tracking-[-0.04em] md:text-[46px]">{isHardware ? "Consider the connection." : "Consider the application."}</h2></div>
          <p className="max-w-[640px] self-end text-f16 text-ink-2">{isHardware ? "Review the attachment route alongside the chosen panel, substructure and project engineering." : "Use the manufacturer’s application and option descriptions to guide your material review. Confirm the combination for the proposed product and assembly."}</p>
        </div>
        <div className="grid gap-[40px] md:grid-cols-2 lg:gap-[80px]">
          <div>
            <h3 className="border-b border-line-strong pb-[16px] text-f18 font-medium">Applications described by TAKTL</h3>
            <ul className="divide-y divide-line">
              {product.applications.map((item, index) => <li key={item} className="flex gap-[18px] py-[20px]"><span aria-hidden="true" className="pt-[3px] font-mono text-[10px] text-accent">{String(index + 1).padStart(2, "0")}</span><span className="text-f16 text-ink-2">{item}</span></li>)}
            </ul>
          </div>
          <div>
            <h3 className="border-b border-line-strong pb-[16px] text-f18 font-medium">Published options</h3>
            <ul className="divide-y divide-line">
              {product.options.map(item => <li key={item} className="flex items-start gap-[16px] py-[20px]"><span aria-hidden="true" className="text-accent">—</span><span className="text-f16 text-ink-2">{item}</span></li>)}
            </ul>
          </div>
        </div>
        <div className="mt-[40px] border-t border-line-strong pt-[28px]">
          <h3 className="max-w-[720px] text-f24 font-medium leading-[1.25] tracking-[-0.03em]">{product.reviewGuidance.title}</h3>
          <div className="mt-[24px] grid gap-[28px] md:grid-cols-3 md:gap-[32px]">
            {product.reviewGuidance.items.map(item => (
              <div key={item.title}>
                <h4 className="text-f16 font-medium">{item.title}</h4>
                <p className="mt-[10px] text-f14 leading-[1.7] text-ink-2">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-[28px] flex flex-wrap gap-x-[32px] gap-y-[12px] border-t border-line-strong pt-[20px]">
          {isHardware ? <Link href="/suppliers/taktl/facade-elements" className="inline-flex min-h-[44px] items-center gap-[20px] text-f14 font-medium hover:text-accent">Review TAKTL facade elements <span aria-hidden="true">↗</span></Link> : <>
            <Link href="/suppliers/taktl#colors" className="inline-flex min-h-[44px] items-center gap-[20px] text-f14 font-medium hover:text-accent">Color reference <span aria-hidden="true">↗</span></Link>
            <Link href="/suppliers/taktl#textures" className="inline-flex min-h-[44px] items-center gap-[20px] text-f14 font-medium hover:text-accent">Texture & finish reference <span aria-hidden="true">↗</span></Link>
            <Link href="/suppliers/taktl/hardware" className="inline-flex min-h-[44px] items-center gap-[20px] text-f14 font-medium hover:text-accent">Attachment components <span aria-hidden="true">↗</span></Link>
          </>}
        </div>
      </Section>

      <Section id="product-documents" className="scroll-mt-[64px]">
        <div className="grid gap-[36px] lg:grid-cols-[0.8fr_1.3fr] lg:gap-[100px]">
          <div>
            <p className="eyebrow mb-[20px]">03 / Specification resources</p>
            <h2 className="text-[34px] font-normal leading-[1.1] tracking-[-0.04em] md:text-[46px]">Start with<br /><span className="editorial-serif">the evidence.</span></h2>
            <p className="mt-[24px] max-w-[400px] text-f16 text-ink-2">Review the original manufacturer information, then request the documents for your exact construction and project conditions.</p>
          </div>
          <div className="border-y border-line-strong">
            {product.documentUrl && <a href={product.documentUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-[24px] border-b border-line py-[24px]"><div><p className="mb-[10px] font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">Manufacturer PDF / Linked source</p><h3 className="text-f20 font-medium group-hover:text-accent">{product.documentLabel}</h3><p className="mt-[10px] text-f14 text-ink-2">Original TAKTL file. Check its revision before specification.</p></div><span aria-hidden="true" className="text-f20 text-accent">↗</span></a>}
            <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-[24px] border-b border-line py-[24px]"><div><p className="mb-[10px] font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">Manufacturer product page</p><h3 className="text-f20 font-medium group-hover:text-accent">{product.name} at TAKTL</h3><p className="mt-[10px] text-f14 text-ink-2">Current product descriptions and imagery from the manufacturer.</p></div><span aria-hidden="true" className="text-f20 text-accent">↗</span></a>
            <Link href={productRequestHref(catalogProduct.id, "documents")} className="group flex items-start justify-between gap-[24px] py-[24px]"><div><p className="mb-[10px] font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">Project-specific / On request</p><h3 className="text-f20 font-medium group-hover:text-accent">Request a technical review package</h3><p className="mt-[10px] text-f14 text-ink-2">Include the proposed panel, finish, attachment and project requirements.</p></div><span aria-hidden="true" className="text-f20 text-accent">↗</span></Link>
          </div>
        </div>
        <p className="mt-[36px] max-w-[920px] border-l-2 border-accent pl-[20px] text-f12 leading-[1.7] text-ink-3">Cladvera coordinates product inquiries, pricing and samples. Availability, lead time and final details are confirmed for each project. TAKTL performance and approvals apply only to the named manufacturer products and proposed assemblies.</p>
        <nav aria-label="More TAKTL product families" className="mt-[48px] border-t border-line pt-[24px]">
          <p className="eyebrow mb-[16px]">Within the TAKTL collection</p>
          <div className="flex flex-wrap gap-x-[32px] gap-y-[10px]">{taktlProducts.filter(item => item.slug !== slug).map(item => <Link key={item.slug} href={`/suppliers/taktl/${item.slug}`} className="inline-flex min-h-[44px] items-center gap-[16px] text-f14 text-ink-2 hover:text-accent">{item.name}<span aria-hidden="true">↗</span></Link>)}</div>
        </nav>
      </Section>
      <ProductJourney productId={catalogProduct.id} />
    </>
  );
}

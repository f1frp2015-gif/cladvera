import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import ProductSectionNav from "@/components/catalog/ProductSectionNav";
import { CollectionNextSteps } from "@/components/catalog/ProductJourney";
import { Cta, PageHeader, Section } from "@/components/ui";
import { findTaktlProduct, taktlColors, taktlFinishes, taktlProducts, taktlSources, taktlTextures } from "@/content/data/taktl";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description = "Explore TAKTL architectural UHPC facade panels, KORSA aggregate, SOLA, custom elements and hardware through Cladvera. Request project pricing and samples.";
const sections = [
  { id: "families", label: "Product families" },
  { id: "colors", label: "Colors" },
  { id: "textures", label: "Textures" },
  { id: "finishes", label: "Finishes" },
] as const;

export const metadata = buildPageMetadata({
  title: "TAKTL Architectural UHPC Products | Cladvera",
  description,
  path: "/suppliers/taktl",
});

export default function Page() {
  const facade = findTaktlProduct("facade-elements");
  const hardware = findTaktlProduct("hardware");
  const specialtyProducts = taktlProducts.filter(product => product.slug !== "facade-elements" && product.slug !== "hardware");

  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "TAKTL architectural UHPC products", description, path: "/suppliers/taktl", type: "CollectionPage" })} />
      <PageHeader
        eyebrow="Material collection / TAKTL"
        title="TAKTL architectural UHPC products"
        lede="From the panel surface to the attachment detail. Explore TAKTL facade elements, specialty surfaces, custom forms and hardware for your project."
        crumbs={[{ name: "Products", path: "/products" }, { name: "TAKTL products", path: "/suppliers/taktl" }]}
        actions={<><Cta href="/products?manufacturer=TAKTL#catalog-results">Select TAKTL products <span aria-hidden="true">↗</span></Cta><Cta href="/technical-resources" variant="secondary">Technical documents</Cta></>}
      >
        <p className="mt-[20px] font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">Manufacturer: TAKTL, USA <span aria-hidden="true" className="px-[10px]">/</span> Project inquiries through Cladvera</p>
      </PageHeader>
      <ProductSectionNav items={sections} />

      <Section id="families" className="scroll-mt-[64px]">
        <div className="mb-[36px] flex flex-wrap items-end justify-between gap-[22px]">
          <div><p className="eyebrow mb-[18px]">01 / The collection</p><h2 className="text-[34px] font-normal leading-[1.1] tracking-[-0.04em] md:text-[46px]">From surface<br /><span className="editorial-serif">to system.</span></h2></div>
          <p className="max-w-[430px] text-f16 text-ink-2">Start with the facade panel. Explore its specialty surfaces and custom elements, then coordinate the attachment components.</p>
        </div>
        <article className="grid gap-[28px] border-t border-line-strong pt-[24px] lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-[64px]">
          <Link href="/suppliers/taktl/facade-elements" aria-label={`Explore ${facade.name}`} className="group block">
            <figure>
              <div className="relative h-[280px] overflow-hidden bg-paper-2 md:h-[420px] lg:h-[460px]"><Image src={facade.imageUrl} alt={facade.imageAlt} fill sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), 60vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.015]" /></div>
              <figcaption className="mt-[12px] font-mono text-[10px] text-ink-3">Image: TAKTL / Architectural facade elements</figcaption>
            </figure>
          </Link>
          <div>
            <p className="eyebrow mb-[18px]">01 / Facade panels</p>
            <h3 className="text-[32px] font-normal leading-[1.12] tracking-[-0.04em] md:text-[42px]"><Link href="/suppliers/taktl/facade-elements" className="hover:text-accent">{facade.name}</Link></h3>
            <p className="mt-[24px] text-f16 leading-[1.7] text-ink-2">{facade.summary}</p>
            <ul className="mt-[28px] divide-y divide-line border-y border-line">{facade.applications.map(application => <li key={application} className="py-[13px] text-f14 text-ink-2">{application}</li>)}</ul>
            <Link href="/suppliers/taktl/facade-elements" className="mt-[24px] inline-flex min-h-[48px] items-center gap-[32px] border-b border-line-strong text-f14 font-medium hover:border-accent hover:text-accent">Explore the facade panel <span aria-hidden="true">↗</span></Link>
          </div>
        </article>

        <div className="mt-[56px] grid gap-[40px] md:grid-cols-3 lg:mt-[72px] lg:gap-[32px]">
          {specialtyProducts.map((product, index) => (
            <article key={product.slug} className="group border-t border-line-strong pt-[18px]">
              <p className="mb-[18px] font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">{String(index + 2).padStart(2, "0")} / {product.type}</p>
              <Link href={`/suppliers/taktl/${product.slug}`} aria-label={`Explore ${product.name}`} className="block">
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden bg-paper-2"><Image src={product.imageUrl} alt={product.imageAlt} fill sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 767px) calc(100vw - 64px), 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.015]" /></div>
                  <figcaption className="mt-[10px] font-mono text-[10px] text-ink-3">Image: TAKTL</figcaption>
                </figure>
              </Link>
              <h3 className="mt-[22px] text-f24 font-medium leading-[1.2] tracking-[-0.03em]"><Link href={`/suppliers/taktl/${product.slug}`} className="hover:text-accent">{product.name} <span aria-hidden="true" className="text-accent">↗</span></Link></h3>
              <p className="mt-[14px] text-f14 leading-[1.7] text-ink-2">{product.summary}</p>
            </article>
          ))}
        </div>

        <article className="mt-[56px] grid gap-[28px] border-y border-line-strong py-[28px] md:grid-cols-[1fr_2fr] md:gap-[44px] lg:mt-[72px] lg:items-center">
          <Link href="/suppliers/taktl/hardware" aria-label="Explore TAKTL attachment hardware" className="group block"><figure><div className="relative h-[220px] overflow-hidden bg-paper-2"><Image src={hardware.imageUrl} alt={hardware.imageAlt} fill sizes="(max-width: 767px) calc(100vw - 40px), 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.015]" /></div><figcaption className="mt-[10px] font-mono text-[10px] text-ink-3">Image: TAKTL / Attachment hardware</figcaption></figure></Link>
          <div><p className="eyebrow mb-[16px]">05 / Attachment components</p><h3 className="text-[30px] font-normal leading-[1.12] tracking-[-0.035em] md:text-[38px]">Coordinate the connection.</h3><p className="mt-[18px] max-w-[680px] text-f16 text-ink-2">{hardware.summary}</p><Link href="/suppliers/taktl/hardware" className="mt-[20px] inline-flex min-h-[44px] items-center gap-[28px] text-f14 font-medium hover:text-accent">Review TAKTL hardware <span aria-hidden="true">↗</span></Link></div>
        </article>
      </Section>

      <Section id="colors" tone="muted" className="scroll-mt-[64px]">
        <div className="grid gap-[36px] lg:grid-cols-[0.8fr_1.3fr] lg:gap-[100px]">
          <div><p className="eyebrow mb-[20px]">02 / Color reference</p><h2 className="text-[34px] font-normal leading-[1.1] tracking-[-0.04em] md:text-[46px]">Begin with<br /><span className="editorial-serif">a color.</span></h2><p className="mt-[24px] max-w-[400px] text-f16 text-ink-2">Names and codes identify TAKTL&apos;s published standard colors. Confirm the physical sample for the selected product and finish.</p><p className="mt-[16px] max-w-[400px] text-f12 text-ink-3">This is a text reference. Screen color is not an approval sample.</p></div>
          <div>
            <ul className="grid gap-x-[32px] sm:grid-cols-2 xl:grid-cols-3">{taktlColors.map(([code, name]) => <li key={code} className="flex items-baseline justify-between gap-[16px] border-t border-line-strong py-[22px]"><span className="text-f18 font-medium">{name}</span><span className="font-mono text-[11px] text-ink-3">{code}</span></li>)}</ul>
            <a href={taktlSources.colors} target="_blank" rel="noopener noreferrer" className="mt-[20px] inline-flex min-h-[44px] items-center gap-[28px] border-b border-line-strong text-f14 font-medium hover:border-accent hover:text-accent">View TAKTL color information <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </Section>

      <Section id="textures" className="scroll-mt-[64px]">
        <div className="grid gap-[36px] lg:grid-cols-[0.8fr_1.3fr] lg:gap-[100px]">
          <div><p className="eyebrow mb-[20px]">03 / Texture reference</p><h2 className="text-[34px] font-normal leading-[1.1] tracking-[-0.04em] md:text-[46px]">Consider<br /><span className="editorial-serif">the surface.</span></h2><p className="mt-[24px] max-w-[400px] text-f16 text-ink-2">Published texture options for TAKTL facade elements. Each is a surface choice within the product family.</p><Link href="/suppliers/taktl/custom-elements" className="mt-[22px] inline-flex min-h-[44px] items-center gap-[24px] text-f14 font-medium hover:text-accent">Explore custom texture development <span aria-hidden="true">↗</span></Link></div>
          <div>
            <ol className="grid gap-x-[32px] sm:grid-cols-2 xl:grid-cols-3">{taktlTextures.map((name, index) => <li key={name} className="flex items-baseline gap-[20px] border-t border-line-strong py-[22px]"><span aria-hidden="true" className="font-mono text-[10px] text-accent">{String(index + 1).padStart(2, "0")}</span><span className="text-f18 font-medium">{name}</span></li>)}</ol>
            <a href={taktlSources.textures} target="_blank" rel="noopener noreferrer" className="mt-[20px] inline-flex min-h-[44px] items-center gap-[28px] border-b border-line-strong text-f14 font-medium hover:border-accent hover:text-accent">View TAKTL texture information <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </Section>

      <Section id="finishes" tone="muted" className="scroll-mt-[64px]">
        <div className="mb-[36px] grid gap-[24px] lg:grid-cols-[0.8fr_1.3fr] lg:gap-[100px]">
          <div><p className="eyebrow mb-[20px]">04 / Finish reference</p><h2 className="text-[34px] font-normal leading-[1.1] tracking-[-0.04em] md:text-[46px]">Define the<br /><span className="editorial-serif">final expression.</span></h2></div>
          <p className="max-w-[680px] self-end text-f16 text-ink-2">Finish compatibility varies by texture and product. Exposed aggregate requires a process that reveals the mineral face. Confirm a proposed color, texture and finish combination with TAKTL before specification.</p>
        </div>
        <ul className="grid gap-x-[32px] gap-y-[12px] sm:grid-cols-2 lg:grid-cols-4">{taktlFinishes.map((name, index) => <li key={name} className="border-t border-line-strong py-[22px]"><span aria-hidden="true" className="font-mono text-[10px] text-accent">{String(index + 1).padStart(2, "0")}</span><span className="mt-[18px] block text-f24 font-medium tracking-[-0.025em]">{name}</span></li>)}</ul>
        <a href={taktlSources.finishes} target="_blank" rel="noopener noreferrer" className="mt-[16px] inline-flex min-h-[44px] items-center gap-[28px] border-b border-line-strong text-f14 font-medium hover:border-accent hover:text-accent">View TAKTL finish information <span aria-hidden="true">↗</span></a>
      </Section>

      <Section>
        <div className="grid gap-[24px] border-y border-line-strong py-[32px] lg:grid-cols-[0.8fr_1.3fr] lg:gap-[100px]">
          <h2 className="text-f24 font-medium leading-[1.25] tracking-[-0.03em]">Plan a TAKTL project<br /><span className="editorial-serif">with Cladvera.</span></h2>
          <div><p className="text-f16 text-ink-2">Share project location, panel area, drawings, finish preferences and schedule. Availability, samples, lead time and pricing are confirmed for your scope.</p><p className="mt-[16px] text-f12 leading-[1.7] text-ink-3">TAKTL specifications and performance claims apply to its named products and must be checked against the current manufacturer documents and proposed wall assembly.</p></div>
        </div>
      </Section>
      <CollectionNextSteps category="uhpc" />
    </>
  );
}

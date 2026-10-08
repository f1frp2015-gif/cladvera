import Image from "next/image";
import JsonLd from "@/components/seo/JsonLd";
import ProductJourney from "@/components/catalog/ProductJourney";
import { Badge, Callout, Cta, PageHeader, Section } from "@/components/ui";
import { productRequestHref } from "@/content/data/catalog";
import {
  compactwoodImages,
  compactwoodInteriorPath,
  compactwoodInteriorProductPath as path,
  compactwoodSources,
} from "@/content/data/compactwood";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Review Compactwood's paste special board for interior walls and ceilings, including its core options and the HPL grade and reports to verify before use.";

export const metadata = buildPageMetadata({
  title: "Compactwood Paste Special Board | Cladvera",
  description,
  path,
});

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Compactwood paste special board", description, path, type: "ItemPage" })} />
      <PageHeader
        eyebrow="Compactwood · interior decorative panel"
        title="Paste special board"
        lede="A high-pressure-cured decorative board from Compactwood for interior surfaces. Its public description offers wood-fiber or glass-fiber core construction; the ordered core and HPL classification need product-specific confirmation."
        crumbs={[{ name: "Products", path: "/products" }, { name: "Compactwood interior boards", path: compactwoodInteriorPath }, { name: "Paste special board", path }]}
        actions={<><Cta href={productRequestHref("compactwood-interior")}>Request project pricing</Cta><Cta href={productRequestHref("compactwood-interior", "sample")} variant="secondary">Request a sample</Cta></>}
      >
        <div className="mt-[16px]"><Badge tone="pending">HPL designation not stated on manufacturer product page</Badge></div>
      </PageHeader>

      <Section title="Manufacturer-described product">
        <div className="grid gap-[24px] lg:grid-cols-[1fr_1fr]">
          <figure className="rounded-card border border-line bg-paper-2 p-[16px]">
            <div className="relative min-h-[300px]"><Image src={compactwoodImages.interiorStructure} alt="Compactwood structural illustration of its interior paste special board" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain" /></div>
            <figcaption className="mt-[10px] text-f12 text-ink-3">Manufacturer diagram; confirm the dimensions and layer schedule in a current data sheet.</figcaption>
          </figure>
          <dl className="divide-y divide-line self-start rounded-card border border-line text-f14">
            <div className="grid gap-[4px] p-[16px] sm:grid-cols-[140px_1fr]"><dt className="font-semibold">Core options</dt><dd className="text-ink-2">High-pressure-cured wood-fiber or glass-fiber board, as published by Compactwood.</dd></div>
            <div className="grid gap-[4px] p-[16px] sm:grid-cols-[140px_1fr]"><dt className="font-semibold">Surface</dt><dd className="text-ink-2">Decorative face bonded to the core under heat and pressure.</dd></div>
            <div className="grid gap-[4px] p-[16px] sm:grid-cols-[140px_1fr]"><dt className="font-semibold">Applications</dt><dd className="text-ink-2">Interior wall and ceiling surfaces among the manufacturer&apos;s listed uses.</dd></div>
            <div className="grid gap-[4px] p-[16px] sm:grid-cols-[140px_1fr]"><dt className="font-semibold">Classification</dt><dd className="text-ink-2">Exact HPL grade or other product standard to confirm for the offered construction.</dd></div>
          </dl>
        </div>
      </Section>

      <Section title="Documents to request" tone="muted">
        <ul className="grid gap-[10px] md:grid-cols-2">
          {[
            "Core selection, layer build-up, nominal thickness and sheet format",
            "Current finish card, physical samples and approved cleaning guidance",
            "Fire and interior-finish reports for the offered board and substrate",
            "Moisture and antibacterial test methods and reports if required",
            "Installation detail, substrate and adhesive compatibility",
          ].map((item) => <li key={item} className="rounded-card border border-line bg-paper p-[16px] text-f14 text-ink-2">{item}</li>)}
        </ul>
        <div className="mt-[20px]"><Callout title="Manufacturer claims">Compactwood lists performance benefits on its public page. Those claims should be matched to the exact board and current test documents before specification.</Callout></div>
      </Section>

      <Section title="Manufacturer source"><a href={compactwoodSources.interiorProduct} target="_blank" rel="noopener noreferrer" className="text-f14 font-semibold text-accent hover:underline">Paste special board product page ↗</a></Section>
      <ProductJourney productId="compactwood-interior" />
    </>
  );
}

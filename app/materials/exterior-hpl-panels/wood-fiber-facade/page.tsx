import Image from "next/image";
import JsonLd from "@/components/seo/JsonLd";
import ProductJourney from "@/components/catalog/ProductJourney";
import { Badge, Callout, Cta, PageHeader, Section } from "@/components/ui";
import { productRequestHref } from "@/content/data/catalog";
import {
  compactwoodExteriorPath,
  compactwoodExteriorProductPath as path,
  compactwoodImages,
  compactwoodReviewItems,
  compactwoodSources,
} from "@/content/data/compactwood";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Review Compactwood's wood-fiber HPL facade board, including its stated core, decorative surface, ventilated rainscreen approach and project document checklist.";

export const metadata = buildPageMetadata({
  title: "Compactwood Wood-Fiber HPL Facade Board | Cladvera",
  description,
  path,
});

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Compactwood wood-fiber HPL facade board", description, path, type: "ItemPage" })} />
      <PageHeader
        eyebrow="Compactwood · exterior HPL"
        title="Wood-fiber HPL facade board"
        lede="Compactwood explicitly calls this a high-pressure laminate wood-fiber board for building curtain walls. The description below reflects its published product and installation pages; ordered dimensions and test evidence are requested by project."
        crumbs={[{ name: "Products", path: "/products" }, { name: "Compactwood exterior HPL", path: compactwoodExteriorPath }, { name: "Wood-fiber facade board", path }]}
        actions={<><Cta href={productRequestHref("compactwood-exterior")}>Request project pricing</Cta><Cta href={productRequestHref("compactwood-exterior", "sample")} variant="secondary">Request a sample</Cta></>}
      >
        <div className="mt-[16px]"><Badge>Manufacturer-described HPL construction</Badge></div>
      </PageHeader>

      <Section title="Published construction">
        <div className="grid gap-[24px] lg:grid-cols-[0.8fr_1.2fr]">
          <figure className="rounded-card border border-line bg-paper-2 p-[20px]">
            <div className="relative mx-auto h-[326px] max-w-[264px]">
              <Image src={compactwoodImages.exteriorStructure} alt="Compactwood diagram of the high-pressure wood-fiber laminate board structure" fill sizes="264px" className="object-contain" />
            </div>
            <figcaption className="mt-[12px] text-f12 text-ink-3">Manufacturer product diagram. Confirm the layer schedule for the offered board.</figcaption>
          </figure>
          <div>
            <dl className="divide-y divide-line rounded-card border border-line text-f14">
              <div className="grid gap-[4px] p-[16px] sm:grid-cols-[150px_1fr]"><dt className="font-semibold">Core</dt><dd className="text-ink-2">Thermoset resin-impregnated wood-fiber kraft paper, as described by Compactwood.</dd></div>
              <div className="grid gap-[4px] p-[16px] sm:grid-cols-[150px_1fr]"><dt className="font-semibold">Surface</dt><dd className="text-ink-2">A resin-treated decorative face bonded with the core under heat and pressure.</dd></div>
              <div className="grid gap-[4px] p-[16px] sm:grid-cols-[150px_1fr]"><dt className="font-semibold">Published use</dt><dd className="text-ink-2">Exterior building curtain walls and facade cladding.</dd></div>
              <div className="grid gap-[4px] p-[16px] sm:grid-cols-[150px_1fr]"><dt className="font-semibold">Installation</dt><dd className="text-ink-2">Ventilated rainscreen concept in the manufacturer&apos;s installation overview.</dd></div>
              <div className="grid gap-[4px] p-[16px] sm:grid-cols-[150px_1fr]"><dt className="font-semibold">Formats</dt><dd className="text-ink-2">Thickness, dimensions, finish and fastening pattern to confirm for the ordered panel.</dd></div>
            </dl>
            <p className="mt-[10px] text-f12 text-ink-3">These are paraphrased manufacturer descriptions, not independent test results.</p>
          </div>
        </div>
      </Section>

      <Section title="Project review checklist" tone="muted" lede="Cladvera will request product-specific documents before treating the board as a project specification.">
        <ul className="grid gap-[10px] md:grid-cols-2">
          {compactwoodReviewItems.map((item) => <li key={item} className="rounded-card border border-line bg-paper p-[16px] text-f14 text-ink-2">{item}</li>)}
        </ul>
        <div className="mt-[20px]"><Callout title="Fire and wall assembly">Compactwood publishes Chinese fire and performance claims without an accessible report for the orderable panel. The design team must review the exact panel, attachment and complete wall assembly against the project&apos;s jurisdiction.</Callout></div>
      </Section>

      <Section title="Manufacturer sources">
        <div className="flex flex-wrap gap-[12px] text-f14 font-semibold text-accent">
          <a href={compactwoodSources.exteriorProduct} target="_blank" rel="noopener noreferrer" className="hover:underline">Wood-fiber HPL product ↗</a>
          <a href={compactwoodSources.installation} target="_blank" rel="noopener noreferrer" className="hover:underline">Installation overview ↗</a>
        </div>
      </Section>
      <ProductJourney productId="compactwood-exterior" />
    </>
  );
}

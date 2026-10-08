import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { CollectionNextSteps } from "@/components/catalog/ProductJourney";
import { Badge, Callout, Cta, PageHeader, Section } from "@/components/ui";
import { productRequestHref } from "@/content/data/catalog";
import {
  compactwoodExteriorPath as path,
  compactwoodExteriorProductPath,
  compactwoodImages,
  compactwoodInteriorPath,
  compactwoodSources,
} from "@/content/data/compactwood";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Explore Compactwood's exterior wood-fiber HPL facade board, its manufacturer-described construction, rainscreen use and documents to confirm for each project.";

export const metadata = buildPageMetadata({
  title: "Compactwood Exterior HPL Panels | Cladvera",
  description,
  path,
});

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Compactwood exterior HPL panels", description, path, type: "CollectionPage" })} />
      <PageHeader
        eyebrow="HPL · manufacturer range"
        title="Compactwood exterior wood-fiber HPL"
        lede="A high-pressure wood-fiber laminate described by Compactwood for building facades. Cladvera can source the range for project review; the exact panel construction and documentation are confirmed with each inquiry."
        crumbs={[{ name: "Products", path: "/products" }, { name: "Compactwood exterior HPL", path }]}
        actions={<><Cta href={productRequestHref("compactwood-exterior")}>Request project pricing</Cta><Cta href={productRequestHref("compactwood-exterior", "sample")} variant="secondary">Request a sample</Cta></>}
      >
        <div className="mt-[16px] flex flex-wrap gap-[6px]">
          <Badge>Manufacturer: Tianjin Zhonglong Industrial</Badge>
          <Badge tone="pending">Orderable construction: confirm by project</Badge>
        </div>
      </PageHeader>

      <Section title="Exterior HPL product" lede="The manufacturer's product page identifies one wood-fiber HPL board for curtain-wall facades. Surface options and orderable variants require a current product schedule.">
        <div className="grid overflow-hidden rounded-card border border-line bg-paper lg:grid-cols-[1.1fr_1fr]">
          <div className="relative min-h-[240px] bg-paper-2 md:min-h-[320px]">
            <Image
              src={compactwoodImages.supplierProject}
              alt="Exterior view of a school project photographed by Compactwood"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
            <span className="absolute bottom-[10px] left-[10px] rounded-tag bg-paper/90 px-[8px] py-[3px] font-mono text-f12 text-ink-2">Supplier project photograph</span>
          </div>
          <div className="flex flex-col justify-center p-[22px] md:p-[32px]">
            <p className="font-mono text-f12 uppercase tracking-[0.08em] text-accent">Facade panel</p>
            <h3 className="mt-[8px] text-f24 font-semibold">Wood-fiber HPL facade board</h3>
            <p className="mt-[12px] text-f16 text-ink-2">A thermoset resin-impregnated wood-fiber kraft-paper core with a decorative surface, pressed as a high-pressure laminate. Compactwood presents it for exterior curtain walls.</p>
            <Link href={compactwoodExteriorProductPath} className="mt-[20px] text-f14 font-semibold text-accent hover:underline">View construction and specification checklist →</Link>
            <p className="mt-[16px] text-f12 text-ink-3">The photograph appears in Compactwood&apos;s project gallery and does not identify the panel SKU used.</p>
          </div>
        </div>
      </Section>

      <Section title="Facade approach" tone="muted">
        <div className="grid gap-[20px] lg:grid-cols-[1.2fr_1fr]">
          <p className="max-w-[730px] text-f16 text-ink-2">Compactwood&apos;s installation overview describes a ventilated rainscreen with an open cavity between the exterior panel and the insulation. It states that its paste installation is unsuitable for exterior walls. Attachment, cavity, fire stops and movement joints must be designed for the actual project.</p>
          <Callout title="Before exterior specification">Request the current product data sheet, fire and weathering reports, and evidence for the complete proposed wall assembly. The manufacturer page&apos;s performance figures are claims, not verified North American approvals.</Callout>
        </div>
      </Section>

      <Section title="Manufacturer references">
        <div className="grid gap-[12px] md:grid-cols-3">
          <a href={compactwoodSources.exteriorProduct} target="_blank" rel="noopener noreferrer" className="rounded-card border border-line p-[18px] text-f14 font-semibold hover:border-line-strong">Exterior HPL product page ↗</a>
          <a href={compactwoodSources.installation} target="_blank" rel="noopener noreferrer" className="rounded-card border border-line p-[18px] text-f14 font-semibold hover:border-line-strong">Installation overview ↗</a>
          <a href={compactwoodSources.about} target="_blank" rel="noopener noreferrer" className="rounded-card border border-line p-[18px] text-f14 font-semibold hover:border-line-strong">Manufacturer profile ↗</a>
        </div>
        <p className="mt-[18px] text-f14 text-ink-2">For interior work, see the <Link href={compactwoodInteriorPath} className="font-medium text-accent hover:underline">Compactwood high-pressure decorative board</Link>. Its exact HPL classification remains to be confirmed by product.</p>
      </Section>
      <CollectionNextSteps category="hpl" />
    </>
  );
}

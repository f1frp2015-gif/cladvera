import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { CollectionNextSteps } from "@/components/catalog/ProductJourney";
import MaterialQuestions from "@/components/catalog/MaterialQuestions";
import { Badge, Callout, Cta, PageHeader, Section } from "@/components/ui";
import { productRequestHref } from "@/content/data/catalog";
import {
  compactwoodExteriorPath,
  compactwoodImages,
  compactwoodInteriorPath as path,
  compactwoodInteriorProductPath,
  compactwoodSources,
} from "@/content/data/compactwood";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Source Compactwood interior decorative boards for walls and ceilings. Confirm wood-fiber or glass-fiber core, finishes, installation and project documents.";

export const metadata = buildPageMetadata({
  title: "Interior Decorative Panel Supplier | Cladvera",
  description,
  path,
});

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Compactwood interior decorative boards", description, path, type: "CollectionPage" })} />
      <PageHeader
        eyebrow="Compactwood · interior panel supply"
        title="Interior decorative boards for walls and ceilings."
        lede="Cladvera coordinates supply of Compactwood's Paste Special Board for interior projects. The manufacturer describes a decorative surface with a high-pressure-cured wood-fiber or glass-fiber core. Confirm the offered construction and grade; this line's HPL classification is not established by the public product description."
        crumbs={[{ name: "Products", path: "/products" }, { name: "Compactwood interior boards", path }]}
        actions={<><Cta href={productRequestHref("compactwood-interior")}>Request project pricing</Cta><Cta href={productRequestHref("compactwood-interior", "sample")} variant="secondary">Request a sample</Cta></>}
      >
        <div className="mt-[16px] flex flex-wrap gap-[6px]"><Badge>Manufacturer: Tianjin Zhonglong Industrial</Badge><Badge tone="pending">HPL grade: confirm by SKU</Badge></div>
      </PageHeader>

      <Section title="Interior product">
        <div className="grid overflow-hidden rounded-card border border-line lg:grid-cols-[1fr_1.1fr]">
          <div className="relative min-h-[260px] bg-paper-2">
            <Image src={compactwoodImages.interiorStructure} alt="Compactwood diagram of the paste special board and its decorative surface and fiber core" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-contain p-[16px]" />
          </div>
          <div className="flex flex-col justify-center p-[22px] md:p-[32px]">
            <p className="font-mono text-f12 uppercase tracking-[0.08em] text-accent">Walls · ceilings</p>
            <h3 className="mt-[8px] text-f24 font-semibold">Paste special board</h3>
            <p className="mt-[12px] text-f16 text-ink-2">The manufacturer describes a decorative panel with either a high-pressure-cured glass-fiber or wood-fiber core. It presents the board for interior wall and ceiling applications.</p>
            <Link href={compactwoodInteriorProductPath} className="mt-[20px] text-f14 font-semibold text-accent hover:underline">View product and document checklist →</Link>
          </div>
        </div>
      </Section>

      <Section title="Specify the actual construction" tone="muted">
        <div className="grid gap-[20px] lg:grid-cols-[1.2fr_1fr]">
          <p className="text-f16 text-ink-2">The manufacturer&apos;s page describes two possible core materials and decorative surfaces. Confirm which is offered, its dimensions and finish, installation method, and supporting reports. An interior board should not be substituted for the <Link href={compactwoodExteriorPath} className="font-medium text-accent hover:underline">exterior HPL facade board</Link> without separate evidence.</p>
          <Callout title="Performance documentation">The public page includes fire, moisture and antibacterial claims, but no accessible report for a specific offered construction. Request current test methods and reports for the project&apos;s jurisdiction and application.</Callout>
        </div>
      </Section>

      <Section title="Manufacturer source">
        <a href={compactwoodSources.interiorProduct} target="_blank" rel="noopener noreferrer" className="inline-block rounded-card border border-line p-[18px] text-f14 font-semibold hover:border-line-strong">Compactwood paste special board ↗</a>
      </Section>
      <MaterialQuestions material="interior-board" />
      <CollectionNextSteps category="interior-board" />
    </>
  );
}

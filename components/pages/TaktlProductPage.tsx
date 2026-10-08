import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import TaktlVisual from "@/components/taktl/TaktlVisual";
import TaktlInquiryLink from "@/components/taktl/TaktlInquiryLink";
import { Badge, Callout, PageHeader, Section } from "@/components/ui";
import { findTaktlProduct, taktlProducts, type TaktlProductSlug } from "@/content/data/taktl";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

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

  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: product.name, description: product.metaDescription, path, type: "ItemPage" })} />
      <PageHeader
        eyebrow="TAKTL · available through Cladvera"
        title={product.name}
        lede={product.summary}
        crumbs={[
          { name: "TAKTL products", path: "/suppliers/taktl" },
          { name: product.name, path },
        ]}
        actions={<TaktlInquiryLink productName={product.name} />}
      >
        <div className="mt-[16px]"><Badge>{product.type}</Badge></div>
      </PageHeader>

      <Section>
        <div className="grid items-start gap-[24px] lg:grid-cols-[1.1fr_1fr]">
          <TaktlVisual visual={product.visual} imageUrl={product.imageUrl} imageAlt={product.imageAlt} className="h-[280px] md:h-[360px]" />
          <div>
            <h2 className="mb-[16px] text-f24 font-semibold">Manufacturer facts</h2>
            <dl className="divide-y divide-line rounded-card border border-line">
              {product.facts.map((fact) => (
                <div key={fact.label} className="grid gap-[2px] px-[16px] py-[12px] sm:grid-cols-[180px_1fr]">
                  <dt className="text-f14 font-medium">{fact.label}</dt>
                  <dd className="text-f14 text-ink-2">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-[10px] text-f12 text-ink-3">Values summarize TAKTL literature. Confirm the current revision, assembly and project requirements with the manufacturer.</p>
          </div>
        </div>
      </Section>

      <Section title="Applications and design choices" tone="muted">
        <div className="grid gap-[20px] md:grid-cols-2">
          <div className="rounded-card border border-line bg-paper p-[20px]">
            <h3 className="text-f18 font-semibold">Applications described by TAKTL</h3>
            <ul className="mt-[12px] grid gap-[8px] text-f14 text-ink-2">
              {product.applications.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </div>
          <div className="rounded-card border border-line bg-paper p-[20px]">
            <h3 className="text-f18 font-semibold">Published options</h3>
            <ul className="mt-[12px] grid gap-[8px] text-f14 text-ink-2">
              {product.options.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Verify with the manufacturer">
        <div className="grid gap-[16px] md:grid-cols-2">
          <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" className="rounded-card border border-line bg-paper p-[20px] hover:border-line-strong hover:shadow-card">
            <span className="font-mono text-f12 uppercase tracking-[0.08em] text-accent">Source page ↗</span>
            <span className="mt-[6px] block text-f18 font-semibold">{product.name} at TAKTL</span>
            <span className="mt-[4px] block text-f14 text-ink-2">Current product description and imagery on the manufacturer site.</span>
          </a>
          {product.documentUrl && (
            <a href={product.documentUrl} target="_blank" rel="noopener noreferrer" className="rounded-card border border-line bg-paper p-[20px] hover:border-line-strong hover:shadow-card">
              <span className="font-mono text-f12 uppercase tracking-[0.08em] text-accent">Manufacturer document ↗</span>
              <span className="mt-[6px] block text-f18 font-semibold">{product.documentLabel}</span>
              <span className="mt-[4px] block text-f14 text-ink-2">Opens the original file hosted by TAKTL; check its revision before specification.</span>
            </a>
          )}
        </div>
        <div className="mt-[20px]">
          <Callout title="Specify and order through Cladvera">
            Send us the project drawings, location, target finish and schedule to request TAKTL product pricing and samples. Availability, lead time and final details are confirmed for each project. TAKTL performance and approvals apply only to the named manufacturer products and proposed assemblies.
          </Callout>
        </div>
      </Section>

      <Section title="More TAKTL products" tone="muted">
        <div className="grid gap-[16px] md:grid-cols-2 lg:grid-cols-4">
          {taktlProducts.filter((item) => item.slug !== slug).map((item) => (
            <Link key={item.slug} href={`/suppliers/taktl/${item.slug}`} className="rounded-card border border-line bg-paper p-[16px] hover:border-line-strong hover:shadow-card">
              <span className="font-mono text-f12 text-ink-3">{item.type}</span>
              <span className="mt-[4px] block text-f16 font-semibold">{item.name} →</span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

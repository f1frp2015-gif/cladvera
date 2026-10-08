import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Badge, Cta, PageHeader, Section } from "@/components/ui";
import { catalogApplications, catalogProducts } from "@/content/data/catalog";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const path = "/applications";
const description = "Explore panel families for exterior facades, interior walls, transit, healthcare and custom elements, with practical factors to review before selection.";
export const metadata = buildPageMetadata({ title: "Architectural Panel Applications | Cladvera", description, path });

const reviewFactors: Record<string, string[]> = {
  facade: ["Exposure, panel layout and visual range", "Substrate, attachment, joints and drainage", "Product and complete wall-assembly evidence"],
  interior: ["Surface appearance, joints and panel layout", "Substrate, fixing or bonding compatibility", "Interior-finish reports, cleaning and maintenance"],
  transit: ["Authority requirements and installation environment", "Fire, smoke, impact and cleaning evidence", "Access for inspection and panel replacement"],
  healthcare: ["Cleaning agents, joints and maintenance routine", "Surface performance evidence for the offered finish", "Project infection-control and interior-finish requirements"],
  custom: ["Geometry, modules, tolerances and connection zones", "Material construction, prototype and finish approval", "Tooling, repeat quantities and development responsibilities"],
};

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Architectural panel applications", description, path, type: "CollectionPage" })} />
      <PageHeader eyebrow="Select by application" title="Start with the space, exposure and project requirements" lede="Use the application to build a shortlist, then compare each product's construction and available evidence. These groupings help product discovery; suitability is reviewed for the project." crumbs={[{ name: "Applications", path }]} actions={<><Cta href="/products">Browse all products</Cta><Cta href="/architects" variant="secondary">Selection process</Cta></>} />
      <Section title="Choose an application">
        <div className="grid gap-[24px] lg:grid-cols-2">
          {catalogApplications.map((application) => {
            const products = catalogProducts.filter((product) => product.applications.includes(application.id));
            return (
              <article key={application.id} id={application.id} className="flex flex-col rounded-card border border-line bg-paper p-[24px]">
                <div><Badge>{products.length} product {products.length === 1 ? "family" : "families"}</Badge></div><h2 className="mt-[12px] text-f24 font-semibold">{application.label}</h2><p className="mt-[8px] text-f16 text-ink-2">{application.description}</p>
                <h3 className="mt-[20px] text-f14 font-semibold">Review for the project</h3><ul className="mt-[8px] grid gap-[6px] text-f14 text-ink-2">{(reviewFactors[application.id] ?? []).map((factor) => <li key={factor} className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">•</span>{factor}</li>)}</ul>
                <h3 className="mt-[20px] border-t border-line pt-[16px] text-f14 font-semibold">Families to explore</h3><ul className="mt-[8px] grid gap-[8px] text-f14">{products.map((product) => <li key={product.id}><Link href={product.path} className="text-accent underline underline-offset-4">{product.name}</Link><span className="ml-[6px] text-f12 text-ink-3">{product.manufacturer}</span></li>)}</ul>
                <div className="mt-auto pt-[24px]"><Cta href={`/products?application=${application.id}`} variant="secondary">Explore {application.label.toLowerCase()} →</Cta></div>
              </article>
            );
          })}
        </div>
      </Section>
      <Section title="Move from application to a project request" tone="muted"><p className="max-w-[780px] text-f16 text-ink-2">Compare shortlisted families, request the samples and evidence needed by the design team, then describe the quantities, drawings and delivery needs for a quotation.</p><div className="mt-[20px] flex flex-wrap gap-[12px]"><Cta href="/compare">Compare products</Cta><Cta href="/technical-resources" variant="secondary">Review documents</Cta><Cta href="/procurement" variant="ghost">Procurement process →</Cta></div></Section>
    </>
  );
}

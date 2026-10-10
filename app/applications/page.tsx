import Link from "next/link";
import CatalogVisual from "@/components/catalog/CatalogVisual";
import JsonLd from "@/components/seo/JsonLd";
import { Cta, PageHeader, Section } from "@/components/ui";
import { catalogApplications, catalogProducts } from "@/content/data/catalog";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const path = "/applications";
const description = "Explore facade cladding, interior wall panels, transit, healthcare and custom architectural forms. Find material families and review project requirements.";
export const metadata = buildPageMetadata({ title: "Facade & Interior Panel Applications | Cladvera", description, path });

const reviewFactors: Record<string, string[]> = {
  facade: ["Exposure, panel layout and visual range", "Substrate, attachment, joints and drainage", "Product and complete wall-assembly evidence"],
  interior: ["Surface appearance, joints and panel layout", "Substrate, fixing or bonding compatibility", "Interior-finish reports, cleaning and maintenance"],
  transit: ["Authority requirements and installation environment", "Fire, smoke, impact and cleaning evidence", "Access for inspection and panel replacement"],
  healthcare: ["Cleaning agents, joints and maintenance routine", "Surface performance evidence for the offered finish", "Project infection-control and interior-finish requirements"],
  custom: ["Geometry, modules, tolerances and connection zones", "Material construction, prototype and finish approval", "Tooling, repeat quantities and development responsibilities"],
};

const applicationReferences: Record<string, { productId: string; indexLabel: string; caption: string }> = {
  facade: { productId: "taktl-facade", indexLabel: "Facades", caption: "Manufacturer imagery introduces a candidate material family. Review the proposed panel construction and complete wall assembly." },
  interior: { productId: "compactwood-interior", indexLabel: "Interiors", caption: "Manufacturer construction diagram for an interior board candidate. Confirm the offered core, grade and fixing method." },
  transit: { productId: "almine-tunnel", indexLabel: "Transit", caption: "Material illustration, not an installation photograph. Match the offered panel and supporting reports to authority requirements." },
  healthcare: { productId: "almine-medical", indexLabel: "Healthcare", caption: "Material illustration, not an installation photograph. Verify surface-performance claims for the specified finish." },
  custom: { productId: "gfrp-custom", indexLabel: "Custom forms", caption: "Supplier presentation image as a material reference. Project geometry, laminate, connections and prototypes require review." },
};

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Architectural panel applications", description, path, type: "CollectionPage" })} />
      <PageHeader eyebrow="Select by application" title="Facade and interior panel applications" lede="Start with the space and exposure. Explore exterior cladding, interior walls and ceilings, transit, healthcare and custom forms, then review each material against your project requirements." crumbs={[{ name: "Applications", path }]} actions={<><Cta href="/products">Browse all products</Cta><Cta href="/architects" variant="secondary">Architect specification workflow</Cta></>} />

      <nav aria-label="Application index" className="border-b border-line bg-paper-2">
        <div className="site-container py-[20px] md:py-[24px]">
          <p className="mb-[10px] font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">Application index / 01—05</p>
          <ol className="grid grid-cols-2 gap-x-[20px] sm:grid-cols-3 lg:grid-cols-5">
            {catalogApplications.map((application, index) => (
              <li key={application.id}>
                <Link href={`#${application.id}`} className="group flex min-h-[48px] items-center gap-[12px] border-t border-line py-[12px] text-f14 transition-colors hover:text-accent">
                  <span className="font-mono text-[10px] text-ink-3">{String(index + 1).padStart(2, "0")}</span>
                  <span className="flex-1">{applicationReferences[application.id].indexLabel}</span>
                  <span aria-hidden="true" className="text-ink-3 transition-transform group-hover:translate-y-[2px]">↓</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <Section>
        <div className="grid gap-[56px] md:gap-[88px]">
          {catalogApplications.map((application, index) => {
            const products = catalogProducts.filter(product => product.applications.includes(application.id));
            const reference = applicationReferences[application.id];
            const referenceProduct = products.find(product => product.id === reference.productId) ?? products[0];
            const number = String(index + 1).padStart(2, "0");
            return (
              <article key={application.id} id={application.id} aria-labelledby={`${application.id}-heading`} className="scroll-mt-[112px] border-t border-ink pt-[24px] md:pt-[32px]">
                <div className="mb-[24px] flex items-center justify-between gap-[20px] font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
                  <p><span className="mr-[12px] text-accent">{number}</span> Application study</p>
                  <p>{products.length} material {products.length === 1 ? "family" : "families"}</p>
                </div>
                <div className="grid min-w-0 gap-[32px] lg:grid-cols-2 lg:items-start lg:gap-[64px]">
                  <div className={`min-w-0 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    {referenceProduct && (
                      <>
                        <CatalogVisual product={referenceProduct} />
                        <div className="mt-[16px] flex items-start justify-between gap-[16px] border-b border-line pb-[16px]">
                          <div className="min-w-0">
                            <p className="mb-[6px] font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">Candidate material / {referenceProduct.manufacturer}</p>
                            <Link href={referenceProduct.path} className="text-f14 font-medium underline-offset-[5px] hover:text-accent hover:underline">{referenceProduct.name}<span aria-hidden="true" className="ml-[8px] text-accent">↗</span></Link>
                          </div>
                        </div>
                        <p className="mt-[12px] max-w-[520px] text-f12 leading-[1.8] text-ink-3">{reference.caption}</p>
                      </>
                    )}
                  </div>
                  <div className={`min-w-0 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <h2 id={`${application.id}-heading`} className="max-w-[560px] text-[34px] font-normal leading-[1.08] tracking-[-0.05em] md:text-[46px] lg:text-[52px]">{application.label}</h2>
                    <p className="mt-[20px] max-w-[520px] text-f16 leading-[1.8] text-ink-2">{application.description}</p>
                    {application.id === "facade" ? <p className="mt-[16px] max-w-[520px] text-f14 leading-[1.8] text-ink-2">Compare ACM/MCM, exterior HPL, UHPC and GFRP in the <Link href="/guides/facade-materials#material-comparison" className="text-accent underline underline-offset-4">facade material selection guide</Link> before reviewing a specific construction.</p> : null}
                    <h3 className="mb-[4px] mt-[32px] font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">Design &amp; technical considerations</h3>
                    <ol className="grid">
                      {(reviewFactors[application.id] ?? []).map((factor, factorIndex) => (
                        <li key={factor} className="flex gap-[16px] border-b border-line py-[14px] text-f14 leading-[1.7] text-ink-2">
                          <span aria-hidden="true" className="pt-[2px] font-mono text-[10px] text-accent">{String(factorIndex + 1).padStart(2, "0")}</span>
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-[20px] flex flex-wrap gap-x-[28px] gap-y-[4px]">
                      <Cta href={`/products?application=${application.id}#catalog-results`} variant="ghost">Browse products <span aria-hidden="true">↗</span></Cta>
                      <Cta href={`/technical-resources?application=${application.id}#resource-results`} variant="ghost">Technical resources <span aria-hidden="true">↗</span></Cta>
                    </div>
                  </div>
                </div>
                <div className="mt-[32px] grid min-w-0 gap-[20px] border-t border-line pt-[24px] lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-[40px]">
                  <div>
                    <h3 className="text-f14 font-medium">Families to explore</h3>
                    <p className="mt-[6px] text-f12 leading-[1.7] text-ink-3">Open a family to review its construction and documentation.</p>
                  </div>
                  <ul className="grid min-w-0 gap-x-[28px] sm:grid-cols-2 xl:grid-cols-3">
                    {products.map(product => (
                      <li key={product.id} className="min-w-0 border-b border-line">
                        <Link href={product.path} className="group flex min-h-[72px] items-start justify-between gap-[12px] py-[12px] transition-colors hover:text-accent">
                          <span className="min-w-0"><span className="block text-f14 leading-[1.5]">{product.name}</span><span className="mt-[5px] block text-[10px] uppercase leading-[1.6] tracking-[0.03em] text-ink-3">{product.manufacturer}</span></span>
                          <span aria-hidden="true" className="shrink-0 text-ink-3 transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">↗</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-[28px] border-t border-ink pt-[28px] lg:grid-cols-[1fr_1fr] lg:gap-[64px]">
          <div><p className="eyebrow mb-[18px]">From context to specification</p><h2 className="max-w-[560px] text-[34px] font-normal leading-[1.1] tracking-[-0.045em] md:text-[46px]">Move from application to a project request.</h2></div>
          <div><p className="max-w-[580px] text-f16 leading-[1.8] text-ink-2">Compare shortlisted families, <Link href="/samples" className="text-accent underline underline-offset-4">request material samples</Link> and the evidence needed by the design team, then describe the quantities, drawings and delivery needs for a quotation.</p><div className="mt-[24px] flex flex-wrap gap-[12px]"><Cta href="/compare">Compare products</Cta><Cta href="/technical-resources" variant="secondary">Review documents</Cta></div><div className="mt-[12px]"><Cta href="/procurement" variant="ghost">Procurement process <span aria-hidden="true">↗</span></Cta></div></div>
        </div>
      </Section>
    </>
  );
}

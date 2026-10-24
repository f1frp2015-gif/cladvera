import Link from "next/link";
import { notFound } from "next/navigation";
import CatalogVisual from "@/components/catalog/CatalogVisual";
import { CollectionNextSteps } from "@/components/catalog/ProductJourney";
import ProductSectionNav from "@/components/catalog/ProductSectionNav";
import JsonLd from "@/components/seo/JsonLd";
import { Cta, PageHeader, Section } from "@/components/ui";
import { findCatalogProduct, productRequestHref } from "@/content/data/catalog";
import { isPublishedPath } from "@/content/data/publication";
import { uhpcCollectionPath, uhpcProductionLocation, uhpcProducts } from "@/content/data/uhpc";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description = "Source architectural UHPC panels and custom elements from Xuzhou, Jiangsu, China. Define finishes, project requirements and evidence needed for specification.";
export const metadata = buildPageMetadata({ title: "Architectural UHPC Design Inquiries | Cladvera", description, path: uhpcCollectionPath });
const sections = [{ id: "design-inquiries", label: "Design inquiries" }, { id: "project-brief", label: "Project brief" }, { id: "evidence", label: "Evidence" }] as const;

export default function Page() {
  if (!isPublishedPath(uhpcCollectionPath)) notFound();

  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Architectural UHPC design inquiries", description, path: uhpcCollectionPath, type: "CollectionPage" })} />
      <PageHeader
        eyebrow="Material collection / Architectural concrete"
        title="Architectural UHPC"
        lede="Develop the surface, the panel and the connection as one project brief. Explore ultra-high performance concrete design inquiries with Cladvera."
        crumbs={[{ name: "Products", path: "/products" }, { name: "Architectural UHPC", path: uhpcCollectionPath }]}
        actions={<><Cta href="#design-inquiries">Explore design inquiries <span aria-hidden="true">↓</span></Cta><Cta href={productRequestHref("uhpc-facade")} variant="secondary">Discuss your project <span aria-hidden="true">↗</span></Cta></>}
      >
        <p className="mt-[24px] text-f14 leading-[1.7] text-ink-2">UHPC panels and custom elements are produced in {uhpcProductionLocation}. Manufacturer identity remains to be confirmed. Attachment-component production location is confirmed separately.</p>
        <p className="mt-[24px] max-w-[780px] border-l-2 border-accent pl-[20px] text-f14 leading-[1.7] text-ink-3">These categories organize architectural design requests. Manufacturer, composition, dimensions, finishes, performance evidence and supply availability are to be confirmed for each proposal. Illustrations show design studies only.</p>
      </PageHeader>
      <ProductSectionNav items={sections} />

      <Section id="design-inquiries" className="scroll-mt-[64px]" title="From facade surface to connection" lede="Choose the part of the project you want to develop. Each inquiry page sets out the design information to share and the evidence to confirm.">
        <div className="grid gap-x-[32px] gap-y-[48px] md:grid-cols-2 lg:grid-cols-3">
          {uhpcProducts.map((product, index) => (
            <Link key={product.id} href={`${uhpcCollectionPath}/${product.slug}`} className="group border-t border-line-strong pt-[20px] hover:border-accent">
              <p className="mb-[18px] font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">{String(index + 1).padStart(2, "0")} / Design inquiry</p>
              <CatalogVisual product={findCatalogProduct(product.id)!} />
              <h2 className="mt-[24px] text-f24 font-medium leading-[1.25] group-hover:text-accent">{product.name} <span aria-hidden="true">↗</span></h2>
              <p className="mt-[14px] text-f14 leading-[1.7] text-ink-2">{product.summary}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="project-brief" tone="muted" className="scroll-mt-[64px]" title="Make the inquiry specific" lede="A useful brief separates architectural intent from the requirements that need technical confirmation.">
        <div className="grid gap-[32px] md:grid-cols-3">
          {[
            { title: "Surface and geometry", body: "Share original elevations, panel boundaries, visible edges and the intended surface character. Identify which dimensions are fixed and which can be developed with the proposed source." },
            { title: "Wall and connection", body: "Include supporting structure, cavity intent, adjacent materials and the project's design criteria. Ask the responsible engineer to review the proposed panel and attachment together." },
            { title: "Supply and approval", body: "State the delivery location, quantity, target dates and sample or mock-up purpose. Manufacturing source, commercial scope and the approval sequence must be agreed for the actual proposal." },
          ].map(item => <article key={item.title} className="border-t border-line-strong pt-[24px]"><h3 className="text-f24 font-medium">{item.title}</h3><p className="mt-[16px] text-f14 leading-[1.75] text-ink-2">{item.body}</p></article>)}
        </div>
      </Section>

      <Section id="evidence" className="scroll-mt-[64px]" title="Evidence follows the actual product" lede="No product-specific technical data, certified performance or approved assembly is established by these design categories.">
        <div className="grid gap-[32px] lg:grid-cols-2">
          <div>
            <p className="text-f16 leading-[1.75] text-ink-2">Before specification, obtain documents that identify the proposed manufacturer, product designation, construction and relevant test conditions. The project team should assess whether those documents apply to the proposed panel, attachment, wall assembly and destination.</p>
            <p className="mt-[18px] text-f16 leading-[1.75] text-ink-2">Cladvera acts as a supplier coordinating the inquiry. Manufacturer identity and availability remain to be confirmed; origin documents are reviewed for the actual shipment. Samples and illustrations support design discussion; they do not replace technical verification.</p>
          </div>
          <div className="border-y border-line-strong py-[24px]">
            <h3 className="text-f20 font-medium">Prepare for the technical review</h3>
            <ul className="mt-[20px] space-y-[14px] text-f14 text-ink-2">
              <li>Identify the proposed product and manufacturer.</li>
              <li>Request current data, relevant reports and installation details.</li>
              <li>Coordinate project-specific engineering and sample approval.</li>
              <li>Confirm the quotation, delivery scope and production release criteria.</li>
            </ul>
            <Cta href={productRequestHref("uhpc-facade", "documents")} className="mt-[28px]">Request a project review <span aria-hidden="true">↗</span></Cta>
          </div>
        </div>
      </Section>
      <CollectionNextSteps category="uhpc" />
    </>
  );
}

import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Badge, Callout, Cta, PageHeader, Section } from "@/components/ui";
import { catalogProducts, productRequestHref } from "@/content/data/catalog";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const path = "/technical-resources";
const description = "Find available manufacturer panel documents and request product-specific data, test reports and attachment information for architectural and procurement review.";
export const metadata = buildPageMetadata({ title: "Panel Documents and Technical Resources | Cladvera", description, path });

const reviewSet = [
  { title: "Product identity and construction", body: "Name the manufacturer, family, offered grade, core, faces, thickness, size and finish. Record the document date and revision." },
  { title: "Performance evidence", body: "Request relevant reports for the actual construction and project jurisdiction. Match the test method, specimen, results and assembly to the proposal." },
  { title: "Interfaces and installation", body: "Coordinate fixing details, supporting structure, joints, movement, substrate and installation responsibilities. Request project details where needed." },
  { title: "Samples and closeout", body: "Agree physical finish references, mock-up requirements, care guidance and warranty terms for the ordered product." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Panel documents and technical resources", description, path, type: "CollectionPage" })} />
      <PageHeader eyebrow="Technical review" title="Connect each product to its evidence" lede="Open the listed source documents or request information for a named product. Check document revision and applicability to the exact construction before specification or order." crumbs={[{ name: "Technical resources", path }]} actions={<><Cta href="/products">Find a product</Cta><Cta href="/request-quote?intent=documents" variant="secondary">Request a document package</Cta></>} />

      <Section title="Documents by product" lede="Direct document links are shown where a file has been identified. A manufacturer product page provides context; a document request confirms what can be supplied for your project.">
        <div className="grid gap-[16px] md:grid-cols-2">
          {catalogProducts.map((product) => (
            <article key={product.id} className="flex flex-col rounded-card border border-line p-[20px]">
              <p className="font-mono text-f12 text-accent">{product.manufacturer}</p><h2 className="mt-[6px] text-f20 font-semibold"><Link href={product.path} className="hover:text-accent">{product.name}</Link></h2><p className="mt-[10px] text-f14 text-ink-2">{product.documentation}</p>
              <div className="mt-[16px]"><Badge tone={product.documentUrl ? "accent" : "neutral"}>{product.documentUrl ? "Source document linked" : "Product-specific documents on request"}</Badge></div>
              <div className="mt-auto flex flex-wrap items-center gap-[16px] pt-[20px] text-f14">
                {product.documentUrl && <a href={product.documentUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline underline-offset-4">{product.documentLabel ?? "Open source document"} ↗</a>}
                <Link href={productRequestHref(product.id, "documents")} className="font-semibold text-accent underline underline-offset-4">Request documents</Link><Link href={product.path} className="text-ink-2 underline underline-offset-4">Product details</Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Build a review package" tone="muted" lede="Select the information required by the design team and project contract. Availability and scope are confirmed for the named product.">
        <div className="grid gap-[16px] md:grid-cols-2">{reviewSet.map((item) => <div key={item.title} className="rounded-card border border-line bg-paper p-[20px]"><h2 className="text-f18 font-semibold">{item.title}</h2><p className="mt-[8px] text-f14 text-ink-2">{item.body}</p></div>)}</div>
        <div className="mt-[20px]"><Callout title="CAD, BIM and specification files">Include the required file format and intended use in a document request. Available files, product coverage and revision are confirmed by the source. A linked product data sheet does not imply that CAD, BIM or a project specification is also available.</Callout></div>
      </Section>
      <Section title="Use the documents in the next decision"><div className="flex flex-wrap gap-[12px]"><Cta href="/architects">Architect selection workflow</Cta><Cta href="/procurement" variant="secondary">Procurement checklist</Cta><Cta href="/compare" variant="ghost">Compare product families →</Cta></div></Section>
    </>
  );
}

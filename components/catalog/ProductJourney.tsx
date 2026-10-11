import Link from "next/link";
import SelectionButton from "@/components/catalog/SelectionButton";
import CatalogVisual from "@/components/catalog/CatalogVisual";
import { Cta, Section } from "@/components/ui";
import { catalogApplications, catalogCategories, catalogProducts, findCatalogProduct, productRequestHref, type CatalogProduct } from "@/content/data/catalog";

function relatedProducts(product: CatalogProduct) {
  const candidates = catalogProducts.filter(candidate => candidate.id !== product.id && candidate.category !== "hardware" && candidate.applications.some(application => product.applications.includes(application)));
  const score = (candidate: CatalogProduct) => candidate.applications.filter(application => product.applications.includes(application)).length + (candidate.applications.includes(product.applications[0]) ? 3 : 0);
  const ranked = candidates.sort((a, b) => score(b) - score(a));
  const categories = new Set<string>();
  const varied = ranked.filter(candidate => {
    if (categories.has(candidate.category)) return false;
    categories.add(candidate.category);
    return true;
  });
  return [...varied, ...ranked.filter(candidate => !varied.includes(candidate))].slice(0, 3);
}

export default function ProductJourney({ productId }: { productId: string }) {
  const product = findCatalogProduct(productId);
  if (!product) return null;

  const hardware = product.category === "hardware";
  const category = catalogCategories.find(item => item.id === product.category);
  const related = hardware
    ? catalogProducts.filter(candidate => candidate.manufacturer === "TAKTL" && candidate.category === "uhpc").slice(0, 3)
    : relatedProducts(product);
  const compatibleHardware = !hardware && product.manufacturer === "TAKTL" ? findCatalogProduct("taktl-hardware") : undefined;

  return (
    <>
      <Section id="project-next-steps" title="Move this product into your project" lede="Build a shortlist, then request the evidence, samples and commercial scope needed for your next decision." tone="muted">
        <div className="flex flex-wrap items-center gap-[12px]">
          <SelectionButton productId={product.id} />
          <Cta href="/compare" variant="secondary">Compare shortlist →</Cta>
          <Link href="/procurement" className="text-f14 font-semibold text-accent hover:underline">See the procurement process →</Link>
          {product.manufacturer !== "TAKTL" && <Link href="/sourcing/china" className="text-f14 font-semibold text-accent hover:underline">Plan sourcing from China →</Link>}
        </div>
        <div className="mt-[40px] grid gap-[28px] md:grid-cols-3 md:gap-[40px]">
          {[
            { step: "01 · Technical review", title: "Request product documents", text: "Identify the proposed construction, reports, installation details and project requirements to review.", intent: "documents" as const },
            { step: "02 · Design approval", title: "Request a sample or mock-up", text: "Define the finish, sample size and approval purpose. Scope, cost and timing are confirmed before ordering.", intent: "sample" as const },
            { step: "03 · Procurement", title: "Prepare a product RFQ", text: "Share quantities, drawings, delivery location and target dates for a project-specific quotation.", intent: "quote" as const },
          ].map(item => (
            <Link key={item.intent} href={productRequestHref(product.id, item.intent)} className="group border-t border-line-strong py-[22px] hover:border-accent">
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">{item.step}</span>
              <h3 className="mt-[20px] text-f24 font-medium leading-[1.25] group-hover:text-accent">{item.title} <span aria-hidden="true">↗</span></h3>
              <p className="mt-[12px] text-f14 text-ink-2">{item.text}</p>
            </Link>
          ))}
        </div>
        <p className="mt-[14px] text-f12 text-ink-3">Each request includes {product.name}. Add other products in the request or bring your saved shortlist from the comparison page.</p>
      </Section>

      <Section title={hardware ? "Coordinate with TAKTL panels" : "Continue your material review"}>
        {hardware ? (
          <p className="mb-[20px] max-w-[780px] text-f14 text-ink-2">These attachment components belong to the TAKTL product system. Confirm the component schedule, panel geometry, substructure and engineered loads for the selected panel.</p>
        ) : (
          <div className="mb-[24px]">
            <p className="text-f14 text-ink-2">Explore the applications listed for this product:</p>
            <div className="mt-[10px] flex flex-wrap gap-[8px]">
              {product.applications.map(application => (
                <Link key={application} href={`/applications#${application}`} className="rounded-control border border-line px-[12px] py-[8px] text-f14 font-medium hover:border-line-strong">{catalogApplications.find(item => item.id === application)?.label || application} →</Link>
              ))}
            </div>
          </div>
        )}
        {product.collectionPath !== product.path && (
          <p className="mb-[20px] text-f14 text-ink-2">
            See the <Link href={product.collectionPath} className="font-semibold text-accent underline underline-offset-4">{product.manufacturer} {hardware ? "Architectural UHPC" : category?.label} collection</Link> for material context and manufacturer information.
          </p>
        )}
        {!hardware && <p className="mb-[20px] text-f14 text-ink-2">Review material terminology and specification inputs in the <Link href="/guides/facade-materials" className="text-accent underline underline-offset-4">ACM, HPL, UHPC and GFRP selection guide</Link>.</p>}
        {related.length > 0 ? (
          <>
            {!hardware && <p className="mb-[16px] max-w-[780px] text-f14 text-ink-2">The following products share a listed application. Compare their construction, design intent and evidence before considering them for the same project.</p>}
            <div className="grid gap-x-[32px] gap-y-[40px] md:grid-cols-3">
              {related.map(candidate => {
                const sharedApplication = catalogApplications.find(application => candidate.applications.includes(application.id) && product.applications.includes(application.id));
                return (
                  <Link key={candidate.id} href={candidate.path} className="group border-t border-line-strong pt-[16px] hover:border-accent">
                    <span className="mb-[16px] block font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3">{candidate.manufacturer} · {catalogCategories.find(category => category.id === candidate.category)?.label}</span>
                    <CatalogVisual product={candidate} />
                    <h3 className="mt-[20px] text-f24 font-medium group-hover:text-accent">{candidate.name} <span aria-hidden="true">↗</span></h3>
                    <p className="mt-[12px] text-f14 text-ink-2">{hardware ? "Review this panel family alongside its proposed TAKTL attachment schedule." : `Review for ${sharedApplication?.label.toLowerCase() || "the listed application"}: ${candidate.construction}`}</p>
                  </Link>
                );
              })}
            </div>
            {!hardware && <p className="mt-[12px] text-f12 text-ink-3">Shared application tags do not establish equivalent performance or an approved substitution.</p>}
          </>
        ) : (
          <p className="text-f14 text-ink-2">This is the only current catalogue entry with this application. <Link href={productRequestHref(product.id, "documents")} className="font-semibold text-accent hover:underline">Request a project-specific technical review →</Link></p>
        )}
        {compatibleHardware && (
          <div className="mt-[24px] rounded-card border border-line bg-paper-2 p-[20px]">
            <h3 className="text-f18 font-semibold">Coordinate the attachment system</h3>
            <p className="mt-[6px] text-f14 text-ink-2">Review TAKTL rails, clips, anchors and fasteners with the selected panel. The final attachment schedule requires project-specific engineering.</p>
            <Link href={compatibleHardware.path} className="mt-[10px] inline-block text-f14 font-semibold text-accent hover:underline">View TAKTL attachment components →</Link>
          </div>
        )}
      </Section>
    </>
  );
}

export function CollectionNextSteps({ category }: { category: string }) {
  const steps = [
    { href: `/products?category=${category}#catalog-results`, title: "Explore this material", text: "Refine by application or supplier, and add relevant products to your shortlist." },
    { href: "/compare", title: "Compare your shortlist", text: "Review construction and documentation, then carry your selection into a sample request or RFQ." },
    { href: "/technical-resources", title: "Find technical documents", text: "Open supplier literature and request the project-specific evidence needed for specification." },
  ];
  return (
    <Section title="Select, review and request" tone="muted">
      <div className="grid gap-[32px] md:grid-cols-3">
        {steps.map((step, index) => <Link key={step.href} href={step.href} className="group border-t border-line-strong py-[24px] hover:border-accent"><span className="font-mono text-f12 text-accent">0{index + 1}</span><h3 className="mt-[20px] text-f24 font-medium group-hover:text-accent">{step.title} <span aria-hidden="true">↗</span></h3><p className="mt-[12px] text-f14 text-ink-2">{step.text}</p></Link>)}
      </div>
    </Section>
  );
}

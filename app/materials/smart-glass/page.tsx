import Link from "next/link";
import ProductJourney from "@/components/catalog/ProductJourney";
import JsonLd from "@/components/seo/JsonLd";
import SmartGlassDemo from "@/components/smart-glass/SmartGlassDemo";
import { Breadcrumbs, Cta, Section } from "@/components/ui";
import { productRequestHref } from "@/content/data/catalog";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const path = "/materials/smart-glass";
const productId = "singyes-smart-glass";
const description = "Explore smart glass facade panels with Cladvera. Review Singyes curtain-wall glazing, exterior film grade, glass build-up, controls and project documentation.";

export const metadata = buildPageMetadata({
  title: "Smart Glass Facade Panels | Cladvera",
  description,
  path,
});

const assemblyReviews = [
  {
    number: "01",
    title: "Glass & active layer",
    body: "Identify the proposed exterior film grade and complete glass build-up. Review the glass types, interlayers and any insulating-glass configuration as one facade panel.",
    review: "Request current documentation for that construction and its intended exposure.",
  },
  {
    number: "02",
    title: "Edges & facade interfaces",
    body: "Bring the glazing and facade teams together around framing, edge seals, cable exits and installation access. Coordinate these details with the proposed panel construction.",
    review: "Include interface drawings and the requirements for weather exposure and maintenance.",
  },
  {
    number: "03",
    title: "Power & controls",
    body: "Define how facade zones will switch and where the electrical equipment will sit. Coordinate wiring routes, controller input and output ratings, and service access.",
    review: "Confirm the compatible controller and the electrical documentation required at the destination.",
  },
];

const inquiryItems = [
  { title: "Project & exposure", body: "Location, facade orientation, climate and environmental exposure, destination and project schedule." },
  { title: "Panel schedule & drawings", body: "Pane dimensions, quantities, geometry, proposed glass build-up and frame or curtain-wall details." },
  { title: "Appearance & optical goals", body: "Desired clear and frosted appearance, viewing angles, privacy needs and any separate solar or thermal criteria." },
  { title: "Facade requirements", body: "Project-specific structural, safety-glazing, air, water and thermal criteria for review against the proposed assembly." },
  { title: "Electrical integration", body: "Available supply, switching zones, control method, wiring routes, cable exits and service access." },
  { title: "Evidence & sample review", body: "Current exterior-grade identification, assembly-specific test evidence, controller data, installation details and sample availability." },
];

const sources = [
  { title: "Manufacturer profile & curtain-wall development", language: "English · official website", url: "https://www.syeamt.com/en" },
  { title: "Architectural curtain-wall applications", language: "English · manufacturer application gallery", url: "https://www.syeamt.com/en/case_63/" },
  { title: "PDLC switching principle", language: "English · component mechanism reference", url: "https://www.syeamt.com/en/products_59/76.html" },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Smart glass facade panels", description, path, type: "ItemPage" })} />
      <header className="bg-paper">
        <div className="site-container pb-[32px] pt-[24px] md:pb-[40px] md:pt-[28px]">
          <Breadcrumbs items={[{ name: "Products", path: "/products" }, { name: "Smart glass facade panels", path }]} />
          <div className="mt-[32px] grid gap-[28px] lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-[64px]">
            <div>
              <p className="eyebrow mb-[16px]">Singyes New Materials / Curtain-wall glazing</p>
              <h1 className="max-w-[750px] text-[clamp(2.75rem,5.3vw,4.75rem)] font-normal leading-[1.03] tracking-[-0.055em]">Smart glass<br /><span className="editorial-serif">facade panels.</span></h1>
            </div>
            <div>
              <p className="max-w-[580px] text-f16 leading-[1.7] text-ink-2">Explore Singyes New Materials&apos; switchable-glazing technology for architectural curtain walls. Cladvera coordinates confirmation of the exterior film grade, complete glass assembly and its integration into your facade.</p>
              <div className="mt-[24px] flex flex-wrap gap-[10px]">
                <Cta href={productRequestHref(productId, "sample")}>Request a sample <span aria-hidden="true">↗</span></Cta>
                <Cta href={productRequestHref(productId, "documents")} variant="secondary">Request documents</Cta>
              </div>
              <Link href={productRequestHref(productId)} className="mt-[8px] inline-flex min-h-[44px] items-center gap-[20px] text-f12 text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-accent">Discuss project pricing <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
      </header>

      <div className="site-container pb-[16px] md:pb-[24px]">
        <SmartGlassDemo />
      </div>

      <Section id="how-it-works">
        <div className="grid gap-[32px] lg:grid-cols-[0.85fr_1.3fr] lg:gap-[80px]">
          <div>
            <p className="eyebrow mb-[16px]">01 / The switching principle</p>
            <h2 className="text-[34px] font-normal leading-[1.1] tracking-[-0.045em] md:text-[46px]">A switchable<br /><span className="editorial-serif">glass surface.</span></h2>
          </div>
          <div>
            <p className="text-f16 leading-[1.7] text-ink-2">PDLC means polymer-dispersed liquid crystal. Singyes describes electrically controlled switching between a clearer powered state and a light-scattering frosted state. Review the appearance of the proposed curtain-wall construction in both states.</p>
            <dl className="mt-[24px] grid border-y border-line-strong sm:grid-cols-2">
              <div className="border-b border-line py-[20px] sm:border-b-0 sm:border-r sm:pr-[24px]"><dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">Power on</dt><dd className="mt-[8px] text-f24 font-medium">Clear view</dd></div>
              <div className="py-[20px] sm:pl-[24px]"><dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">Power off</dt><dd className="mt-[8px] text-f24 font-medium">Frosted privacy</dd></div>
            </dl>
            <p className="mt-[20px] text-f14 leading-[1.7] text-ink-2">The frosted state provides a light-transmitting privacy effect, not blackout. Assess a sample at the intended viewing angles; solar-control and thermal requirements need separate assembly-specific evidence.</p>
          </div>
        </div>
      </Section>

      <Section id="facade-assembly" title="Specify the complete facade panel." lede="The active layer, glass, framing and controls need a coordinated exterior-use review." tone="muted">
        <div className="grid gap-[32px] md:grid-cols-3 md:gap-[40px]">
          {assemblyReviews.map(item => (
            <article key={item.title} className="border-t border-line-strong pt-[20px]">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent">{item.number} / Assembly review</p>
              <h3 className="mt-[18px] text-[28px] font-normal leading-[1.15] tracking-[-0.035em]">{item.title}</h3>
              <p className="mt-[16px] text-f14 leading-[1.7] text-ink-2">{item.body}</p>
              <p className="mt-[20px] border-t border-line pt-[18px] text-f14 leading-[1.7] text-ink-2">{item.review}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="project-brief" title="Start with your facade brief." lede="Send the drawings and requirements below to support an exterior glazing proposal, sample request or document review.">
        <dl className="grid gap-x-[48px] md:grid-cols-2">
          {inquiryItems.map(item => (
            <div key={item.title} className="border-t border-line-strong py-[22px]">
              <dt className="text-f16 font-medium">{item.title}</dt>
              <dd className="mt-[9px] text-f14 leading-[1.7] text-ink-2">{item.body}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-[24px] flex flex-wrap items-center gap-x-[28px] gap-y-[12px]">
          <Cta href={productRequestHref(productId)}>Send a facade inquiry <span aria-hidden="true">↗</span></Cta>
          <Link href="/procurement" className="inline-flex min-h-[44px] items-center gap-[20px] text-f12 text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-accent">Review the procurement process <span aria-hidden="true">↗</span></Link>
        </div>
      </Section>

      <Section id="manufacturer-sources" tone="muted">
        <div className="grid gap-[32px] lg:grid-cols-[0.85fr_1.3fr] lg:gap-[80px]">
          <div>
            <p className="eyebrow mb-[16px]">Manufacturer sources</p>
            <h2 className="text-[32px] font-normal leading-[1.15] tracking-[-0.04em] md:text-[42px]">Singyes New Materials</h2>
            <p className="mt-[20px] text-f16 text-ink-2">Zhuhai Shuifa Singyes New Materials Technology Co., Ltd</p>
            <p className="mt-[16px] text-f14 leading-[1.7] text-ink-2">Singyes introduces curtain-wall-specific smart film and publishes an architectural curtain-wall application gallery. These establish the manufacturer&apos;s application direction; the offered exterior grade, complete glazing construction and project-specific evidence remain subject to confirmation.</p>
          </div>
          <ul className="divide-y divide-line border-y border-line-strong">
            {sources.map(source => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="group block py-[18px]">
                  <span className="flex items-start justify-between gap-[20px] text-f16 font-medium group-hover:text-accent">{source.title}<span aria-hidden="true" className="text-accent">↗</span></span>
                  <span className="mt-[6px] block text-f12 text-ink-3">{source.language}</span>
                  <span className="mt-[8px] block break-all font-mono text-[10px] leading-[1.6] text-ink-3">{source.url}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ProductJourney productId={productId} />
    </>
  );
}

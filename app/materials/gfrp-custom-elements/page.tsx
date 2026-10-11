import Image from "next/image";
import Link from "next/link";
import ProductJourney from "@/components/catalog/ProductJourney";
import MaterialQuestions from "@/components/catalog/MaterialQuestions";
import JsonLd from "@/components/seo/JsonLd";
import { Badge, Callout, Cta, KeyValueList, PageHeader, Section, Steps } from "@/components/ui";
import {
  gfrpBriefItems,
  gfrpForms,
  gfrpImages,
  gfrpPath as path,
  gfrpSupplier,
  gfrpTechnicalItems,
  gfrpWorkflow,
} from "@/content/data/gfrp";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description = "Source custom GFRP / GRP facade and architectural elements. Review molded fiberglass forms, drawing requirements, tooling and project-specific documents.";

export const metadata = buildPageMetadata({
  title: "Custom GFRP / GRP Architectural Supplier | Cladvera",
  description,
  path,
});

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Custom GFRP architectural elements", description, path, type: "ItemPage" })} />
      <PageHeader
        eyebrow="GFRP / GRP · custom molded component supply"
        title="Custom GFRP architectural elements."
        lede="Source custom glass-fiber reinforced polymer (GFRP), also called GRP or architectural fiberglass, for curved facades, soffits and sculptural surfaces. Cladvera coordinates the supplier inquiry around your drawings, laminate, finish, connections and delivery requirements."
        crumbs={[{ name: "Products", path: "/products" }, { name: "Custom GFRP elements", path }]}
        actions={
          <>
            <Cta href="/request-quote?products=gfrp-custom">Discuss your custom project</Cta>
            <Cta href="#supplier-document" variant="secondary">View supplier document</Cta>
          </>
        }
      >
        <div className="mt-[20px] flex flex-wrap gap-[8px]">
          <Badge tone="accent">Made to drawing</Badge>
          <Badge>Facade & interior</Badge>
          <Badge>Project-specific tooling</Badge>
        </div>
      </PageHeader>

      <Section title="GFRP custom architectural elements" lede="Supplier: Shandong Jinguang Group (Kinflare). The examples on this page come from its FRP presentation supplied to Cladvera.">
        <div className="grid items-start gap-[28px] lg:grid-cols-[1.2fr_0.8fr]">
          <figure className="overflow-hidden rounded-card border border-line bg-paper-2">
            <Image
              src={gfrpImages.installed}
              alt="Curved white architectural elements mounted in front of a steel support frame, shown in the Kinflare supplier presentation"
              width={789}
              height={361}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="h-auto w-full"
            />
            <figcaption className="p-[16px] text-f12 text-ink-3">Supplier construction example, original slide 42. Image supplied by Kinflare; shown as a manufacturing and installation reference.</figcaption>
          </figure>
          <div>
            <h3 className="text-f20 font-semibold">A component designed as part of an assembly</h3>
            <p className="mt-[12px] text-f16 text-ink-2">GFRP combines glass reinforcement with a polymer resin matrix. The supplier&apos;s presentation shows shaped laminates formed in custom molds, with surface finishes and embedded metal connection pieces.</p>
            <p className="mt-[12px] text-f16 text-ink-2">Dimensions, thickness, weight, reinforcement and support spacing are developed for the proposed geometry and loads. Cladvera coordinates the supply inquiry with the manufacturer and your project team.</p>
            <Link href="#project-brief" className="mt-[18px] inline-flex text-f14 font-semibold text-accent underline underline-offset-4">Prepare a drawing brief →</Link>
          </div>
        </div>
      </Section>

      <Section title="Choose by architectural form" tone="muted" lede="Use these starting points to describe the component you need. Suitability is reviewed against the actual location, geometry and assembly.">
        <div className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
          {gfrpForms.map((form) => (
            <article key={form.title} className="rounded-card border border-line bg-paper p-[20px]">
              <h3 className="text-f18 font-semibold">{form.title}</h3>
              <p className="mt-[10px] text-f14 text-ink-2">{form.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="From digital geometry to a molded component" lede="The supplier illustrates custom tooling, glass-fiber lay-up, gelcoat and vacuum-assisted processing. The manufacturing method and laminate for your order are agreed during technical review.">
        <div className="grid gap-[20px] md:grid-cols-2">
          <figure className="overflow-hidden rounded-card border border-line bg-paper-2">
            <div className="relative aspect-[4/3]">
              <Image src={gfrpImages.mold} alt="A curved custom mold under construction with shaped ribs and a lined surface" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" />
            </div>
            <figcaption className="p-[16px] text-f14"><strong className="font-semibold">Custom mold development</strong><span className="mt-[5px] block text-ink-2">Tooling follows the approved surface and panel divisions. Supplier photograph, original slide 21.</span></figcaption>
          </figure>
          <figure className="overflow-hidden rounded-card border border-line bg-paper-2">
            <div className="relative aspect-[4/3]">
              <Image src={gfrpImages.infusion} alt="A curved composite mold with fiber layers, flow mesh and resin distribution tubing" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" />
            </div>
            <figcaption className="p-[16px] text-f14"><strong className="font-semibold">Preparation for vacuum processing</strong><span className="mt-[5px] block text-ink-2">The presentation shows flow media, tubing and vacuum-bag preparation. Supplier photograph, original slide 17.</span></figcaption>
          </figure>
        </div>
        <div className="mt-[24px]"><Callout title="Plan panel divisions early">Larger modules can reduce visible joints while increasing transport and handling demands. Smaller modules can simplify access while introducing more connections and finishing work. Review these choices with the structural and installation teams before releasing molds.</Callout></div>
      </Section>

      <Section title="A clear path from concept to purchase" tone="muted" lede="Use this project sequence to agree what is included at each decision point.">
        <Steps steps={gfrpWorkflow} />
      </Section>

      <Section id="project-brief" title="What to include in your custom inquiry" lede="A complete brief helps the supplier evaluate tooling, material, transport and installation constraints together.">
        <div className="grid gap-[28px] lg:grid-cols-[1.25fr_0.75fr]">
          <KeyValueList items={gfrpBriefItems} />
          <aside className="rounded-card border border-accent-border bg-accent-bg p-[24px]">
            <h3 className="text-f20 font-semibold">Start with the information you have</h3>
            <p className="mt-[10px] text-f14 text-ink-2">Concept sketches are useful at the first review. Identify missing dimensions or design decisions, and include model or drawing links in your inquiry.</p>
            <div className="mt-[20px]"><Cta href="/request-quote?products=gfrp-custom">Prepare GFRP inquiry</Cta></div>
            <p className="mt-[12px] text-f12 text-ink-3">Quote scope should separate tooling, components, samples, testing and delivery. Lead time follows the agreed design and order scope.</p>
          </aside>
        </div>
      </Section>

      <Section title="Documents to review before specification" tone="muted" lede="Request evidence for the proposed component and its complete installed assembly.">
        <ul className="grid gap-[12px] md:grid-cols-2">
          {gfrpTechnicalItems.map((item) => <li key={item} className="rounded-card border border-line bg-paper p-[18px] text-f14 text-ink-2">{item}</li>)}
        </ul>
        <div className="mt-[24px]"><Callout title="Match the evidence to the order">The supplier presentation includes historical project and testing references. Current, complete reports for the proposed resin, reinforcement, finish and thickness must be reviewed before a performance classification or code suitability is specified.</Callout></div>
        <div className="mt-[20px]"><Cta href="/request-quote?products=gfrp-custom&intent=documents" variant="secondary">Request project documents</Cta></div>
      </Section>

      <Section id="supplier-document" title="Supplier presentation" lede="An original-language reference for the manufacturing process and the supplier's examples.">
        <div className="grid gap-[24px] rounded-card border border-line bg-paper-2 p-[24px] md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-mono text-f12 uppercase tracking-[0.06em] text-accent">PDF · Chinese · 32 slides · 2023 · 5.3 MB</p>
            <h3 className="mt-[10px] text-f20 font-semibold">{gfrpSupplier.documentLabel}</h3>
            <p className="mt-[10px] max-w-[740px] text-f14 text-ink-2">Selected slides from the FRP presentation by {gfrpSupplier.name}, with the supplier&apos;s original branding. This excerpt covers design coordination, molding, joints and construction examples. Report reproductions and project-specific performance schedules are omitted.</p>
          </div>
          <a href={gfrpSupplier.documentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center justify-center rounded-control border border-line-strong bg-paper px-[18px] py-[10px] text-f14 font-semibold hover:border-ink">Open supplier PDF ↗</a>
        </div>
        <p className="mt-[14px] max-w-[850px] text-f12 text-ink-3">Project and process illustrations are attributed to the supplier. They do not establish a Cladvera project delivery or a specification for a new order. The English text on this page summarizes the supplier material and identifies information needed for a custom inquiry.</p>
      </Section>

      <MaterialQuestions material="gfrp" />
      <ProductJourney productId="gfrp-custom" />
    </>
  );
}

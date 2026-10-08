import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Callout, Cta, LinkCard, PageHeader, Section } from "@/components/ui";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const path = "/architects";
const description = "Move from architectural intent to a coordinated panel specification: compare products, request samples, review evidence and prepare a procurement handoff.";

export const metadata = buildPageMetadata({ title: "Architects: Select and Specify Panels | Cladvera", description, path });

const stages = [
  { title: "Define the application", input: "Project location, building use, exterior or interior exposure, design intent and delivery stage.", decision: "Which materials and product families warrant review for this use?", output: "An application brief and initial product shortlist.", href: "/applications", action: "Explore applications" },
  { title: "Compare the shortlisted products", input: "Panel construction, appearance, geometry, attachment approach and available documentation.", decision: "Which options meet the design intent, and what remains to be confirmed?", output: "A comparison with open questions assigned to the project team or supplier.", href: "/compare", action: "Compare products" },
  { title: "Review samples and visual intent", input: "Named product, finish preference, texture, viewing conditions and any mock-up requirement.", decision: "What sample or mock-up is needed to approve the visual range?", output: "A recorded finish selection and an agreed sample or mock-up scope.", href: "/samples", action: "Request samples" },
  { title: "Coordinate technical evidence", input: "Exact construction, current product data, relevant test reports, substrate and attachment details.", decision: "Does the submitted evidence address the proposed product and complete project assembly?", output: "A reviewed specification basis, responsibilities and unresolved items.", href: "/technical-resources", action: "Review documents" },
  { title: "Hand over a defined procurement package", input: "Product and finish schedule, elevations or part drawings, quantities, approved samples and required documents.", decision: "Can the buyer request comparable quotes against the same scope?", output: "An RFQ package with drawing revisions, exclusions and approvals clearly recorded.", href: "/procurement", action: "Prepare the procurement handoff" },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Panel selection for architects", description, path })} />
      <PageHeader eyebrow="For architects and designers" title="From design intent to a defined panel specification" lede="Start with the application, compare the available families, then coordinate samples and technical evidence before handing a defined scope to procurement." crumbs={[{ name: "Architects", path }]} actions={<><Cta href="/products">Find products</Cta><Cta href="/compare" variant="secondary">Compare options</Cta></>} />

      <Section title="A decision at each stage" lede="Use the stage that matches your project. Technical review, sampling and budgeting may run in parallel.">
        <ol className="grid gap-[20px]">
          {stages.map((stage, index) => (
            <li key={stage.title} className="grid gap-[20px] rounded-card border border-line bg-paper p-[20px] md:grid-cols-[0.8fr_1.4fr] md:p-[28px]">
              <div><p className="font-mono text-f12 text-accent">{String(index + 1).padStart(2, "0")}</p><h2 className="mt-[6px] text-f20 font-semibold">{stage.title}</h2><div className="mt-[16px]"><Cta href={stage.href} variant="ghost">{stage.action} →</Cta></div></div>
              <dl className="grid gap-[12px] text-f14">
                <div><dt className="font-semibold">Bring</dt><dd className="mt-[3px] text-ink-2">{stage.input}</dd></div>
                <div><dt className="font-semibold">Decide</dt><dd className="mt-[3px] text-ink-2">{stage.decision}</dd></div>
                <div><dt className="font-semibold">Record</dt><dd className="mt-[3px] text-ink-2">{stage.output}</dd></div>
              </dl>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Keep product, surface and attachment decisions connected" tone="muted">
        <div className="grid gap-[16px] md:grid-cols-3">
          <LinkCard href="/products" title="Select the construction" description="Compare UHPC, metal composite, exterior HPL, interior decorative boards and custom GFRP elements by their documented applications." />
          <LinkCard href="/samples" title="Record the visual reference" description="Name the manufacturer, product, finish and sample revision. Request a range or mock-up where the design needs one." />
          <LinkCard href="/technical-resources" title="Coordinate the assembly" description="Match product data to the offered construction and coordinate joints, fixing points, supporting structure and project requirements." />
        </div>
        <div className="mt-[20px]"><Callout title="Before the specification is issued">Confirm the named product, construction, finish and relevant document revisions. The project design team reviews suitability and assembly evidence. A family name or manufacturer marketing claim alone does not resolve those decisions.</Callout></div>
      </Section>

      <Section title="Ready for a project discussion?">
        <p className="max-w-[760px] text-f16 text-ink-2">Send the project use, location, current drawings, selected families and open technical questions. The <Link href="/request-quote" className="text-accent underline underline-offset-4">project request</Link> can start with a document review or budget inquiry while remaining selections are developed.</p>
        <div className="mt-[20px] flex flex-wrap gap-[12px]"><Cta href="/request-quote?intent=documents">Request a technical review</Cta><Cta href="/procurement" variant="secondary">Procurement process</Cta></div>
      </Section>
    </>
  );
}

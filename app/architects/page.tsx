import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Cta, PageHeader } from "@/components/ui";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const path = "/architects";
const description = "Select and specify architectural panels: compare facade and interior materials, review finish samples and technical evidence, and prepare a project RFQ.";

export const metadata = buildPageMetadata({ title: "Architectural Panel Selection & Specification | Cladvera", description, path });

const stages = [
  { title: "Define the application", input: "Project location, building use, exterior or interior exposure, design intent and delivery stage.", decision: "Which materials and product families warrant review for this use?", output: "An application brief and initial product shortlist.", href: "/applications", action: "Explore applications" },
  { title: "Compare the shortlisted products", input: "Panel construction, appearance, geometry, attachment approach and available documentation.", decision: "Which options meet the design intent, and what remains to be confirmed?", output: "A comparison with open questions assigned to the project team or supplier.", href: "/compare", action: "Compare products" },
  { title: "Review samples and visual intent", input: "Named product, finish preference, texture, viewing conditions and any mock-up requirement.", decision: "What sample or mock-up is needed to approve the visual range?", output: "A recorded finish selection and an agreed sample or mock-up scope.", href: "/samples", action: "Request samples" },
  { title: "Coordinate technical evidence", input: "Exact construction, current product data, relevant test reports, substrate and attachment details.", decision: "Does the submitted evidence address the proposed product and complete project assembly?", output: "A reviewed specification basis, responsibilities and unresolved items.", href: "/technical-resources", action: "Review documents" },
  { title: "Hand over a defined procurement package", input: "Product and finish schedule, elevations or part drawings, quantities, approved samples and required documents.", decision: "Can the buyer request comparable quotes against the same scope?", output: "An RFQ package with drawing revisions, exclusions and approvals clearly recorded.", href: "/procurement", action: "Prepare the procurement handoff" },
];

const specificationNotes = [
  { number: "A", title: "Select the construction", description: "Compare UHPC, metal composite, exterior HPL, interior decorative boards and custom GFRP elements by their documented applications.", href: "/products", action: "Explore material families" },
  { number: "B", title: "Record the visual reference", description: "Name the manufacturer, product, finish and sample revision. Request a range or mock-up where the design needs one.", href: "/samples", action: "Discuss finish samples" },
  { number: "C", title: "Coordinate the assembly", description: "Match product data to the offered construction and coordinate joints, fixing points, supporting structure and project requirements.", href: "/technical-resources", action: "Review technical documents" },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Panel selection for architects", description, path })} />
      <PageHeader
        eyebrow="The project desk / Architects & designers"
        title="Architectural panel selection and specification"
        lede="Move from facade or interior design intent to a defined panel specification. Compare material families, coordinate finish samples and review technical evidence before handing a clear scope to procurement."
        crumbs={[{ name: "Architects", path }]}
        actions={<><Cta href="/products">Find architectural panels</Cta><Cta href="/compare" variant="secondary">Compare options</Cta></>}
      />

      <nav aria-label="Architects page sections" className="border-b border-line">
        <div className="site-container grid grid-cols-2 gap-x-[24px] md:grid-cols-4">
          {[
            { href: "#material-strategy", label: "Material strategy" },
            { href: "#working-sequence", label: "Working sequence" },
            { href: "#specification-notes", label: "Specification notes" },
            { href: "#project-brief", label: "Open a project brief" },
          ].map((item, index) => (
            <Link key={item.href} href={item.href} className="flex min-h-[72px] items-center gap-[12px] py-[18px] text-f12 text-ink-2 hover:text-accent">
              <span className="font-mono text-[10px] text-accent">0{index + 1}</span>{item.label}
            </Link>
          ))}
        </div>
      </nav>

      <section id="material-strategy" className="border-b border-line">
        <div className="site-container grid gap-[36px] py-[56px] md:py-[88px] lg:grid-cols-[0.8fr_1.4fr] lg:gap-[96px]">
          <div>
            <p className="eyebrow">01 / Material strategy</p>
            <h2 className="editorial-title mt-[18px] max-w-[380px]">Start with<br />the design intent.</h2>
            <svg aria-hidden="true" viewBox="0 0 280 130" fill="none" className="mt-[40px] hidden h-[112px] w-[240px] text-ink-3 lg:block">
              <path d="M20 18h240M20 112h240M32 6v118M248 6v118" stroke="currentColor" strokeWidth="0.5" />
              <path d="M32 32h88v66H32zM130 32h48v66h-48zM188 32h60v66h-60z" stroke="currentColor" strokeWidth="0.75" />
              <path d="M130 32v66M178 32v66" className="stroke-accent" strokeWidth="2" />
              <path d="m28 14 8 8m-8 86 8 8m208-102 8 8m-8 86 8 8" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
          <div className="grid gap-[28px]">
            <div className="border-t border-line-strong pt-[18px]">
              <h3 className="mb-[12px] font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3">The building envelope</h3>
              <p className="max-w-[650px] text-f18 text-ink-2">For exterior cladding, review <Link href="/suppliers/taktl" className="text-ink underline decoration-line-strong underline-offset-4 hover:text-accent">TAKTL architectural UHPC</Link>, <Link href="/materials/acm-panels" className="text-ink underline decoration-line-strong underline-offset-4 hover:text-accent">ALMINE metal composite panels</Link> and <Link href="/materials/exterior-hpl-panels" className="text-ink underline decoration-line-strong underline-offset-4 hover:text-accent">exterior HPL facade panels</Link>. Each family has its own construction, surface options and assembly requirements.</p>
            </div>
            <div className="border-t border-line pt-[18px]">
              <h3 className="mb-[12px] font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3">Interior surfaces & custom forms</h3>
              <p className="max-w-[650px] text-f18 text-ink-2">For interior surfaces, start with <Link href="/materials/interior-hpl-panels" className="text-ink underline decoration-line-strong underline-offset-4 hover:text-accent">Compactwood decorative wall and ceiling boards</Link>. For project-specific geometry, explore <Link href="/materials/gfrp-custom-elements" className="text-ink underline decoration-line-strong underline-offset-4 hover:text-accent">custom GFRP architectural elements</Link> and define the shape, finish and connection scope early.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="working-sequence" className="bg-paper-2">
        <div className="site-container py-[56px] md:py-[88px]">
          <div className="mb-[40px] grid items-end gap-[24px] lg:grid-cols-2 lg:gap-[96px]">
            <div><p className="eyebrow">02 / Working sequence</p><h2 className="editorial-title mt-[18px]">A decision.<br />A record. A next step.</h2></div>
            <p className="max-w-[440px] text-f16 text-ink-2">Use the stage that matches your project. Technical review, sampling and budgeting may run in parallel.</p>
          </div>
          <ol className="border-t border-line-strong">
            {stages.map((stage, index) => (
              <li key={stage.title} className="grid gap-[24px] border-b border-line py-[32px] md:gap-[32px] md:py-[40px] lg:grid-cols-[48px_0.8fr_1.25fr]">
                <p className="font-mono text-f12 text-accent">{String(index + 1).padStart(2, "0")} /</p>
                <div>
                  <h3 className="max-w-[350px] text-f24 font-medium tracking-[-0.03em] md:text-[28px] md:leading-[1.25]">{stage.title}</h3>
                  <div className="mt-[16px]"><Cta href={stage.href} variant="ghost">{stage.action} <span aria-hidden="true">↗</span></Cta></div>
                </div>
                <dl className="grid gap-[16px] text-f14">
                  {[
                    { label: "Bring", text: stage.input },
                    { label: "Decide", text: stage.decision },
                    { label: "Record", text: stage.output },
                  ].map(item => (
                    <div key={item.label} className="grid gap-[5px] sm:grid-cols-[64px_1fr] sm:gap-[20px]">
                      <dt className="pt-[2px] font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">{item.label}</dt>
                      <dd className="max-w-[520px] text-ink-2">{item.text}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="specification-notes" className="border-y border-line">
        <div className="site-container py-[56px] md:py-[88px]">
          <div className="mb-[40px] max-w-[680px]"><p className="eyebrow">03 / Specification notes</p><h2 className="editorial-title mt-[18px]">Product. Surface. Attachment.<br />Keep the decisions connected.</h2></div>
          <div className="grid gap-[32px] md:grid-cols-3 md:gap-[40px]">
            {specificationNotes.map(note => (
              <div key={note.number} className="flex flex-col border-t border-line-strong pt-[18px]">
                <p className="font-mono text-[11px] text-accent">{note.number} /</p>
                <h3 className="mt-[24px] text-f24 font-medium tracking-[-0.025em]">{note.title}</h3>
                <p className="mb-[20px] mt-[14px] max-w-[360px] text-f14 text-ink-2">{note.description}</p>
                <Link href={note.href} className="mt-auto inline-flex min-h-[44px] items-center gap-[14px] text-f14 font-medium text-accent hover:underline">{note.action}<span aria-hidden="true">↗</span></Link>
              </div>
            ))}
          </div>
          <aside className="mt-[44px] grid gap-[16px] border-t border-line pt-[24px] lg:grid-cols-[0.8fr_1.4fr] lg:gap-[96px]">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink">Before the specification is issued</h3>
            <p className="max-w-[680px] text-f14 text-ink-2">Confirm the named product, construction, finish and relevant document revisions. The project design team reviews suitability and assembly evidence. A family name or manufacturer marketing claim alone does not resolve those decisions.</p>
          </aside>
        </div>
      </section>

      <section id="project-brief">
        <div className="site-container grid gap-[32px] py-[56px] md:py-[88px] lg:grid-cols-[0.8fr_1.4fr] lg:gap-[96px]">
          <div><p className="eyebrow">04 / Open a project brief</p><h2 className="editorial-title mt-[18px]">Bring the drawings.<br />Keep the questions.</h2></div>
          <div className="lg:pt-[36px]">
            <p className="max-w-[650px] text-f18 text-ink-2">Send the project use, location, current drawings, selected families and open technical questions. The <Link href="/request-quote" className="text-ink underline decoration-line-strong underline-offset-4 hover:text-accent">project request</Link> can start with a document review or budget inquiry while remaining selections are developed.</p>
            <div className="mt-[28px] flex flex-wrap gap-[12px]"><Cta href="/request-quote?intent=documents">Request a technical review</Cta><Cta href="/procurement" variant="secondary">Procurement process</Cta></div>
          </div>
        </div>
      </section>
    </>
  );
}

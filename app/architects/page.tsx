import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Callout, Cta, Faq, LinkCard, PageHeader, Section, Steps } from "@/components/ui";
import { FinishCard } from "@/components/ui/Swatch";
import { finishes } from "@/content/data/finishes";
import { materials } from "@/content/data/materials";
import { site } from "@/content/data/site";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Finish palettes, CSI sections, HTML spec tables, colour-variation guidance and sample sets for architects specifying imported panels.";

export const metadata = buildPageMetadata({
  title: "For Architects and Designers: Palettes, Specs and Samples",
  description,
  path: "/architects",
});

const part2Steps = [
  { title: "Name the product by construction", body: "Material, core, thickness, face and surface system from the data sheet, not a brand adjective." },
  { title: "State the performance basis", body: "Cite the material tests and the assembly route (NFPA 285 or CAN/ULC S134) the project needs; check the compliance matrix for what exists." },
  { title: "Define colour control", body: "Master and range samples, direction, batch allocation and the ASTM D2244 conditions from the colour-variation guide." },
  { title: "Attach the 13.1A set", body: "Data sheet, specification, CAD, test reports, warranty and comparison data, with unconfirmed values marked." },
];

const faq = [
  {
    q: "Which facade materials combine wood warmth with a clean panelized elevation?",
    a: "Three routes: real veneer on a high-pressure thermoset core for natural variation, printed wood-grain phenolic (HPL) panels for a uniform decor with a stated repeat, and wood-grain ACM where a folded metal panel system is already specified. The wood-grain finishes page compares structure, texture, repeat and documentation.",
  },
  {
    q: "What should I include in a sample request?",
    a: "Your role, company and shipping address, the finish codes (up to 10 per set), interior or exterior use and, if known, the project name, stage and area. Range sets for veneer and UHPC are requested separately from chips.",
  },
  {
    q: "Can I compare ACM, veneer and UHPC samples for one project?",
    a: "Yes. One sample set can mix materials, up to 10 finishes, so a lobby and its facade can be judged together under the same light.",
  },
];

export default function Page() {
  const palette = finishes.slice(0, 10);
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "For architects and designers", description, path: "/architects" })} />
      <PageHeader
        eyebrow="Architects and designers"
        title="Specify with confidence"
        lede="Finish palettes across four materials, specification resources organised for substitution review, and sample sets that arrive with their range samples and data."
        crumbs={[{ name: "Architects", path: "/architects" }]}
        actions={
          <>
            <Cta href="/samples">Build a sample set</Cta>
            <Cta href="/technical-resources" variant="secondary">Technical resources</Cta>
          </>
        }
      />

      <Section title="Palette builder" lede="Up to 10 finishes per sample set across any materials. Printed pattern and real texture are labelled separately.">
        <div className="grid grid-cols-2 gap-[12px] sm:gap-[16px] lg:grid-cols-5">
          {palette.map((f) => (
            <FinishCard key={f.code} finish={f} />
          ))}
        </div>
        <div className="mt-[16px]"><Cta href="/finishes" variant="ghost">All finishes →</Cta></div>
      </Section>

      <Section title="Specification resources" tone="muted">
        <div className="grid gap-[16px] md:grid-cols-2 lg:grid-cols-4">
          <LinkCard href="/technical-resources" title="CSI sections" description={materials.map((m) => `${m.shortName}: ${m.masterformat[0]}`).join(". ")} />
          <LinkCard href="/materials" title="HTML specification tables" description="Every material page carries its specification rows with their confirmation status." />
          <LinkCard href="/resources/panel-color-variation" title="Colour variation guide" description="Master and range samples, lighting mock-up, ASTM D2244 and D523 conditions." />
          <LinkCard href="/systems" title="CAD and BIM (planned)" description="DWG and PDF details per system and Revit families follow the assembly tests." />
        </div>
      </Section>

      <Section title="Compliance summary and substitution">
        <div className="grid gap-[24px] md:grid-cols-[1fr_1.2fr]">
          <Callout title="What exists today">
            Material-level tests are in progress and assembly tests are scheduled; nothing is listed yet. The <Link href="/compliance" className="underline">compliance matrix</Link> shows each cell with its status and what is not claimed.
          </Callout>
          <div>
            <h3 className="mb-[12px] text-f18 font-semibold">How to write Part 2 and submit a substitution</h3>
            <Steps steps={part2Steps} />
          </div>
        </div>
      </Section>

      <Section title="Sampling channels" tone="muted">
        <div className="grid gap-[16px] md:grid-cols-3">
          <Callout title="Chips">Free colour chips for coated and printed finishes, dispatched within two business days after verification.</Callout>
          <Callout title="Range sets">Five-piece range sets for natural veneer and UHPC, so approval is on the range, not one chip.</Callout>
          <Callout title="Confirmation panels">A4 or 12 × 12 in panels for mock-ups, charged and credited against the order.</Callout>
        </div>
        <p className="mt-[12px] text-f12 text-ink-3">A Material Bank listing is planned once a North American shipping point exists; it is not in place yet.</p>
      </Section>

      <Section title="Case details">
        <p className="max-w-[760px] text-f14 text-ink-2">Corner, return and joint details are published per delivered project. None are listed yet.</p>
      </Section>

      <Section title="Lunch-and-learn and design assist" tone="muted">
        <p className="max-w-[760px] text-f14 text-ink-2">
          Online sessions on material selection, colour control and substitution documentation are offered by request. Write to <a href={`mailto:${site.contact.email}?subject=Design%20assist`} className="underline">{site.contact.email}</a>.
        </p>
      </Section>

      <Section>
        <Faq items={faq} />
      </Section>

      <Section tone="dark">
        <div className="flex flex-wrap items-center justify-between gap-[12px]">
          <p className="text-f18 font-semibold">Start with a sample set and the attachment set.</p>
          <div className="flex gap-[8px]">
            <Cta href="/samples">Build a sample set</Cta>
            <Cta href="/contact" variant="secondary">Contact</Cta>
          </div>
        </div>
      </Section>
    </>
  );
}

import JsonLd from "@/components/seo/JsonLd";
import { Callout, Cta, Faq, PageHeader, Section, Steps } from "@/components/ui";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "How much colour variation is acceptable between panel batches, how master and range samples are approved, and which ΔE conditions apply.";

export const metadata = buildPageMetadata({
  title: "Panel Color Variation, Batch Matching and ΔE Tolerances",
  description,
  path: "/resources/panel-color-variation",
});

const types = [
  { finish: "Coated ACM", sources: "Coil batch, brush or metallic direction, gloss", control: "One coil batch per elevation; arrows installed one way; gloss agreed at 60°" },
  { finish: "Printed HPL decor", sources: "Decor paper batch, pattern repeat, direction", control: "Repeat stated per decor; sheets staggered on the layout drawing; batch per order" },
  { finish: "Natural veneer", sources: "Species, cut, natural colour and figure", control: "Signed master and a range set of at least five pieces; sequence-matched sets where specified" },
  { finish: "UHPC", sources: "Mix, pigment, curing, pinholes, weathering", control: "Range samples for colour and pinhole density; sealer stated; weathering explained before approval" },
];

const workflow = [
  { title: "Master sample", body: "One signed master per finish and thickness, dated and kept by both parties." },
  { title: "Range set", body: "At least five pieces showing the lightest and darkest acceptable sheets; natural finishes always, printed and coated finishes where the decor is directional." },
  { title: "Layout and numbering", body: "Sheets numbered to an elevation drawing with direction arrows; the fabricator installs to the numbers." },
  { title: "Lighting mock-up", body: "A site sample wall under the project's light, viewed at the agreed distance and angle, before production is released." },
];

const checklist = [
  "Product and finish code, thickness and use (interior or exterior).",
  "Signed master sample and the range set, with dates.",
  "Sheet direction and numbering plan tied to the elevation.",
  "Viewing light, distance and angle for acceptance.",
  "Agreed colour, gloss, texture and pinhole range per material.",
  "Measurement method and instrument conditions (ASTM D2244 formula, illuminant, geometry; ASTM D523 gloss angle).",
  "Batch allocation, retained samples and the replenishment rule.",
  "Responsibility for the layout drawing and the site mock-up.",
];

const faq = [
  {
    q: "How much colour variation is acceptable between panel batches?",
    a: "There is no single tolerance across materials. Coated and printed finishes are held within a batch and a ΔE limit agreed per finish under ASTM D2244; natural veneer and UHPC are accepted against a range set, not a number alone. The limit, the formula and the viewing conditions are written into the order.",
  },
  {
    q: "How should wood veneer colour variation be approved before production?",
    a: "On a signed master and a range set of at least five pieces that shows the lightest and darkest acceptable sheets, with the species, cut and sequence matching stated. Production is released after the range set is approved and, for large elevations, after a site mock-up under the project light.",
  },
  {
    q: "Can lighting change the appearance of textured flat wall panels?",
    a: "Yes. Grazing and wall-wash light exaggerate relief, pinholes and flatness; frontal light flattens them. Textured and metallic finishes are judged under the lighting the project will use, at the intended viewing distance.",
  },
  {
    q: "Can photographs be used for acceptance?",
    a: "No. Photographs with a fixed white balance record the approval, but acceptance is on physical samples and the mock-up. Screen colour is not a reference.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Panel colour variation", description, path: "/resources/panel-color-variation" })} />
      <PageHeader
        eyebrow="Resources"
        title="Panel colour variation, batch matching and sample approval"
        lede="How variation is classified per finish, how it is approved before production, and which measurement conditions are written into an order."
        crumbs={[{ name: "Colour variation", path: "/resources/panel-color-variation" }]}
        actions={<Cta href="/samples">Request range samples</Cta>}
      />

      <Section>
        <p className="max-w-[760px] text-f18 text-ink-2">
          There is no single ΔE tolerance that applies across ACM, HPL, veneer and UHPC. Acceptable variation is agreed per material against a signed master sample and a range set, measured where appropriate under ASTM D2244 with the colour-difference formula, illuminant, geometry and reference sample stated, and judged visually under the project lighting at the agreed distance. The order records those conditions; a number without them is not a tolerance.
        </p>
      </Section>

      <Section title="Four kinds of variation" tone="muted">
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f14">
            <thead>
              <tr className="border-b border-line bg-paper-2 text-left">
                <th className="px-[12px] py-[10px] font-medium">Finish type</th>
                <th className="px-[12px] py-[10px] font-medium">Where variation comes from</th>
                <th className="px-[12px] py-[10px] font-medium">How it is controlled</th>
              </tr>
            </thead>
            <tbody>
              {types.map((t) => (
                <tr key={t.finish} className="border-b border-line align-top last:border-b-0">
                  <td className="px-[12px] py-[10px] font-medium text-ink">{t.finish}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{t.sources}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{t.control}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Approval workflow">
        <Steps steps={workflow} />
      </Section>

      <Section title="Instrument conditions" tone="muted">
        <div className="grid gap-[16px] md:grid-cols-3">
          <Callout title="Colour: ASTM D2244">The colour-difference formula, illuminant, observer, measurement geometry and the reference sample are agreed between buyer and seller; the standard does not set a universal pass value.</Callout>
          <Callout title="Gloss: ASTM D523">Specular gloss at 60° for most finishes, 20° for high gloss and 85° for very matte surfaces. Bare brushed metal is not judged by a single gloss reading.</Callout>
          <Callout title="Photographs">Fixed white-balance photos document approval and batches; they do not replace physical samples.</Callout>
        </div>
      </Section>

      <Section title="Batches and delivery">
        <ul className="grid gap-[8px] text-f14 text-ink-2 md:grid-cols-2">
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>One batch per elevation wherever the order size allows; where it does not, the batch boundary is placed at a corner or a change of plane.</li>
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>Attic stock agreed at order so replacements come from the same batch.</li>
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>Batch, finish code and sheet range on every crate label and in the packing list.</li>
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>Deviations beyond the agreed range are recorded at unloading and handled as defects, not as natural variation.</li>
        </ul>
      </Section>

      <Section title="Project confirmation checklist" tone="muted">
        <ol className="grid gap-[8px] text-f14 text-ink-2 md:grid-cols-2">
          {checklist.map((item, i) => (
            <li key={item} className="flex gap-[10px] rounded-card border border-line bg-paper px-[16px] py-[10px]">
              <span className="font-mono text-f12 text-accent">{String(i + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <Faq items={faq} />
      </Section>
    </>
  );
}

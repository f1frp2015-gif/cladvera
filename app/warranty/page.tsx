import JsonLd from "@/components/seo/JsonLd";
import { Callout, Cta, KeyValueList, PageHeader, Section } from "@/components/ui";
import { site } from "@/content/data/site";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Draft warranty structure for ACM, phenolic HPL, veneer and UHPC panels: warranty party, coating and material terms, care and exclusions.";

export const metadata = buildPageMetadata({
  title: "Warranty: Coating, Material and Maintenance Terms (Draft)",
  description,
  path: "/warranty",
});

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Warranty", description, path: "/warranty" })} />
      <PageHeader
        eyebrow="Supply"
        title="Warranty"
        lede="Draft terms. Durations are confirmed before launch and the responsible North American party is named; until then nothing on this page is a granted warranty."
        crumbs={[{ name: "Warranty", path: "/warranty" }]}
        actions={<Cta href="/request-quote">Ask for the warranty document</Cta>}
      />

      <Section>
        <Callout tone="warn" title="Draft terms, years to be confirmed before launch">
          The structure below is the warranty the site will carry. Each “[years TBC]” is replaced by the confirmed term, and the warranty party is named, before the site is set live.
        </Callout>
      </Section>

      <Section title="Warranty party" tone="muted">
        <p className="max-w-[760px] text-f14 text-ink-2">
          A North American responsible entity or appointed agent will be named as the warranty party (TBC). The mill alone is not the warranty party, so a claim never depends on reaching a factory abroad.
        </p>
      </Section>

      <Section title="Coating and surface">
        <KeyValueList
          items={[
            { label: "PVDF coatings on ACM", value: "Chalking, fading and peeling limits by exposure class (coastal, industrial, general) for [years TBC]." },
            { label: "Phenolic (HPL) surface", value: "Colour fastness and surface integrity under the stated cleaning regime for [years TBC]." },
            { label: "Veneer overlay", value: "Overlay adhesion and UV protection for [years TBC]; natural colour change of the wood is not a defect within the approved range." },
            { label: "UHPC surface", value: "Surface integrity and sealer performance for [years TBC]; weathering within the approved range is not a defect." },
          ]}
        />
      </Section>

      <Section title="Material and delamination" tone="muted">
        <p className="max-w-[760px] text-f14 text-ink-2">
          Bond integrity between skins and core (ACM), between layers (phenolic) and between veneer and core, and freedom from manufacturing defects, for [years TBC] from delivery.
        </p>
      </Section>

      <Section title="Maintenance conditions">
        <ul className="grid gap-[8px] text-f14 text-ink-2 md:grid-cols-2">
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>Washing every 3 months in coastal and industrial exposure and every 6 to 12 months elsewhere, following the common practice of North American cladding warranties.</li>
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>Approved cleaners only; no abrasives, solvents or pressure above the stated limit.</li>
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>Washing records kept by the owner and available on request.</li>
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>Protective film removed within the stated period after installation.</li>
        </ul>
      </Section>

      <Section title="Exclusions and registration" tone="muted">
        <div className="grid gap-[16px] md:grid-cols-2">
          <Callout title="Excluded">
            Mechanical damage; fabrication or installation outside the published guidance; unapproved cleaners; natural variation within the approved range; damage from the substrate or the attachment system; work by others.
          </Callout>
          <Callout title="Registration">
            Registration with the invoice, finish codes and installation date within 90 days of installation (form planned). Until the form is live, send the details to{" "}
            <a href={`mailto:${site.contact.email}?subject=Warranty%20registration`} className="underline">{site.contact.email}</a> with the subject “Warranty registration”.
          </Callout>
        </div>
      </Section>

      <Section title="Insurance">
        <p className="max-w-[760px] text-f14 text-ink-2">
          Product liability coverage and additional-insured endorsements are available on request; limits are confirmed per project (TBC).
        </p>
      </Section>
    </>
  );
}

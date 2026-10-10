import { notFound } from "next/navigation";
import { isPublishedPath } from "@/content/data/publication";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Badge, Callout, Cta, PageHeader, Section, StatusBadge } from "@/components/ui";
import { materials } from "@/content/data/materials";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Fabrication guidance for ALMINE metal composite, Compactwood wood fiber HPL, veneer and UHPC panels, with tools, edges and fixing details to confirm.";

export const metadata = buildPageMetadata({
  title: "Fabrication: Routing, Cutting, Film and File Formats",
  description,
  path: "/fabrication",
});

const parameters: Record<string, Array<{ label: string; value: string; confirmed: boolean }>> = {
  "acm-panels": [
    { label: "Face metal and panel build-up", value: "Confirm the ordered ALMINE construction before selecting tools or a forming method", confirmed: false },
    { label: "Routing and bending", value: "Request product-specific machining limits and fold details from ALMINE", confirmed: false },
    { label: "Fixings and spacing", value: "Use the selected system's engineered details for the actual panel and substrate", confirmed: false },
    { label: "Protective film", value: "Follow the product-specific removal and handling instructions", confirmed: false },
  ],
  "exterior-hpl-panels": [
    { label: "Cutting tools", value: "Request Compactwood's instructions for the selected wood fiber HPL construction", confirmed: false },
    { label: "Fixing holes", value: "Confirm hole pattern, diameter and movement allowance against the selected facade system", confirmed: false },
    { label: "Edges", value: "Request edge machining, sealing and tolerance instructions for the ordered panel", confirmed: false },
  ],
  "wood-veneer-panels": [
    { label: "Cutting", value: "Scoring blade, face up; CNC routing for cut-outs", confirmed: false },
    { label: "Grain", value: "Sheets numbered to the layout drawing; one grain direction per elevation", confirmed: true },
  ],
  "uhpc-panels": [
    { label: "Field cutting", value: "Diamond blade with dust control only; the cut edge is unsealed", confirmed: true },
    { label: "Anchors", value: "Drilled per the anchor manufacturer's procedure; cast-in inserts preferred", confirmed: true },
  ],
  "interior-hpl-panels": [
    { label: "Core and form", value: "Compactwood describes glass fiber or wood fiber indoor boards; confirm the ordered construction and whether it is classified as HPL", confirmed: false },
    { label: "Cutting and edges", value: "Request product-specific cutting, edge and bonding instructions before fabrication", confirmed: false },
  ],
};

export default function Page() {
  if (!isPublishedPath("/fabrication")) notFound();

  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Fabrication", description, path: "/fabrication" })} />
      <PageHeader
        eyebrow="Technical"
        title="Fabrication"
        lede="What is supplied: full sheets, cut-to-size parts and, where stated, fabricated panels. What is not: installation. Parameters marked “to confirm” are being checked against mill data."
        crumbs={[{ name: "Fabrication", path: "/fabrication" }]}
        actions={
          <>
            <Cta href="/for-contractors">Fabricators and distributors</Cta>
            <Cta href="/request-quote" variant="secondary">Upload a cut list</Cta>
          </>
        }
      />

      <Section title="Guidance by material">
        <div className="grid gap-[20px]">
          {materials.map((m) => (
            <div key={m.slug} className="rounded-card border border-line bg-paper p-[20px]">
              <h3 className="text-f18 font-semibold"><Link href={`/materials/${m.slug}`} className="hover:text-accent">{m.name}</Link></h3>
              <ul className="mt-[10px] grid gap-[6px] text-f14 text-ink-2">
                {m.fabrication.map((f) => (
                  <li key={f} className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>{f}</li>
                ))}
              </ul>
              {parameters[m.slug] && (
                <dl className="mt-[12px] grid gap-[6px] border-t border-line pt-[12px] text-f14 sm:grid-cols-[200px_1fr]">
                  {parameters[m.slug].map((p) => (
                    <div key={p.label} className="contents">
                      <dt className="font-medium text-ink">{p.label}</dt>
                      <dd className="text-ink-2">
                        {p.value}
                        {!p.confirmed && <span className="ml-[8px] align-middle"><Badge tone="warn">To confirm</Badge></span>}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Drawings and files" tone="muted">
        <div className="grid gap-[16px] md:grid-cols-2">
          <Callout title="Accepted formats">
            DWG, DXF and PDF for elevations and panel drawings; XLSX or CSV for cut lists; Revit models on request. Imperial or metric, stated on the drawing.
          </Callout>
          <Callout title="Marking and packing">
            Each sheet carries its number, grain or coating direction arrows and the batch; the crate label repeats the batch, the finish code and the sheet range for phased installation.
          </Callout>
        </div>
      </Section>

      <Section title="Fabrication documents">
        <ul className="grid gap-[8px] md:grid-cols-2">
          {materials.map((m) =>
            m.documents
              .filter((d) => /fabrication|handling|installation/i.test(d.name))
              .map((d) => (
                <li key={`${m.slug}-${d.name}`} className="flex items-start justify-between gap-[12px] rounded-card border border-line bg-paper px-[16px] py-[12px] text-f14">
                  <span>
                    <span className="text-ink">{d.name}</span>
                    <span className="block text-f12 text-ink-3">{m.shortName}</span>
                  </span>
                  <StatusBadge status={d.status} />
                </li>
              )),
          )}
        </ul>
      </Section>
    </>
  );
}

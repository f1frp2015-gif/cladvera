import { notFound } from "next/navigation";
import { isPublishedPath } from "@/content/data/publication";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import RegionBlock from "@/components/region/RegionBlock";
import { Callout, Cta, PageHeader, Section, StatusBadge } from "@/components/ui";
import { complianceColumns, complianceRows } from "@/content/data/compliance";
import { site } from "@/content/data/site";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Fire test and listing status by panel line, country and assembly: ASTM E84, NFPA 285, CAN/ULC S134 and S102, TSCA and the Lacey Act.";

export const metadata = buildPageMetadata({
  title: "Compliance: Fire Test and Listing Status by Product",
  description,
  path: "/compliance",
});

const usNotes = [
  "Metal composite material (MCM): the 2021 IBC, Section 1406, limits MCM without an NFPA 285 assembly test to 40 ft on Type I to IV buildings and requires a fire-retardant core and a tested, listed or engineered wall assembly above that height.",
  "The 2024 IBC adds Section 1402.8 with three NFPA 285 compliance routes: a direct test of the assembly, a third-party listed assembly, or an approved engineering analysis based on tested assemblies.",
  "Phenolic (HPL) and veneered panels follow the combustible exterior wall covering path (2021 IBC 1405.1.1): below 40 ft on material-level data; above 40 ft on Type I to IV buildings the complete assembly needs NFPA 285 evidence.",
  "Interior finishes follow IBC Chapter 8: ASTM E84 (UL 723) flame-spread classes A, B and C with smoke-developed index at or below 450; sprinklered buildings may permit one class lower in most occupancies.",
  "State adoption, as of 2026: California (2025 CBC) and New York (2025 Uniform Code) are on the 2024 IBC; Florida and Washington are on the 2021 IBC; Texas and Illinois adopt by city or state code. Confirm the edition with the project authority having jurisdiction.",
];

const caNotes = [
  "Noncombustible construction: NBC 2020 Sentence 3.1.5.5 permits combustible cladding components on exterior walls only within a wall assembly tested to CAN/ULC S134, with limits on storeys and sprinkler conditions and a thermal barrier where required.",
  "Combustible construction and Part 9 buildings: panels are specified on their CAN/ULC S102 flame-spread rating and the applicable interior finish limits.",
  "Ontario's 2024 Building Code, in force since January 2025, is harmonised with NBC 2020; Québec and Alberta editions are confirmed per project.",
  "NFPA 285 data is not assumed to be accepted in place of CAN/ULC S134. Canadian assembly tests are planned separately, and Canadian ACM brands hold QAI listings on that basis.",
];

export default function Page() {
  if (!isPublishedPath("/compliance")) notFound();

  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Compliance", description, path: "/compliance" })} />
      <PageHeader
        eyebrow="Technical"
        title="Compliance: test and listing status by product, country and assembly"
        lede="Material-level reports do not establish wall-assembly compliance. Project approval rests with the authority having jurisdiction and the design professionals of record. This page shows what exists, what is in progress and what is not claimed."
        crumbs={[{ name: "Compliance", path: "/compliance" }]}
        actions={
          <>
            <Cta href="/technical-resources">Technical resources</Cta>
            <Cta href="/request-quote" variant="secondary">Ask about a project</Cta>
          </>
        }
      />

      <Section title="Status matrix" lede="A cell reads “available” only when the report number, laboratory and, for assembly tests, the assembly description are published with it.">
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f12">
            <thead>
              <tr className="border-b border-line bg-paper-2 text-left">
                <th className="min-w-[200px] px-[10px] py-[10px] text-f14 font-medium">Product</th>
                {complianceColumns.map((c) => (
                  <th key={c.id} className="min-w-[150px] px-[10px] py-[10px] font-medium">{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {complianceRows.map((row) => (
                <tr key={row.id} className="border-b border-line align-top last:border-b-0">
                  <td className="px-[10px] py-[10px] text-f14 font-medium text-ink">
                    <Link href={`/materials/${row.materialSlug}`} className="hover:text-accent">{row.product}</Link>
                  </td>
                  {complianceColumns.map((c) => {
                    const cell = row.cells[c.id];
                    return (
                      <td key={c.id} className="px-[10px] py-[10px]">
                        <StatusBadge status={cell.status} />
                        {cell.note && <p className="mt-[4px] text-ink-3">{cell.note}</p>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="mb-[8px] mt-[24px] text-f18 font-semibold">What each column means</h3>
        <ul className="grid gap-[6px] text-f14 text-ink-2 md:grid-cols-2">
          {complianceColumns.map((c) => (
            <li key={c.id}>
              <span className="font-medium text-ink">{c.label}</span> ({c.region === "both" ? "US and Canada" : c.region}): {c.meaning}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Code routes by country" lede="Summaries for buyers, not code interpretations. The project team confirms the applicable edition and the route." tone="muted">
        <RegionBlock
          us={<NoteList notes={usNotes} />}
          ca={<NoteList notes={caNotes} />}
          className="rounded-card border border-line bg-paper p-[20px]"
        />
      </Section>

      <Section title="Laboratories and recognition">
        <div className="grid gap-[16px] md:grid-cols-2">
          <Callout title="Material-level tests">
            Run at laboratories accredited under the ILAC Mutual Recognition Arrangement. Laboratory name, accreditation body and report number are published in the matrix cell when a report is issued.
          </Callout>
          <Callout title="Assembly tests and listings">
            NFPA 285 and CAN/ULC S134 assembly tests are run at North American laboratories. Quotes are being obtained from Intertek, UL Solutions and QAI; none of them has tested these products yet. Target documents are an ICC-ES listing or evaluation report, an Intertek CCRR, or a QAI listing, each tied to a quality-control programme at the mill.
          </Callout>
        </div>
      </Section>

      <Section title="What we do not claim" tone="muted">
        <ul className="grid gap-[8px] text-f14 text-ink-2">
          {site.notClaimed.map((item) => (
            <li key={item} className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="Downloads">
        <p className="max-w-[760px] text-f14 text-ink-2">
          Reports become downloadable from the matrix as they are numbered. The complete attachment set for a substitution request is organised on the <Link href="/technical-resources" className="underline">technical resources</Link> page.
        </p>
      </Section>
    </>
  );
}

function NoteList({ notes }: { notes: string[] }) {
  return (
    <ul className="grid gap-[10px] text-f14 text-ink-2">
      {notes.map((n) => (
        <li key={n} className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>{n}</li>
      ))}
    </ul>
  );
}

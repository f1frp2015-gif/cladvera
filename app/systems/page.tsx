import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Callout, Cta, PageHeader, Section, StatusBadge } from "@/components/ui";
import { materials } from "@/content/data/materials";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Attachment systems for phenolic HPL, UHPC, ACM and veneer panels, and who is responsible for panels, anchors, fire performance and install.";

export const metadata = buildPageMetadata({
  title: "Systems: Compatible Attachment and Design Responsibility",
  description,
  path: "/systems",
});

type Party = "Cladvera" | "Fabricator" | "Engineer of record" | "Installer";
const parties: Party[] = ["Cladvera", "Fabricator", "Engineer of record", "Installer"];

const responsibility: Array<{ item: string; owners: Party[]; note: string }> = [
  { item: "Panel material, finish and data sheet", owners: ["Cladvera"], note: "Specification rows, batch records and the document pack." },
  { item: "Cut-to-size parts", owners: ["Cladvera", "Fabricator"], note: "Supplied to the fabricator's cut list; tolerances per the data sheet." },
  { item: "Fabricated panels (routed and returned)", owners: ["Cladvera", "Fabricator"], note: "Offered where stated; the fabricator remains responsible for system fit." },
  { item: "Sub-frame and attachment system", owners: ["Fabricator", "Engineer of record"], note: "Extrusions, clips and anchors are the system supplier's or fabricator's products." },
  { item: "Wind-load and anchor design", owners: ["Engineer of record"], note: "Delegated design, stamped by a professional engineer; UHPC always, other lines where the project requires." },
  { item: "Wall assembly fire performance", owners: ["Engineer of record"], note: "Assembly tests and listings are referenced by the design team; see the compliance matrix for what exists." },
  { item: "Installation", owners: ["Installer"], note: "Never included in a Cladvera quote." },
];

const principles = [
  { title: "Drained and back-ventilated cavity", body: "Rainscreen panels sit in front of a drained, ventilated cavity over the water-resistive barrier and insulation; the panel is not the weather barrier." },
  { title: "Sliding points for phenolic HPL", body: "Compact laminate moves with humidity; one fixed point per sheet and oversized holes elsewhere let it move without buckling." },
  { title: "Metal composite attachment", body: "Confirm the offered ALMINE panel's fabrication limits and compatible attachment details before selecting a tray or other system. The project engineer reviews the complete wall assembly." },
  { title: "Undercut anchors for 8 mm HPL and UHPC", body: "Concealed fixings use undercut anchors or cast-in inserts; positions and pull-out values belong to the engineer's design." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Systems", description, path: "/systems" })} />
      <PageHeader
        eyebrow="Technical"
        title="Systems and design responsibility"
        lede="Cladvera supplies panels and, where stated, cut-to-size or fabricated parts. Attachment systems, anchor design and installation belong to the fabricator, the engineer of record and the installer."
        crumbs={[{ name: "Systems", path: "/systems" }]}
        actions={<Cta href="/request-quote">Send an elevation for review</Cta>}
      />

      <Section title="Compatible system types by material">
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f14">
            <thead>
              <tr className="border-b border-line bg-paper-2 text-left">
                <th className="px-[12px] py-[10px] font-medium">Material</th>
                <th className="px-[12px] py-[10px] font-medium">System types</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => (
                <tr key={m.slug} className="border-b border-line align-top last:border-b-0">
                  <td className="px-[12px] py-[10px] font-medium"><Link href={`/materials/${m.slug}`} className="hover:text-accent">{m.shortName}</Link></td>
                  <td className="px-[12px] py-[10px] text-ink-2">
                    <ul className="grid gap-[4px]">
                      {m.systems.map((s) => <li key={s}>{s}</li>)}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Who is responsible for what" tone="muted">
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f14">
            <thead>
              <tr className="border-b border-line bg-paper-2 text-left">
                <th className="px-[12px] py-[10px] font-medium">Item</th>
                {parties.map((p) => (
                  <th key={p} className="px-[12px] py-[10px] text-center font-medium">{p}</th>
                ))}
                <th className="px-[12px] py-[10px] font-medium">Note</th>
              </tr>
            </thead>
            <tbody>
              {responsibility.map((r) => (
                <tr key={r.item} className="border-b border-line align-top last:border-b-0">
                  <td className="px-[12px] py-[10px] font-medium text-ink">{r.item}</td>
                  {parties.map((p) => (
                    <td key={p} className="px-[12px] py-[10px] text-center text-ink-2">{r.owners.includes(p) ? "Yes" : "No"}</td>
                  ))}
                  <td className="px-[12px] py-[10px] text-ink-2">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Rainscreen principles">
        <div className="grid gap-[16px] md:grid-cols-2">
          {principles.map((p) => (
            <Callout key={p.title} title={p.title}>{p.body}</Callout>
          ))}
        </div>
      </Section>

      <Section title="Documents we provide per system" tone="muted">
        <ul className="grid gap-[8px] md:grid-cols-2">
          {[
            { name: "Installation data sheet per system type (hole sizes, fixed points, edge distances)", status: "planned" as const },
            { name: "CAD details for exposed and concealed fixing (DWG, PDF)", status: "planned" as const },
            { name: "Panel schedule and numbering template", status: "in-progress" as const },
            { name: "Anchor and insert layout for UHPC standard formats", status: "planned" as const },
          ].map((d) => (
            <li key={d.name} className="flex items-start justify-between gap-[12px] rounded-card border border-line bg-paper px-[16px] py-[12px] text-f14">
              <span className="text-ink">{d.name}</span>
              <StatusBadge status={d.status} />
            </li>
          ))}
        </ul>
        <p className="mt-[12px] text-f12 text-ink-3">Fabrication parameters are on <Link href="/fabrication" className="underline">fabrication</Link>; test status on <Link href="/compliance" className="underline">compliance</Link>.</p>
      </Section>
    </>
  );
}

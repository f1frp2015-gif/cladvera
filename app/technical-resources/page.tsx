import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Cta, Faq, LinkCard, PageHeader, Section, StatusBadge, Steps } from "@/components/ui";
import { materials } from "@/content/data/materials";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Data sheets, CSI specifications, CAD and BIM, test reports, warranty and comparison data for panel submittals, organised as a 13.1A set.";

export const metadata = buildPageMetadata({
  title: "Technical Resources: Data Sheets, Specs, CAD and Reports",
  description,
  path: "/technical-resources",
});

const attachmentSet = [
  { label: "A. Product data sheets", body: "One per material and thickness, with the specification rows published on each material page and their confirmation status.", href: "/materials" },
  { label: "B. Three-part specifications", body: "By MasterFormat section: 07 42 43, 07 42 13.23, 09 78 23, 06 42 16 and 03 45 00. Drafts in progress; status per material below.", href: "/materials" },
  { label: "C. CAD and BIM", body: "DWG and PDF details per attachment system and Revit families are planned; ARCAT and BIMobject listings follow once files are released.", href: "/systems" },
  { label: "D. Test reports", body: "Published with report numbers and laboratory names on the compliance matrix.", href: "/compliance" },
  { label: "E. Warranty", body: "Draft terms with the responsible North American party to be named.", href: "/warranty" },
  { label: "F. Comparison data", body: "ACM vs HPL vs UHPC and UHPC vs GFRC, with the figures a reviewer needs for an equal-or-better judgement.", href: "/resources/acm-vs-hpl-vs-uhpc" },
  { label: "G. HTML specification tables", body: "Every material page carries its specification table in HTML so reviewers and AI tools can read it without a PDF.", href: "/materials/exterior-hpl-panels" },
];

const substitutionSteps = [
  { title: "Confirm the basis of design", body: "Identify the specified product, section and the performance the specification relies on." },
  { title: "Download the attachment set", body: "Data sheet, specification, CAD, test reports and warranty for the proposed panel." },
  { title: "Attach comparison data", body: "Side-by-side figures from the comparison pages and the spec table, with unconfirmed rows marked." },
  { title: "State warranty equivalence", body: "CSI Form 13.1A asks for the same warranty as the specified product; use the draft terms and the responsible party." },
  { title: "Submit through Division 01", body: "Substitution requests go through Section 01 25 00 on CSI Form 13.1A, within the period the project allows." },
];

const faq = [
  {
    q: "Where can I download Revit families, CAD details and spec sheets?",
    a: "CAD details per attachment system and Revit families are planned and will be published here and on ARCAT and BIMobject once released. Data sheets are published per material as they are confirmed. Nothing is gated behind a form.",
  },
  {
    q: "Which specification section applies to each material?",
    a: "ACM: 07 42 43 Composite Wall Panels or 07 42 13.23 Metal Composite Material Wall Panels. Exterior phenolic (HPL): 07 42 43 or 07 46 00. Interior HPL: 09 78 23 Phenolic Interior Wall Paneling. Wood veneer: 06 42 16 Wood Veneer Paneling. UHPC: 03 45 00 Precast Architectural Concrete.",
  },
  {
    q: "Are downloads gated?",
    a: "No. Every document on this page is open. The only form on the site that asks for details is the quote request, because a quote needs drawings and a delivery term.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Technical resources", description, path: "/technical-resources", type: "CollectionPage" })} />
      <PageHeader
        eyebrow="Technical"
        title="Technical resources"
        lede="Organised the way a substitution request wants them: data sheets, three-part specifications, CAD and BIM, test reports, warranty and comparison data. Downloads are open."
        crumbs={[{ name: "Technical resources", path: "/technical-resources" }]}
        actions={<Cta href="/compliance">Compliance matrix</Cta>}
      />

      <Section title="The attachment set">
        <div className="grid gap-[16px] md:grid-cols-2 lg:grid-cols-3">
          {attachmentSet.map((item) => (
            <LinkCard key={item.label} href={item.href} title={item.label} description={item.body} />
          ))}
        </div>
      </Section>

      <Section title="Documents by material" lede="Status is per document. In-progress documents are being prepared from mill data; planned documents follow the assembly tests." tone="muted">
        <div className="grid gap-[16px] md:grid-cols-2">
          {materials.map((m) => (
            <div key={m.slug} className="rounded-card border border-line bg-paper p-[20px]">
              <h3 className="text-f18 font-semibold">
                <Link href={`/materials/${m.slug}`} className="hover:text-accent">{m.name}</Link>
              </h3>
              <p className="mt-[4px] font-mono text-f12 text-ink-3">{m.masterformat.join(" · ")}</p>
              <ul className="mt-[12px] grid gap-[8px]">
                {m.documents.map((d) => (
                  <li key={d.name} className="flex items-start justify-between gap-[12px] text-f14">
                    <span>
                      <span className="text-ink">{d.name}</span>
                      {d.note && <span className="block text-f12 text-ink-3">{d.note}</span>}
                    </span>
                    <StatusBadge status={d.status} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="How to submit a substitution request">
        <Steps steps={substitutionSteps} />
      </Section>

      <Section tone="muted">
        <Faq items={faq} />
      </Section>
    </>
  );
}

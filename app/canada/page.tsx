import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Badge, Callout, Cta, Faq, PageHeader, Section } from "@/components/ui";
import { materials } from "@/content/data/materials";
import { regions } from "@/content/data/regions";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "What differs for Canadian buyers: CAD quotes, the 25 percent surtax on ACM, CAN/ULC S134 and S102, GST and Buy Canadian limits.";

export const metadata = buildPageMetadata({
  title: "Panels for Canada: Surtax, CAN/ULC S134 and GST Notes",
  description,
  path: "/canada",
});

const differences = [
  "Quotes in CAD with metric units; imperial in brackets.",
  "ACM carries the 25 percent surtax under the China Surtax Order (2024); phenolic HPL, UHPC and veneer panels do not.",
  "Exterior use on noncombustible construction needs a CAN/ULC S134 assembly test; interiors and combustible construction use CAN/ULC S102 ratings.",
  "GST applies at import; HST or PST by province.",
  "Not for federal contracts covered by the Buy Canadian policy.",
  "French documentation is planned; the site launches in English.",
];

const faq = [
  {
    q: "Does the 25 percent surtax apply to phenolic (HPL) panels?",
    a: "No. The China Surtax Order (2024) covers steel and aluminum products, including aluminum sheet under heading 7606 used for ACM. Phenolic compact laminate (heading 3921), UHPC (heading 6810) and veneered panels are outside it.",
  },
  {
    q: "Is NFPA 285 accepted in Canada?",
    a: "Not assumed. The National Building Code refers to CAN/ULC S134 for exterior wall assemblies with combustible components on noncombustible construction. A separate Canadian assembly test is planned; its status is on the compliance page.",
  },
  {
    q: "What documents are provided for a Canadian project?",
    a: "The seller document pack (invoice, packing list, origin statement, bill of materials, aluminum smelt and cast information for ACM, species and origin declarations for veneer, formaldehyde documents where a wood core is used, ISPM 15 declaration) plus the test reports listed on the compliance page. Code applicability is confirmed by the project's professionals.",
  },
];

const ca = regions.CA;

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Canada", description, path: "/canada" })} />
      <PageHeader
        eyebrow="Supply"
        title="Panels for Canadian projects"
        lede="One page for what differs north of the border. There are no city pages; the country switch in the header shows Canadian notes throughout the site."
        crumbs={[{ name: "Canada", path: "/canada" }]}
        actions={<Cta href="/request-quote">Request a quote in CAD</Cta>}
      />

      <Section title="What differs">
        <ul className="grid gap-[6px] text-f14 text-ink-2 md:grid-cols-2">
          {differences.map((d) => (
            <li key={d} className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>{d}</li>
          ))}
        </ul>
      </Section>

      <Section title="Position by material" tone="muted">
        <div className="grid gap-[16px] md:grid-cols-2">
          {materials.map((m) => (
            <div key={m.slug} className="rounded-card border border-line bg-paper p-[20px]">
              <div className="flex items-start justify-between gap-[8px]">
                <h3 className="text-f18 font-semibold"><Link href={`/materials/${m.slug}`} className="hover:text-accent">{m.name}</Link></h3>
                <Badge tone={m.rank.CA === 1 ? "accent" : "neutral"}>Rank {m.rank.CA}</Badge>
              </div>
              <ul className="mt-[10px] grid gap-[4px] text-f14 text-ink-2">
                {m.supply.CA.scenarios.map((s) => (
                  <li key={s} className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>{s}</li>
                ))}
              </ul>
              <p className="mt-[10px] text-f12 text-ink-3">{m.supply.CA.dutyNote}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Code notes">
        <Callout>{ca.codeNote}</Callout>
      </Section>

      <Section title="Ports and lanes" tone="muted">
        <p className="text-f14 text-ink-2">{ca.ports.join(" · ")}. Transit ranges by lane are on <Link href="/stock-and-lead-times" className="underline">stock and lead times</Link>.</p>
      </Section>

      <Section title="French documentation">
        <p className="max-w-[760px] text-f14 text-ink-2">
          Data sheets and the document pack in French are planned for Québec projects. The site launches in English; a fr-CA version follows once the English content is verified.
        </p>
      </Section>

      <Section tone="muted">
        <Faq items={faq} />
      </Section>
    </>
  );
}

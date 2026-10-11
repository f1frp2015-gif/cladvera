import { notFound } from "next/navigation";
import { isPublishedPath } from "@/content/data/publication";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Badge, Callout, Cta, Faq, PageHeader, Section } from "@/components/ui";
import { materials } from "@/content/data/materials";
import { regions } from "@/content/data/regions";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Canadian project notes for metal composite and other panels: confirm the ordered SKU's classification, origin and current import treatment with a broker.";

export const metadata = buildPageMetadata({
  title: "Panels for Canada: Import and Code Notes",
  description,
  path: "/canada",
});

const differences = [
  "Quotes in CAD with metric units; imperial in brackets.",
  "For ALMINE metal composite panels, confirm the exact SKU's classification, origin, current surtax treatment and taxes with the importer's broker before quoting.",
  "Exterior use on noncombustible construction needs a CAN/ULC S134 assembly test; interiors and combustible construction use CAN/ULC S102 ratings.",
  "GST applies at import; HST or PST by province.",
  "Not for federal contracts covered by the Buy Canadian policy.",
  "French documentation is planned; the site launches in English.",
];

const faq = [
  {
    q: "How is surtax treatment checked for a Canadian panel shipment?",
    a: "Ask the importer's broker to classify the exact SKU and confirm its face metal, full construction, origin and current Canadian tariff and surtax treatment before quotation. Do not infer treatment from an ACM or MCM category name.",
  },
  {
    q: "Is NFPA 285 accepted in Canada?",
    a: "Not assumed. The National Building Code refers to CAN/ULC S134 for exterior wall assemblies with combustible components on noncombustible construction. A separate Canadian assembly test is planned; its status is on the compliance page.",
  },
  {
    q: "What documents are provided for a Canadian project?",
    a: "The document set is confirmed for the ordered SKU and shipment. Request invoice and packing details, origin and composition records, any applicable metal or wood documentation, and product-specific test reports. The importer's broker and project team confirm what is required.",
  },
];

const ca = regions.CA;

export default function Page() {
  if (!isPublishedPath("/canada")) notFound();

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

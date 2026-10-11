import { notFound } from "next/navigation";
import { isPublishedPath } from "@/content/data/publication";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { Callout, Cta, KeyValueList, PageHeader, Section, Steps } from "@/components/ui";
import { site } from "@/content/data/site";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Who supplies the panels, how mills are audited and batches traced, and how to verify a building material supplier before a first order.";

export const metadata = buildPageMetadata({
  title: `About ${site.brand}: Supplier Identity and Quality Process`,
  description,
  path: "/about",
});

const quality = [
  { title: "Incoming inspection", body: "Skins, cores, papers and veneers checked against the order before pressing or coating." },
  { title: "Batch records per sheet", body: "Coil or decor batch, press batch and finish code recorded against each sheet number." },
  { title: "Retained samples", body: "A retained sample per batch kept for the warranty period for comparison on claims." },
  { title: "Pre-shipment inspection", body: "Dimensions, flatness, colour against the master and packing checked; the report travels with the documents." },
];

export default function Page() {
  if (!isPublishedPath("/about")) notFound();

  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "About", description, path: "/about", type: "AboutPage" })} />
      <PageHeader
        eyebrow="Company"
        title={`About ${site.brand}`}
        lede="A China-based export supplier of architectural panels for the United States and Canada. Not a manufacturer: panels are sourced from audited mills, and the mill identity, audit reports and laboratories are published per product line."
        crumbs={[{ name: "About", path: "/about" }]}
        actions={<Cta href="/contact">Contact</Cta>}
      />

      <Section title="Who we are">
        <KeyValueList
          items={[
            { label: "Legal entity", value: site.legal.entity },
            { label: "Address", value: site.legal.address },
            { label: "Operated by", value: "An export team with existing North American building-product supply experience (details to be published)." },
            { label: "Markets", value: site.markets.join(" and ") },
            { label: "Origin", value: site.origin },
          ]}
        />
        <p className="mt-[12px] text-f12 text-ink-3">{site.brandNote}</p>
      </Section>

      <Section title="How sourcing works" tone="muted">
        <p className="max-w-[760px] text-f14 text-ink-2">
          Each product line is sourced from a mill that has passed an on-site audit. The audit report, the mill identity and the laboratories used for testing are published per line as they are confirmed (TBC). We do not describe ourselves as the manufacturer.
        </p>
      </Section>

      <Section title="Quality process">
        <Steps steps={quality} />
      </Section>

      <Section title="How to verify a building material supplier" tone="muted">
        <p className="max-w-[760px] text-f16 text-ink-2">
          Check the legal entity and registered address, ask for the mill audit report, confirm that test laboratories are accredited under the ILAC Mutual Recognition Arrangement and that reports carry numbers you can check with the laboratory, ask how batches are traced to sheets, and take references after first deliveries rather than before. This page and the <Link href="/compliance" className="underline">compliance matrix</Link> are written to answer those questions in that order.
        </p>
      </Section>

      <Section title="Contact and working hours">
        <KeyValueList
          items={[
            { label: "Email", value: <a href={`mailto:${site.contact.email}`} className="underline">{site.contact.email}</a> },
            ...(site.contact.phone ? [{ label: "Phone", value: <a href={`tel:${site.contact.phone}`} className="underline">{site.contact.phone}</a> }] : []),
            { label: "Reply", value: `Within ${site.contact.replyTime}` },
            { label: "Hours", value: site.contact.hours },
          ]}
        />
      </Section>

      <Section tone="muted">
        <Callout title="What we do not claim">
          The full list, from duties to listings to the word “manufacturer”, is on the <Link href="/compliance" className="underline">compliance page</Link>.
        </Callout>
      </Section>
    </>
  );
}

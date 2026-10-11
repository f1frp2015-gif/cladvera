import { notFound } from "next/navigation";
import { isPublishedPath } from "@/content/data/publication";
import JsonLd from "@/components/seo/JsonLd";
import { KeyValueList, LinkCard, PageHeader, Section } from "@/components/ui";
import { site } from "@/content/data/site";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Email, phone and WhatsApp contact for sample sets, project quotes and distributor enquiries, with the reply time and working hours for North American buyers.";

export const metadata = buildPageMetadata({
  title: `Contact ${site.brand}: Samples, Quotes and Distribution`,
  description,
  path: "/contact",
});

export default function Page() {
  if (!isPublishedPath("/contact")) notFound();

  const whatsapp = site.contact.whatsapp.replace(/\D/g, "");
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Contact", description, path: "/contact", type: "ContactPage" })} />
      <PageHeader eyebrow="Contact" title="Contact" lede="Samples and quotes have their own forms; everything else reaches the sales team here." crumbs={[{ name: "Contact", path: "/contact" }]} />
      <Section>
        <KeyValueList
          items={[
            { label: "Email", value: <a href={`mailto:${site.contact.email}`} className="underline">{site.contact.email}</a> },
            ...(site.contact.phone ? [{ label: "Phone", value: <a href={`tel:${site.contact.phone}`} className="underline">{site.contact.phone}</a> }] : []),
            ...(whatsapp ? [{ label: "WhatsApp", value: <a href={`https://wa.me/${whatsapp}`} className="underline" rel="noopener noreferrer">Message on WhatsApp</a> }] : []),
            { label: "Reply", value: `Within ${site.contact.replyTime}` },
            { label: "Hours", value: site.contact.hours },
            { label: "Postal address", value: site.legal.address },
          ]}
        />
      </Section>
      <Section tone="muted">
        <div className="grid gap-[16px] md:grid-cols-3">
          <LinkCard href="/samples" title="Request samples" description="Chips, range sets and confirmation panels." />
          <LinkCard href="/request-quote" title="Request a quote" description="Upload drawings for a two-business-day quote." />
          <LinkCard href="/for-contractors" title="Fabricators and distributors" description="Supply modes, terms and private label." />
        </div>
      </Section>
    </>
  );
}

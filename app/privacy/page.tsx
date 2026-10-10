import { notFound } from "next/navigation";
import { isPublishedPath } from "@/content/data/publication";
import { PageHeader, Section } from "@/components/ui";
import { site } from "@/content/data/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Privacy Notice",
  description:
    "What the sample and quote forms collect, how inquiry data is used and kept, which cookie-free analytics run, and how to request deletion.",
  path: "/privacy",
  noindex: true,
});

export default function Page() {
  if (!isPublishedPath("/privacy")) notFound();

  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy notice" lede="Last updated 2026-10-07." crumbs={[{ name: "Privacy", path: "/privacy" }]} />
      <Section>
        <div className="prose-site max-w-[760px]">
          <h2>What the forms collect</h2>
          <p>The sample and quote forms ask for your name, company, role, country, contact details, a shipping address for samples, and project information you choose to give, including uploaded drawings. Hidden anti-spam fields record only whether a form was filled by a person.</p>
          <h2>How inquiry data is used</h2>
          <p>Inquiries are emailed to the sales team and used to answer the request, prepare samples or quotes and follow up on the project. They are retained for the duration of the project relationship and the warranty period that follows an order. Data is not sold or shared with third parties beyond the email and hosting providers that process it on our behalf.</p>
          <h2>Analytics</h2>
          <p>The site uses Vercel Web Analytics and Vercel Speed Insights, which measure page views and performance without cookies or cross-site identifiers. No advertising pixels are loaded. The country switch stores your choice in your browser only.</p>
          <h2>Your choices</h2>
          <p>To correct or delete your inquiry data, or to ask what is held, write to <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. Frameworks such as GDPR, CCPA and PIPEDA may apply depending on where you are; we respond to requests under any of them.</p>
          <h2>Responsible party</h2>
          <p>{site.legal.entity}, {site.legal.address}. Contact: {site.contact.email}.</p>
        </div>
      </Section>
    </>
  );
}

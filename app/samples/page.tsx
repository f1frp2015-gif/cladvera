import JsonLd from "@/components/seo/JsonLd";
import SampleRequestForm from "@/components/forms/SampleRequestForm";
import { Callout, Faq, PageHeader, Section } from "@/components/ui";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Request colour chips, range sets for veneer and UHPC, or confirmation panels. Verified North American trade and A&D requests ship free.";

export const metadata = buildPageMetadata({
  title: "Panel Samples: Chips, Range Sets and Confirmation Panels",
  description,
  path: "/samples",
});

const faq = [
  {
    q: "Do samples match production?",
    a: "Production is matched to the signed master and range samples, and the batch is recorded per sheet. Natural finishes vary within the approved range by design; the colour-variation guide explains how the range is agreed.",
  },
  {
    q: "How long do samples take?",
    a: "Requests are verified within 48 hours and dispatched within two business days. Range sets for veneer and UHPC that have to be cut or cast take 3 to 4 weeks.",
  },
  {
    q: "Can I request a full sample wall?",
    a: "Yes, as a mock-up by quote: panel sizes, finishes and the attachment detail are agreed first, and the mock-up is credited against the order.",
  },
];

export default async function Page({ searchParams }: { searchParams: Promise<{ finish?: string | string[] }> }) {
  const params = await searchParams;
  const raw = params.finish;
  const preselected = (Array.isArray(raw) ? raw : raw ? raw.split(",") : []).map((c) => c.trim().toUpperCase()).filter(Boolean);

  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Samples", description, path: "/samples" })} />
      <PageHeader
        eyebrow="Samples"
        title="Samples: chips, range sets and confirmation panels"
        lede="Up to 10 finishes per set across any materials. Verified requests from North American industry and A&D company addresses ship free within two business days."
        crumbs={[{ name: "Samples", path: "/samples" }]}
      />

      <Section>
        <div className="grid gap-[16px] md:grid-cols-3">
          <Callout title="Colour chips">Coated and printed finishes. Free.</Callout>
          <Callout title="Range sets">Five pieces for natural veneer and UHPC. Free or against a deposit (TBC).</Callout>
          <Callout title="Confirmation panels">A4 or 12 × 12 in for mock-ups. Charged and credited on order.</Callout>
        </div>
      </Section>

      <Section title="Request a sample set" tone="muted">
        <SampleRequestForm preselected={preselected} />
      </Section>

      <Section title="After you submit">
        <ul className="grid gap-[6px] text-f14 text-ink-2 md:grid-cols-2">
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>Verification within 48 hours; a named contact confirms the set and the address.</li>
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>Dispatch within two business days for chips; 3 to 4 weeks for cut or cast range sets.</li>
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>Free for North American industry and A&D company addresses; other requests by arrangement.</li>
          <li className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>A Material Bank listing is planned once a North American shipping point exists; not yet in place.</li>
        </ul>
      </Section>

      <Section tone="muted">
        <Faq items={faq} />
      </Section>
    </>
  );
}

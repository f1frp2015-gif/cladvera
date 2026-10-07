import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import QuoteRequestForm from "@/components/forms/QuoteRequestForm";
import { PageHeader, Section } from "@/components/ui";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Upload elevations or cut lists for a drawings-based panel quote in two business days, or a budget range in one. Incoterm stated.";

export const metadata = buildPageMetadata({
  title: "Request a Project Quote for Architectural Panels",
  description,
  path: "/request-quote",
});

export default function Page() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Request a quote", description, path: "/request-quote", type: "ContactPage" })} />
      <PageHeader
        eyebrow="Quote"
        title="Request a project quote"
        lede="Project quote in two business days with drawings; budget range in one business day without."
        crumbs={[{ name: "Request a quote", path: "/request-quote" }]}
      />
      <Section>
        <div className="grid gap-[32px] lg:grid-cols-[1.4fr_1fr]">
          <QuoteRequestForm />
          <aside className="lg:sticky lg:top-[88px] lg:self-start">
            <div className="grid gap-[16px] rounded-card border border-line bg-paper-2 p-[20px] text-f14">
              <div>
                <p className="font-semibold text-ink">A quote includes</p>
                <p className="mt-[4px] text-ink-2">Material, finish codes, thickness, quantities and sheet sizes, packing, the Incoterm and a validity period.</p>
              </div>
              <div>
                <p className="font-semibold text-ink">A quote excludes</p>
                <p className="mt-[4px] text-ink-2">Duties and taxes, brokerage, inland freight unless DAP, installation, and engineering unless stated.</p>
              </div>
              <div>
                <p className="font-semibold text-ink">Tolerance</p>
                <p className="mt-[4px] text-ink-2">Budget ranges carry ±20 percent until drawings are received.</p>
              </div>
              <div>
                <p className="font-semibold text-ink">Lead time</p>
                <p className="mt-[4px] text-ink-2">Production plus ocean transit by port: see <Link href="/stock-and-lead-times" className="underline">stock and lead times</Link>.</p>
              </div>
              <div>
                <p className="font-semibold text-ink">Importer</p>
                <p className="mt-[4px] text-ink-2">Duties and taxes are payable by the importer. Not for projects subject to Buy American, BABA or Buy Canadian rules.</p>
              </div>
              <div>
                <p className="font-semibold text-ink">After you submit</p>
                <p className="mt-[4px] text-ink-2">You receive a reference; a named contact in North American working hours (to be announced) follows up.</p>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import RegionBlock from "@/components/region/RegionBlock";
import { Badge, Cta, LinkCard, Section, Steps } from "@/components/ui";
import { FinishCard } from "@/components/ui/Swatch";
import { finishes } from "@/content/data/finishes";
import { materialsForRegion } from "@/content/data/materials";
import { site } from "@/content/data/site";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Phenolic HPL, UHPC, ACM and wood veneer panels for US and Canadian fabricators, distributors and contractors, supplied from China with test reports, stock and lead times.";

export const metadata = buildPageMetadata({
  title: `${site.brand} | Architectural Panels for Fabricators and Distributors`,
  description,
  path: "/",
});

const evidence = [
  { label: "Test status", value: "Material tests in progress; assembly tests scheduled", href: "/compliance" },
  { label: "Supply", value: site.origin, href: "/supply-and-delivery" },
  { label: "Ships to", value: "All US states and Canadian provinces via container or LCL", href: "/stock-and-lead-times" },
  { label: "Mixed containers", value: "Several finishes and thicknesses per container", href: "/for-contractors" },
];

const steps = [
  { title: "Samples", body: "Chips, range sets or confirmation panels, verified and shipped within two business days." },
  { title: "Drawings and quote", body: "Elevations or cut lists uploaded; quote in two business days with the Incoterm and exclusions stated." },
  { title: "Mock-up", body: "Signed master and range samples, or a sample wall for natural finishes." },
  { title: "Production and QC", body: "Batch, sheet number and direction recorded per sheet; inspection report before shipping." },
  { title: "Ocean and inland", body: "Crated for container or LCL; documents issued for the importer's broker." },
  { title: "Replenishment", body: "Attic stock agreed at order; reorders matched to the recorded batch." },
];

export default function Home() {
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: site.brand, description, path: "/" })} />

      {/* 1 Hero */}
      <section className="border-b border-line bg-paper-2">
        <div className="site-container grid gap-[32px] py-[56px] md:grid-cols-[1.2fr_1fr] md:py-[80px]">
          <div>
            <p className="mb-[12px] font-mono text-f12 font-medium uppercase tracking-[0.08em] text-accent">
              Phenolic HPL · UHPC · ACM · Wood veneer
            </p>
            <h1 className="text-f32 font-semibold md:text-f44 lg:text-f56">
              Specification-ready architectural panels for US and Canadian fabricators, distributors and contractors
            </h1>
            <p className="mt-[16px] max-w-[640px] text-f18 text-ink-2">
              Exterior phenolic compact panels, UHPC facade panels, aluminum composite and real-wood veneer, supplied from audited
              Chinese mills with the test reports, tariff guidance, stock and lead times you can put in a submittal.
            </p>
            <div className="mt-[24px] flex flex-wrap gap-[12px]">
              <Cta href="/samples">Request samples</Cta>
              <Cta href="/request-quote" variant="secondary">Upload drawings for a quote</Cta>
              <Cta href="/stock-and-lead-times" variant="ghost">Stock and lead times →</Cta>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[10px] self-center">
            {finishes.slice(0, 4).map((f) => (
              <div key={f.code} className="h-[120px] rounded-card border border-line" style={{ background: f.swatch }} aria-hidden="true" />
            ))}
            <p className="col-span-2 text-f12 text-ink-3">Placeholder swatches. Launch hero: one installed elevation with its location stated.</p>
          </div>
        </div>
      </section>

      {/* 2 Evidence bar */}
      <section className="border-b border-line bg-slate text-paper">
        <div className="site-container grid gap-[16px] py-[20px] md:grid-cols-4">
          {evidence.map((e) => (
            <Link key={e.label} href={e.href} className="group">
              <p className="font-mono text-f12 uppercase tracking-[0.08em] text-paper/60">{e.label}</p>
              <p className="mt-[2px] text-f14 text-paper group-hover:underline">{e.value}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3 Material cards, ordered by country */}
      <Section title="Materials" lede="Ordered for the country you selected: the lowest-friction line first.">
        <RegionBlock us={<MaterialCards region="US" />} ca={<MaterialCards region="CA" />} />
      </Section>

      {/* 4 Finish preview */}
      <Section title="Finishes" lede="Printed pattern and real texture are labelled separately; natural finishes are approved on range samples." tone="muted">
        <div className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
          {finishes.slice(0, 8).map((f) => (
            <FinishCard key={f.code} finish={f} />
          ))}
        </div>
        <div className="mt-[16px]">
          <Cta href="/finishes" variant="ghost">All finishes →</Cta>
        </div>
      </Section>

      {/* 5 Process */}
      <Section title="How supply works" lede="Six steps from sample to reorder, each with a named document.">
        <Steps steps={steps} />
      </Section>

      {/* 6 Stock snapshot */}
      <Section title="Stock and lead times" tone="muted">
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f14">
            <thead>
              <tr className="border-b border-line bg-paper-2 text-left">
                <th className="px-[12px] py-[10px] font-medium">Line</th>
                <th className="px-[12px] py-[10px] font-medium">Status</th>
                <th className="px-[12px] py-[10px] font-medium">Production</th>
                <th className="px-[12px] py-[10px] font-medium">Minimum</th>
              </tr>
            </thead>
            <tbody>
              {materialsForRegion("US").slice(0, 4).map((m) => (
                <tr key={m.slug} className="border-b border-line last:border-b-0 align-top">
                  <td className="px-[12px] py-[10px] font-medium"><Link href={`/materials/${m.slug}`} className="hover:text-accent">{m.shortName}</Link></td>
                  <td className="px-[12px] py-[10px] text-ink-2">{m.stock.note}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{m.stock.leadTime}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{m.stock.moq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-[12px]">
          <Cta href="/stock-and-lead-times" variant="ghost">Full table with transit by port →</Cta>
        </div>
      </Section>

      {/* 7 Projects */}
      <Section title="Projects">
        <p className="max-w-[760px] text-f14 text-ink-2">
          Project records are published as deliveries complete, each with its location, scope and finish codes. None are listed yet; reference projects from other suppliers are not borrowed.
        </p>
      </Section>

      {/* 8 Roles */}
      <Section tone="muted">
        <div className="grid gap-[16px] md:grid-cols-2">
          <LinkCard
            href="/for-contractors"
            title="For fabricators, distributors and contractors"
            description="Supply modes (full sheets, cut to size, fabricated), stock table, MOQ, mixed-container rules, private label and the document pack."
            meta={<Badge tone="accent">First buyers</Badge>}
          />
          <LinkCard
            href="/architects"
            title="For architects and designers"
            description="Finish library, CSI sections, HTML spec tables, colour-variation guide, CAD and BIM, sample sets and substitution support."
            meta={<Badge>Specifiers</Badge>}
          />
        </div>
      </Section>

      {/* 9 Technical preview */}
      <Section title="Technical resources" lede="Open downloads, organised the way a substitution request (CSI 13.1A) wants them.">
        <div className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
          <LinkCard href="/technical-resources" title="Data sheets and CSI sections" description="Per material and thickness." />
          <LinkCard href="/compliance" title="Compliance matrix" description="Test status by product, country and assembly, with what is not claimed." />
          <LinkCard href="/resources/acm-vs-hpl-vs-uhpc" title="ACM vs HPL vs UHPC" description="Thickness, weight, fire route and cost bands side by side." />
          <LinkCard href="/resources/panel-color-variation" title="Colour variation" description="Master and range samples, lighting and ΔE conditions." />
        </div>
      </Section>
    </>
  );
}

function MaterialCards({ region }: { region: "US" | "CA" }) {
  return (
    <div className="grid gap-[16px] md:grid-cols-2 lg:grid-cols-4">
      {materialsForRegion(region)
        .filter((m) => m.priority === "P0")
        .map((m, index) => (
          <LinkCard
            key={m.slug}
            href={`/materials/${m.slug}`}
            title={m.name}
            description={m.specs.slice(0, 2).map((s) => `${s.label}: ${s.value}`).join(". ")}
            meta={<Badge tone={index === 0 ? "accent" : "neutral"}>{index === 0 ? "Lead line" : m.use.join(" / ")}</Badge>}
          />
        ))}
    </div>
  );
}

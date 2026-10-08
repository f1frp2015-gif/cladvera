import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import RegionBlock from "@/components/region/RegionBlock";
import { Badge, Callout, Cta, Faq, KeyValueList, PageHeader, Section, SpecTable, StatusBadge } from "@/components/ui";
import { FinishCard } from "@/components/ui/Swatch";
import { complianceColumns, complianceRows } from "@/content/data/compliance";
import { finishFamilies, finishesForMaterial } from "@/content/data/finishes";
import { findMaterial, type MaterialSlug } from "@/content/data/materials";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

export function materialMetadata(slug: MaterialSlug) {
  const m = findMaterial(slug)!;
  return buildPageMetadata({ title: m.metaTitle, description: m.metaDescription, path: `/materials/${slug}` });
}

export default function MaterialPage({ slug }: { slug: MaterialSlug }) {
  const m = findMaterial(slug)!;
  const path = `/materials/${slug}`;
  const finishes = finishesForMaterial(slug);
  const families = finishFamilies.filter((f) => m.finishFamilies.includes(f.slug));
  const rows = complianceRows.filter((r) => r.materialSlug === slug);
  const keyColumns = complianceColumns.filter((c) => ["e84", "nfpa285", "listing", "s134", "s102"].includes(c.id));

  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: m.name, description: m.metaDescription, path, type: "ItemPage" })} />

      {/* 1 Title area */}
      <PageHeader
        eyebrow={m.use.map((u) => (u === "interior" ? "Interior" : "Exterior")).join(" / ")}
        title={m.name}
        lede={m.definition}
        crumbs={[{ name: "Materials", path: "/materials" }, { name: m.shortName, path }]}
        actions={
          <>
            <Cta href="/samples">Request samples</Cta>
            <Cta href="/request-quote" variant="secondary">Upload drawings for a quote</Cta>
          </>
        }
      >
        <div className="mt-[16px] flex flex-wrap gap-[6px]">
          {m.masterformat.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
      </PageHeader>

      {/* 2 Country supply note */}
      <Section title="Where it can be specified today" lede="Scenarios before any wall-assembly listing is published. Duty notes are summaries; the importer's broker confirms classification and rates for each order.">
        <div className="grid gap-[16px]">
          {m.intro.map((p) => (
            <p key={p} className="max-w-[760px] text-f16 text-ink-2">
              {p}
            </p>
          ))}
          {m.caveat && <Callout tone="warn" title="Before you quote">{m.caveat}</Callout>}
          <RegionBlock
            us={<SupplyBlock supply={m.supply.US} />}
            ca={<SupplyBlock supply={m.supply.CA} />}
            className="rounded-card border border-line bg-paper-2 p-[20px]"
          />
          <p className="text-f12 text-ink-3">Tariff references are for orientation only and are not a classification opinion.</p>
        </div>
      </Section>

      {/* 3 Spec table */}
      <Section title="Specifications" lede="Planned values are marked until the mill's data sheet for the ordered SKU has been checked.">
        <SpecTable rows={m.specs} />
        {slug === "uhpc-panels" && (
          <div className="mt-[20px]">
            <Callout title="TAKTL manufacturer collection">
              Cladvera also supplies TAKTL&apos;s A|UHPC panels, KORSA, SOLA and hardware for project inquiries. Explore the <Link href="/suppliers/taktl" className="font-medium text-accent underline underline-offset-4">TAKTL product collection</Link>; its manufacturer specifications are separate from this Cladvera UHPC line.
            </Callout>
          </div>
        )}
      </Section>

      {/* 4 Finish families */}
      <Section title="Finishes" lede="Each finish has its own page with gloss, texture, direction, variation class and sample options." tone="muted">
        <div className="mb-[16px] flex flex-wrap gap-[6px]">
          {families.map((f) => (
            <Badge key={f.slug} tone="accent">{f.name}</Badge>
          ))}
        </div>
        {finishes.length > 0 ? (
          <div className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
            {finishes.map((f) => (
              <FinishCard key={f.code} finish={f} />
            ))}
          </div>
        ) : (
          <p className="text-f14 text-ink-2">Finish library for this material is being photographed.</p>
        )}
        <div className="mt-[16px]">
          <Cta href="/finishes" variant="ghost">All finishes →</Cta>
        </div>
      </Section>

      {/* 5 Systems and fabrication */}
      <Section title="Systems and fabrication">
        <div className="grid gap-[24px] md:grid-cols-2">
          <div>
            <h3 className="mb-[8px] text-f18 font-semibold">Compatible systems</h3>
            <ul className="grid gap-[6px] text-f14 text-ink-2">
              {m.systems.map((s) => (
                <li key={s} className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>{s}</li>
              ))}
            </ul>
            <p className="mt-[10px] text-f12 text-ink-3">Design responsibility for each system is set out on <Link href="/systems" className="underline">systems</Link>.</p>
          </div>
          <div>
            <h3 className="mb-[8px] text-f18 font-semibold">Fabrication notes</h3>
            <ul className="grid gap-[6px] text-f14 text-ink-2">
              {m.fabrication.map((s) => (
                <li key={s} className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>{s}</li>
              ))}
            </ul>
            <p className="mt-[10px] text-f12 text-ink-3">Routing, folding and film data on <Link href="/fabrication" className="underline">fabrication</Link>.</p>
          </div>
        </div>
      </Section>

      {/* 6 Compliance block */}
      <Section title="Test status" lede="A cell reads “available” only when the report number, laboratory and assembly description are published on the compliance page." tone="muted">
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f14">
            <thead>
              <tr className="border-b border-line bg-paper-2 text-left">
                <th className="px-[12px] py-[10px] font-medium">Product</th>
                {keyColumns.map((c) => (
                  <th key={c.id} className="px-[12px] py-[10px] font-medium">{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-line last:border-b-0 align-top">
                  <td className="px-[12px] py-[10px] font-medium text-ink">{r.product}</td>
                  {keyColumns.map((c) => (
                    <td key={c.id} className="px-[12px] py-[10px]">
                      <StatusBadge status={r.cells[c.id].status} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-[12px]">
          <Cta href="/compliance" variant="ghost">Full compliance matrix with notes →</Cta>
        </div>
      </Section>

      {/* 7 Stock and MOQ */}
      <Section title="Stock, minimums and lead times">
        <KeyValueList
          items={[
            { label: "Stock", value: m.stock.note },
            { label: "Minimum order", value: m.stock.moq },
            { label: "Lead time", value: m.stock.leadTime },
            { label: "Packing", value: m.stock.perCrate },
          ]}
        />
        <div className="mt-[12px]">
          <Cta href="/stock-and-lead-times" variant="ghost">Stock table and transit times by port →</Cta>
        </div>
      </Section>

      {/* 8 Documents */}
      <Section title="Documents" lede="Downloads are open; nothing is gated behind a form." tone="muted">
        <ul className="grid gap-[8px] md:grid-cols-2">
          {m.documents.map((d) => (
            <li key={d.name} className="flex items-start justify-between gap-[12px] rounded-card border border-line bg-paper px-[16px] py-[12px] text-f14">
              <span>
                <span className="font-medium text-ink">{d.name}</span>
                {d.note && <span className="block text-f12 text-ink-3">{d.note}</span>}
              </span>
              <StatusBadge status={d.status} />
            </li>
          ))}
        </ul>
        <div className="mt-[12px]">
          <Cta href="/technical-resources" variant="ghost">Technical resources →</Cta>
        </div>
      </Section>

      {/* 9 Projects placeholder */}
      <Section title="Projects">
        <p className="max-w-[760px] text-f14 text-ink-2">
          Project records for this material are published as deliveries complete, with the location, scope and the finish codes used. None are listed yet.
        </p>
      </Section>

      {/* 10 FAQ */}
      <Section tone="muted">
        <Faq items={m.faq} />
      </Section>

      {/* 11 Sticky CTA */}
      <div className="sticky bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur">
        <div className="site-container flex flex-wrap items-center justify-between gap-[12px] py-[10px]">
          <p className="text-f14 font-medium">{m.shortName}: samples, drawings-based quotes and the document pack.</p>
          <div className="flex gap-[8px]">
            <Cta href="/samples" variant="secondary">Request samples</Cta>
            <Cta href="/request-quote">Upload drawings</Cta>
          </div>
        </div>
      </div>
    </>
  );
}

function SupplyBlock({ supply }: { supply: { scenarios: string[]; dutyNote: string; tariffReference: string[] } }) {
  return (
    <div className="grid gap-[12px] text-f14">
      <div>
        <p className="font-semibold text-ink">Sellable scenarios</p>
        <ul className="mt-[4px] grid gap-[4px] text-ink-2">
          {supply.scenarios.map((s) => (
            <li key={s} className="flex gap-[8px]"><span aria-hidden="true" className="text-accent">▪</span>{s}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-semibold text-ink">Duty position</p>
        <p className="mt-[4px] text-ink-2">{supply.dutyNote}</p>
      </div>
      <div>
        <p className="font-semibold text-ink">Tariff references</p>
        <p className="mt-[4px] font-mono text-f12 text-ink-2">{supply.tariffReference.join(" · ")}</p>
      </div>
    </div>
  );
}

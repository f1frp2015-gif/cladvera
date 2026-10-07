import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { Badge, Callout, Cta, KeyValueList, PageHeader, Section } from "@/components/ui";
import { FinishCard, Swatch } from "@/components/ui/Swatch";
import { findFinish, finishes, finishFamilies, variationLabel } from "@/content/data/finishes";
import { materials } from "@/content/data/materials";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

type Params = Promise<{ code: string }>;

export function generateStaticParams() {
  return finishes.map((f) => ({ code: f.code.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { code } = await params;
  const finish = findFinish(code);
  if (!finish) return {};
  const family = finishFamilies.find((f) => f.slug === finish.family)!;
  const title = `${finish.name} (${finish.code}) | ${family.name} finish`;
  const description = `${finish.name}: ${family.name.toLowerCase()} finish for ${finish.materials
    .map((slug) => materials.find((m) => m.slug === slug)?.shortName ?? slug)
    .join(" and ")} panels. ${finish.gloss}; ${finish.texture.toLowerCase()}; ${finish.directional ? "directional" : "non-directional"}. Samples and range sets on request.`;
  return buildPageMetadata({
    title: title.slice(0, 60),
    description: description.length > 160 ? `${description.slice(0, 157)}...` : description.padEnd(120, " ").trimEnd(),
    path: `/finishes/${finish.code.toLowerCase()}`,
  });
}

export default async function Page({ params }: { params: Params }) {
  const { code } = await params;
  const finish = findFinish(code);
  if (!finish) notFound();
  const family = finishFamilies.find((f) => f.slug === finish.family)!;
  const usedOn = materials.filter((m) => finish.materials.includes(m.slug));
  const pairings = finishes.filter((f) => f.code !== finish.code && f.family !== finish.family).slice(0, 4);
  const path = `/finishes/${finish.code.toLowerCase()}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: `${finish.name} (${finish.code})`,
          description: `${family.name} finish for ${usedOn.map((m) => m.name).join(", ")}.`,
          sku: finish.code,
          category: family.name,
          material: usedOn.map((m) => m.shortName).join(", "),
          additionalProperty: [
            { "@type": "PropertyValue", name: "Gloss", value: finish.gloss },
            { "@type": "PropertyValue", name: "Texture", value: finish.texture },
            { "@type": "PropertyValue", name: "Directional", value: finish.directional ? "Yes" : "No" },
            { "@type": "PropertyValue", name: "Variation class", value: finish.variation },
          ],
        }}
      />
      <JsonLd data={buildWebPageSchema({ name: finish.name, description: family.description, path, type: "ItemPage" })} />

      <PageHeader
        eyebrow={`${family.name} · ${finish.code}`}
        title={finish.name}
        lede={family.description}
        crumbs={[{ name: "Finishes", path: "/finishes" }, { name: finish.name, path }]}
        actions={
          <>
            <Cta href={`/samples?finish=${finish.code}`}>Add to sample set</Cta>
            <Cta href="/request-quote" variant="secondary">Quote with this finish</Cta>
          </>
        }
      />

      {/* 1 Three scales */}
      <Section title="Swatch, sheet and installed view" lede="Placeholder swatch. Launch images: colour chip, full sheet, close-up and an installed elevation under stated lighting.">
        <div className="grid gap-[16px] md:grid-cols-3">
          <div>
            <Swatch finish={finish} size="lg" />
            <p className="mt-[6px] text-f12 text-ink-3">Chip</p>
          </div>
          <div>
            <Swatch finish={finish} size="lg" />
            <p className="mt-[6px] text-f12 text-ink-3">Full sheet (photo pending)</p>
          </div>
          <div>
            <Swatch finish={finish} size="lg" />
            <p className="mt-[6px] text-f12 text-ink-3">Installed, side light (photo pending)</p>
          </div>
        </div>
      </Section>

      {/* 2 Fact table */}
      <Section title="Facts" tone="muted">
        <KeyValueList
          items={[
            { label: "Finish code", value: finish.code },
            { label: "Family", value: family.name },
            {
              label: "Available on",
              value: usedOn.map((m, i) => (
                <span key={m.slug}>
                  {i > 0 && ", "}
                  <Link href={`/materials/${m.slug}`} className="underline">{m.name}</Link>
                </span>
              )),
            },
            { label: "Use", value: finish.use.join(" and ") },
            { label: "Gloss", value: finish.gloss },
            { label: "Texture", value: finish.texture },
            { label: "Directional", value: finish.directional ? "Yes: install with arrows in one direction per elevation" : "No" },
            { label: "Variation class", value: variationLabel[finish.variation] },
            { label: "Range samples", value: finish.rangeSample ? "Issued for approval before production" : "Not needed; batch-controlled" },
            { label: "Stock", value: finish.stock === "planned-stock" ? "Planned stock programme" : "Made to order" },
            { label: "Minimum order", value: finish.moq },
          ]}
        />
        {finish.note && <div className="mt-[16px]"><Callout>{finish.note}</Callout></div>}
      </Section>

      {/* 4 Pairings */}
      <Section title="Pairs with" lede="Material identity and the edge between materials stay visible in the recommended combinations.">
        <div className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
          {pairings.map((f) => (
            <FinishCard key={f.code} finish={f} />
          ))}
        </div>
      </Section>

      {/* 5 Technical notes */}
      <Section title="Technical notes" tone="muted">
        <div className="grid gap-[12px] text-f14 text-ink-2 md:grid-cols-3">
          <div className="rounded-card border border-line bg-paper p-[16px]">
            <p className="font-semibold text-ink">Surface system</p>
            <p className="mt-[4px]">Coating, overlay or mould data for this finish is published with the material data sheet.</p>
          </div>
          <div className="rounded-card border border-line bg-paper p-[16px]">
            <p className="font-semibold text-ink">Cleaning</p>
            <p className="mt-[4px]">Washing intervals and approved cleaners are in the <Link href="/warranty" className="underline">warranty</Link> conditions.</p>
          </div>
          <div className="rounded-card border border-line bg-paper p-[16px]">
            <p className="font-semibold text-ink">Colour control</p>
            <p className="mt-[4px]">Master and range samples, lighting and ΔE conditions follow the <Link href="/resources/panel-color-variation" className="underline">colour variation guide</Link>.</p>
          </div>
        </div>
      </Section>

      {/* 6 Projects */}
      <Section title="Projects using this finish">
        <p className="text-f14 text-ink-2">Published as deliveries complete. None listed yet.</p>
        <div className="mt-[12px] flex flex-wrap gap-[6px]">
          <Badge>Systems: <Link href="/systems" className="underline">see compatible systems</Link></Badge>
          <Badge>Fabrication: <Link href="/fabrication" className="underline">routing and film</Link></Badge>
          <Badge>Custom colour: <Link href="/request-quote" className="underline">request a match</Link></Badge>
        </div>
      </Section>
    </>
  );
}

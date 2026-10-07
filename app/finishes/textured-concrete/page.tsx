import JsonLd from "@/components/seo/JsonLd";
import { Callout, Cta, Faq, PageHeader, Section } from "@/components/ui";
import { FinishCard } from "@/components/ui/Swatch";
import { finishesInFamily } from "@/content/data/finishes";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "UHPC panel textures from smooth to ribbed and board-formed: relief depth, light and viewing distance, pigments, pinholes and moulds.";

export const metadata = buildPageMetadata({
  title: "UHPC Concrete Textures: Smooth, Ribbed and Board-Formed",
  description,
  path: "/finishes/textured-concrete",
});

const faq = [
  { q: "Which UHPC textures give pronounced shadow lines?", a: "Ribbed and board-formed textures with a stated relief depth. Smooth and sandblasted surfaces read flat; shadows depend on relief depth, the angle of light and the viewing distance." },
  { q: "Can UHPC be coloured?", a: "Yes, with integral pigments. Colour varies between casts and with curing, so it is approved on range samples rather than a single chip." },
  { q: "How are pinholes handled?", a: "A pinhole range is agreed on the range samples and recorded in the order; a breathable sealer can be applied at the plant." },
  { q: "Are custom textures possible?", a: "Yes, with a project mould whose cost is spread over the order. Standard moulds avoid that cost." },
];

export default function Page() {
  const items = finishesInFamily("textured-concrete");
  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Concrete textures", description, path: "/finishes/textured-concrete", type: "CollectionPage" })} />
      <PageHeader eyebrow="Finishes" title="UHPC concrete textures" crumbs={[{ name: "Finishes", path: "/finishes" }, { name: "Concrete textures", path: "/finishes/textured-concrete" }]} actions={<Cta href="/samples">Request UHPC range samples</Cta>} />
      <Section>
        <p className="max-w-[820px] text-f18 text-ink-2">
          Ribbed and board-formed textures produce pronounced shadow lines because they have measurable relief; smooth and sandblasted faces read flat. How strong the shadow is depends on the relief depth, the angle of the light and how far away the facade is seen, so textures are judged on mock-up panels under site light.
        </p>
      </Section>
      <Section title="Textures" tone="muted">
        <div className="overflow-x-auto rounded-card border border-line bg-paper">
          <table className="w-full text-f14">
            <thead><tr className="border-b border-line bg-paper-2 text-left"><th className="px-[12px] py-[10px] font-medium">Code</th><th className="px-[12px] py-[10px] font-medium">Name</th><th className="px-[12px] py-[10px] font-medium">Texture</th><th className="px-[12px] py-[10px] font-medium">Directional</th><th className="px-[12px] py-[10px] font-medium">Note</th></tr></thead>
            <tbody>
              {items.map((f) => (
                <tr key={f.code} className="border-b border-line align-top last:border-b-0">
                  <td className="px-[12px] py-[10px] font-mono text-f12">{f.code}</td>
                  <td className="px-[12px] py-[10px] font-medium">{f.name}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{f.texture}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{f.directional ? "Yes" : "No"}</td>
                  <td className="px-[12px] py-[10px] text-ink-2">{f.note ?? "Placeholder texture (TBC)"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section>
        <div className="grid gap-[16px] md:grid-cols-3">
          <Callout title="Light and distance">Side light deepens relief and shows pinholes; frontal light flattens both. Judge close, mid and far views on a mock-up.</Callout>
          <Callout title="Colour">Integral pigments and a plant-applied sealer; casting and weathering variation agreed on range samples.</Callout>
          <Callout title="Moulds">Standard moulds carry no tooling cost; custom moulds are amortised over the project.</Callout>
        </div>
      </Section>
      <Section tone="muted">
        <div className="grid grid-cols-2 gap-[12px] sm:gap-[16px] lg:grid-cols-4">
          {items.map((f) => <FinishCard key={f.code} finish={f} />)}
        </div>
      </Section>
      <Section><Faq items={faq} /></Section>
    </>
  );
}

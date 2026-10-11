import { notFound } from "next/navigation";
import { isPublishedPath } from "@/content/data/publication";
import JsonLd from "@/components/seo/JsonLd";
import { Badge, Cta, PageHeader, Section } from "@/components/ui";
import { finishFamilies } from "@/content/data/finishes";
import { materials } from "@/content/data/materials";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description =
  "Project records for delivered panel orders with location, year, scope, material and finish codes, published as deliveries complete.";

export const metadata = buildPageMetadata({
  title: "Projects: Delivered Panel Orders and Material Details",
  description,
  path: "/projects",
});

const buildingTypes = ["Commercial", "Hospitality", "Retail", "Education and healthcare", "Multifamily"];

export default function Page() {
  if (!isPublishedPath("/projects")) notFound();

  return (
    <>
      <JsonLd data={buildWebPageSchema({ name: "Projects", description, path: "/projects", type: "CollectionPage" })} />
      <PageHeader
        eyebrow="Projects"
        title="Projects"
        lede="Each record carries the location, year, scope, material and finish codes, and the attachment detail where the project allows. Projects outside North America are labelled as such. Reference projects from other suppliers are not borrowed."
        crumbs={[{ name: "Projects", path: "/projects" }]}
        actions={<Cta href="/samples">Request samples</Cta>}
      />
      <Section>
        <div className="mb-[16px] flex flex-wrap gap-[6px]">
          {materials.map((m) => <Badge key={m.slug}>{m.shortName}</Badge>)}
          {finishFamilies.map((f) => <Badge key={f.slug} tone="accent">{f.name}</Badge>)}
          {buildingTypes.map((b) => <Badge key={b} tone="pending">{b}</Badge>)}
        </div>
        <div className="rounded-card border border-dashed border-line-strong bg-paper-2 p-[32px] text-center">
          <p className="text-f18 font-semibold">No project records yet</p>
          <p className="mt-[6px] text-f14 text-ink-2">The first records are published after the first North American deliveries complete and the owners consent to publication.</p>
        </div>
      </Section>
    </>
  );
}

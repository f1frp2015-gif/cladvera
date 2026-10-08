import ProjectRequest from "@/components/catalog/ProjectRequest";
import { PageHeader, Section } from "@/components/ui";
import { parseProductIds } from "@/content/data/catalog";
import { buildPageMetadata } from "@/lib/seo";
export const metadata = buildPageMetadata({ title: "Request Material Samples & Mock-ups | Cladvera", description: "Request product samples or discuss a custom mock-up with Cladvera. Include your selected materials, finish, evaluation needs and delivery destination.", path: "/samples", noindex: true });
export default async function Page({ searchParams }: { searchParams: Promise<{ products?: string }> }) {
  const params = await searchParams;
  return <><PageHeader eyebrow="Material review" title="Plan your sample or mock-up" lede="Tell us which finish and construction you need to evaluate. Sample format, availability, cost and delivery are confirmed for your request." crumbs={[{ name: "Architects", path: "/architects" }, { name: "Samples", path: "/samples" }]} /><Section><ProjectRequest key={params.products ?? "saved"} initialIds={params.products !== undefined ? parseProductIds(params.products) : undefined} intent="sample" /></Section></>;
}

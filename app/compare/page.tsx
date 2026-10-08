import CompareProducts from "@/components/catalog/CompareProducts";
import { PageHeader, Section } from "@/components/ui";
import { parseProductIds } from "@/content/data/catalog";
import { buildPageMetadata } from "@/lib/seo";
export const metadata = buildPageMetadata({ title: "Compare Your Product Shortlist | Cladvera", description: "Compare shortlisted architectural materials by application, construction and documentation, then carry your selection into a sample or project quote request.", path: "/compare", noindex: true });
export default async function Page({ searchParams }: { searchParams: Promise<{ products?: string }> }) {
  const params = await searchParams;
  return <><PageHeader eyebrow="Project shortlist" title="Compare before you specify" lede="Review up to four product families, share the selection with your team, and carry it into the next project step." crumbs={[{ name: "Products", path: "/products" }, { name: "Compare", path: "/compare" }]} /><Section><CompareProducts key={params.products ?? "saved"} sharedIds={params.products !== undefined ? parseProductIds(params.products) : undefined} /></Section></>;
}

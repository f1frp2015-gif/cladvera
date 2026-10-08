import ProjectRequest from "@/components/catalog/ProjectRequest";
import { PageHeader, Section } from "@/components/ui";
import { parseProductIds } from "@/content/data/catalog";
import { buildPageMetadata } from "@/lib/seo";
export const metadata = buildPageMetadata({ title: "Project Quote & Document Requests | Cladvera", description: "Prepare a product-specific project brief with quantities, drawings, finishes and technical requirements, then email Cladvera for review and pricing.", path: "/request-quote", noindex: true });
export default async function Page({ searchParams }: { searchParams: Promise<{ products?: string; intent?: string }> }) {
  const params = await searchParams;
  return <><PageHeader eyebrow="Project inquiry" title={params.intent === "documents" ? "Request project documents" : "Build your project request"} lede="Carry your product selection into a clear brief for technical review, samples or pricing." crumbs={[{ name: "Procurement", path: "/procurement" }, { name: "Project request", path: "/request-quote" }]} /><Section><ProjectRequest key={`${params.products}-${params.intent}`} initialIds={params.products !== undefined ? parseProductIds(params.products) : undefined} intent={params.intent || "quote"} /></Section></>;
}

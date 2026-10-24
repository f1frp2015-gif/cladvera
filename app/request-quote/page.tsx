import ProjectRequest from "@/components/catalog/ProjectRequest";
import { PageHeader, Section } from "@/components/ui";
import { parseProductIds } from "@/content/data/catalog";
import { buildPageMetadata } from "@/lib/seo";
export const metadata = buildPageMetadata({ title: "Project Quote & Document Requests | Cladvera", description: "Send Cladvera your project details with drawings and specifications for a quote, samples or technical documents. We review the scope and reply by email.", path: "/request-quote", noindex: true });
export default async function Page({ searchParams }: { searchParams: Promise<{ products?: string; intent?: string }> }) {
  const params = await searchParams;
  return <><PageHeader eyebrow="Project inquiry" title={params.intent === "documents" ? "Request project documents" : "Request a quote"} lede="Send your project details and drawings. We review the scope and reply by email." crumbs={[{ name: "Procurement", path: "/procurement" }, { name: "Project request", path: "/request-quote" }]} /><Section><ProjectRequest key={`${params.products}-${params.intent}`} initialIds={params.products !== undefined ? parseProductIds(params.products) : undefined} intent={params.intent || "quote"} /></Section></>;
}

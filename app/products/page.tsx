import Link from "next/link";
import { PageHeader, Section, Badge } from "@/components/ui";
import SelectionButton from "@/components/catalog/SelectionButton";
import { catalogProducts, catalogCategories, catalogApplications, filterCatalog } from "@/content/data/catalog";
import { buildPageMetadata } from "@/lib/seo";
export const metadata = buildPageMetadata({ title: "Architectural Product Finder | Cladvera", description: "Find UHPC, metal composite, HPL, interior boards and custom GFRP by material, application or supplier. Shortlist products for technical review and procurement.", path: "/products" });
const inputClass = "mt-[6px] w-full rounded-control border border-line-strong bg-paper px-[12px] py-[10px] text-f14";
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const get = (key: string) => typeof params[key] === "string" ? params[key] as string : "";
  const filters = { q: get("q"), category: get("category"), application: get("application"), manufacturer: get("manufacturer") };
  const products = filterCatalog(filters);
  return <><PageHeader eyebrow="Cladvera product library" title="Find the right starting point" lede="Browse material families and intended applications. Shortlist candidates, review their documents, then confirm the exact product and assembly for your project." crumbs={[{ name: "Products", path: "/products" }]} />
    <Section>
      <form key={JSON.stringify(filters)} action="/products" method="get" className="rounded-card border border-line bg-paper-2 p-[20px]">
        <div className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-f14 font-semibold">Search products<input name="q" type="search" defaultValue={filters.q} placeholder="Material, family or supplier" className={inputClass} /></label>
          <label className="text-f14 font-semibold">Material / product role<select name="category" defaultValue={filters.category} className={inputClass}><option value="">All materials & components</option>{catalogCategories.map(c => <option value={c.id} key={c.id}>{c.label}</option>)}</select></label>
          <label className="text-f14 font-semibold">Application<select name="application" defaultValue={filters.application} className={inputClass}><option value="">All applications</option>{catalogApplications.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}</select></label>
          <label className="text-f14 font-semibold">Manufacturer<select name="manufacturer" defaultValue={filters.manufacturer} className={inputClass}><option value="">All manufacturers</option>{[...new Set(catalogProducts.map(p => p.manufacturer))].map(m => <option key={m}>{m}</option>)}</select></label>
        </div><div className="mt-[18px] flex flex-wrap items-center gap-[18px]"><button type="submit" className="rounded-control bg-accent px-[18px] py-[10px] text-f14 font-semibold text-paper">Find products</button><Link href="/products" className="text-f14 underline">Reset filters</Link><Link href="/compare" className="ml-auto text-f14 font-semibold text-accent underline">Review shortlist →</Link></div>
      </form>
      <div className="my-[24px] flex flex-wrap justify-between gap-[10px]"><h2 className="text-f20 font-semibold">{products.length} product {products.length === 1 ? "family" : "families"}</h2><p className="text-f14 text-ink-3">Add up to four products to compare.</p></div>
      {products.length ? <div className="grid gap-[20px] md:grid-cols-2 lg:grid-cols-3">{products.map(p => <article key={p.id} className="flex flex-col rounded-card border border-line bg-paper p-[22px]">
        <div className="mb-[14px]"><Badge>{catalogCategories.find(c => c.id === p.category)?.label}</Badge></div><p className="font-mono text-f12 text-ink-3">{p.manufacturer} · {p.selectionType}</p><h3 className="mt-[8px] text-f20 font-semibold"><Link href={p.path} className="hover:text-accent">{p.name}</Link></h3><p className="mb-[20px] mt-[10px] text-f14 text-ink-2">{p.summary}</p><div className="mt-auto"><Link href={p.path} className="mb-[16px] inline-block text-f14 font-semibold text-accent underline">View product & documents →</Link><div><SelectionButton productId={p.id} /></div></div>
      </article>)}</div> : <div className="rounded-card border border-line p-[28px]"><h3 className="text-f20 font-semibold">No families match these filters</h3><p className="my-[10px] text-ink-2">Try a broader material or application, or share your project brief for selection assistance.</p><Link className="text-accent underline" href="/products">Clear all filters</Link><span className="px-[10px]">·</span><Link className="text-accent underline" href="/request-quote">Ask for selection assistance</Link></div>}
      <p className="mt-[24px] text-f12 text-ink-3">Application tags indicate candidates for review. They do not establish project approval, performance equivalence or stock availability. Attachment components support compatible systems and are listed separately.</p>
    </Section></>;
}

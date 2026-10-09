import Link from "next/link";
import { Breadcrumbs, Section } from "@/components/ui";
import CatalogVisual from "@/components/catalog/CatalogVisual";
import SelectionButton from "@/components/catalog/SelectionButton";
import { catalogProducts, catalogCategories, catalogApplications, filterCatalog } from "@/content/data/catalog";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Architectural Panel Product Finder | Cladvera",
  description: "Explore architectural UHPC, metal composite, exterior HPL and custom GFRP panels. Filter by material or application and shortlist products for your project.",
  path: "/products",
});

const inputClass = "mt-[10px] min-h-[48px] w-full min-w-0 rounded-none border-0 border-b border-line-strong bg-transparent px-0 py-[12px] text-f14 font-normal normal-case tracking-normal text-ink transition-colors focus:border-accent";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const get = (key: string) => typeof params[key] === "string" ? params[key] as string : "";
  const filters = { q: get("q"), category: get("category"), application: get("application"), manufacturer: get("manufacturer") };
  const products = filterCatalog(filters);
  const hasFilters = Object.values(filters).some(Boolean);
  const activeFilters = [
    { key: "q", label: filters.q && `Search: ${filters.q}` },
    { key: "category", label: catalogCategories.find(category => category.id === filters.category)?.label || filters.category },
    { key: "application", label: catalogApplications.find(application => application.id === filters.application)?.label || filters.application },
    { key: "manufacturer", label: filters.manufacturer },
  ].filter(filter => filter.label);
  function withoutFilter(key: string) {
    const query = new URLSearchParams(Object.entries(filters).filter(([name, value]) => name !== key && value));
    return `/products${query.size ? `?${query}` : ""}#catalog-results`;
  }

  return (
    <>
      <header className="border-b border-line bg-paper">
        <div className="site-container pb-[48px] pt-[24px] md:pb-[72px] md:pt-[32px]">
          <Breadcrumbs items={[{ name: "Products", path: "/products" }]} />
          <div className="mt-[48px] grid gap-[36px] md:mt-[68px] lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)] lg:items-end lg:gap-[80px]">
            <div>
              <p className="eyebrow mb-[22px]">Cladvera / Material archive</p>
              <h1 className="text-[clamp(2.75rem,5.6vw,5rem)] font-medium leading-[1.02] tracking-[-0.055em]">Architectural panel <span className="editorial-serif block tracking-[-0.04em]">product finder</span></h1>
            </div>
            <div className="lg:pb-[6px]">
              <p className="max-w-[400px] text-f18 leading-[1.7] text-ink-2">A considered starting point for the building envelope. Explore facade panels, interior surfaces and custom architectural elements.</p>
              <Link href="/compare" className="mt-[28px] inline-flex items-center gap-[40px] border-b border-ink pb-[9px] text-f14 font-medium text-ink hover:border-accent hover:text-accent">
                Your material shortlist <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <Section>
        <nav aria-label="Browse material collections" className="mb-[52px] md:mb-[72px]">
          <p className="eyebrow mb-[24px]">Collection index</p>
          <div className="grid grid-cols-2 gap-x-[24px] gap-y-[24px] md:grid-cols-3 lg:grid-cols-6">
            {catalogCategories.map((category, index) => (
              <Link key={category.id} href={category.path} className="group flex flex-col border-t border-line-strong pt-[13px] hover:border-accent">
                <div className="mb-[16px] flex items-center justify-between font-mono text-[10px] text-ink-3"><span>{String(index + 1).padStart(2, "0")}</span><span aria-hidden="true" className="text-f16 text-accent transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">↗</span></div>
                <span className="max-w-[180px] text-f14 leading-[1.5] text-ink group-hover:text-accent">{category.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        <form key={JSON.stringify(filters)} action="/products#catalog-results" method="get" aria-label="Filter the material archive" className="border-y border-line-strong py-[28px] md:py-[32px]">
          <div className="mb-[28px] flex flex-wrap items-center justify-between gap-[12px]">
            <h2 className="text-f24 font-medium tracking-[-0.035em]">Find a material.</h2>
            <p className="font-mono text-[11px] uppercase tracking-[0.04em] text-ink-3">{catalogProducts.length} product families / {catalogCategories.length} collections</p>
          </div>
          <div className="grid gap-[24px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-[36px]">
            <label className="min-w-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
              Search products
              <input name="q" type="search" defaultValue={filters.q} placeholder="Material, family or supplier" className={inputClass} />
            </label>
            <label className="min-w-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
              Material / product role
              <select name="category" defaultValue={filters.category} className={inputClass}>
                <option value="">All materials & components</option>
                {catalogCategories.map(category => <option value={category.id} key={category.id}>{category.label}</option>)}
              </select>
            </label>
            <label className="min-w-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
              Application
              <select name="application" defaultValue={filters.application} className={inputClass}>
                <option value="">All applications</option>
                {catalogApplications.map(application => <option key={application.id} value={application.id}>{application.label}</option>)}
              </select>
            </label>
            <label className="min-w-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
              Manufacturer
              <select name="manufacturer" defaultValue={filters.manufacturer} className={inputClass}>
                <option value="">All manufacturers</option>
                {[...new Set(catalogProducts.map(product => product.manufacturer))].map(manufacturer => <option key={manufacturer}>{manufacturer}</option>)}
              </select>
            </label>
          </div>
          <div className="mt-[28px] flex flex-wrap items-center gap-[24px]">
            <button type="submit" className="inline-flex min-h-[46px] items-center gap-[40px] bg-ink px-[22px] py-[12px] text-f14 font-medium text-paper transition-colors hover:bg-accent">
              Find products <span aria-hidden="true">→</span>
            </button>
            <Link href="/products#catalog-results" className="inline-flex min-h-[44px] items-center text-f14 text-ink-2 underline underline-offset-4 hover:text-accent">Reset filters</Link>
            <p className="text-f12 text-ink-3 sm:ml-auto">Shortlist up to four products to compare.</p>
          </div>
        </form>

        <div id="catalog-results" className="mb-[32px] mt-[56px] md:mt-[80px]">
          <div className="flex flex-wrap items-end justify-between gap-[12px]">
            <h2 className="text-[30px] font-medium leading-[1.15] tracking-[-0.035em] md:text-[40px]">{hasFilters ? "Your selection" : "The product archive"} <span className="ml-[8px] align-top font-mono text-f12 text-accent">({products.length})</span></h2>
            <p className="text-f12 text-ink-3">Select a product to explore details & documents.</p>
          </div>
          {hasFilters && (
            <nav aria-label="Active filters" className="mt-[24px] flex flex-wrap items-center gap-[10px]">
              {activeFilters.map(filter => (
                <Link key={filter.key} href={withoutFilter(filter.key)} aria-label={`Remove filter: ${filter.label}`} className="inline-flex min-h-[44px] max-w-full items-center gap-[18px] border border-line-strong px-[14px] py-[10px] text-f12 text-ink-2 hover:border-accent hover:text-accent">
                  <span className="break-words [overflow-wrap:anywhere]">{filter.label}</span><span aria-hidden="true">×</span>
                </Link>
              ))}
              <Link href="/products#catalog-results" className="inline-flex min-h-[44px] items-center px-[6px] text-f12 text-ink-3 underline underline-offset-4 hover:text-accent">Clear all</Link>
            </nav>
          )}
        </div>

        {products.length ? (
          <div className="grid gap-x-[28px] gap-y-[56px] md:grid-cols-2 lg:grid-cols-3 lg:gap-x-[36px] lg:gap-y-[72px]">
            {products.map(product => {
              const category = catalogCategories.find(item => item.id === product.category);
              const archiveIndex = catalogProducts.findIndex(item => item.id === product.id) + 1;
              return (
                <article key={product.id} className="group flex min-w-0 flex-col border-t border-line-strong">
                  <div className="flex min-h-[46px] items-center justify-between gap-[12px] py-[12px]">
                    <span className="font-mono text-[10px] tracking-[0.08em] text-ink-3">CV / {String(archiveIndex).padStart(2, "0")}</span>
                    {category && <Link href={category.path} className="text-[10px] uppercase tracking-[0.05em] text-accent hover:underline">{category.label}</Link>}
                  </div>
                  <Link href={product.path} aria-label={`Explore ${product.name}`} className="block overflow-hidden">
                    <CatalogVisual product={product} />
                  </Link>
                  <div className="flex flex-1 flex-col pt-[24px]">
                    <p className="mb-[12px] font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">{product.manufacturer}</p>
                    <h3 className="max-w-[390px] text-[26px] font-medium leading-[1.15] tracking-[-0.035em]"><Link href={product.path} className="hover:text-accent">{product.name}</Link></h3>
                    <p className="mt-[10px] text-f12 text-ink-3">{product.selectionType}</p>
                    <p className="mb-[28px] mt-[16px] text-f14 leading-[1.7] text-ink-2">{product.summary}</p>
                    <div className="mt-auto border-t border-line pt-[18px]">
                      <Link href={product.path} className="mb-[20px] flex items-center justify-between gap-[12px] text-f14 font-medium text-ink hover:text-accent">
                        Product & documents <span aria-hidden="true" className="text-accent">↗</span>
                      </Link>
                      <SelectionButton productId={product.id} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="border-y border-line bg-paper-2 px-[24px] py-[56px] text-center md:py-[80px]">
            <p className="eyebrow mb-[18px]">Broaden your search</p>
            <h3 className="text-f32 font-medium tracking-[-0.03em]">No families match these filters</h3>
            <p className="mx-auto mb-[24px] mt-[12px] max-w-[540px] text-ink-2">Try a broader material or application, or share your project brief for selection assistance.</p>
            <div className="flex flex-wrap justify-center gap-[24px]">
              <Link className="text-f14 font-semibold text-accent underline underline-offset-4" href="/products#catalog-results">Clear all filters</Link>
              <Link className="text-f14 font-semibold text-accent underline underline-offset-4" href="/request-quote">Ask for selection assistance</Link>
            </div>
          </div>
        )}

        <p className="mt-[48px] max-w-[920px] border-t border-line pt-[22px] text-f12 text-ink-3">Application tags indicate candidates for review. They do not establish project approval, performance equivalence or stock availability. Attachment components support compatible systems and are listed separately.</p>
      </Section>

      <Section tone="muted">
        <div className="grid gap-[40px] lg:grid-cols-[1fr_1.4fr] lg:gap-[100px]">
          <div>
            <p className="eyebrow mb-[24px]">From selection to specification</p>
            <h2 className="text-[40px] font-medium leading-[1.08] tracking-[-0.045em] md:text-[52px]">Take a<br /><span className="editorial-serif">closer look.</span></h2>
            <p className="mt-[24px] max-w-[370px] text-f16 text-ink-2">Compare your material options, then bring the right questions to your project review.</p>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {[
              { href: "/applications", number: "01", title: "Explore architectural applications", body: "Find material candidates for facade, interior, transit and custom architectural projects." },
              { href: "/compare", number: "02", title: "Review your product shortlist", body: "Compare up to four selected products and identify what needs confirmation." },
              { href: "/technical-resources", number: "03", title: "Find technical resources", body: "Start with product documents, drawings and project-specific evidence." },
            ].map(item => (
              <Link key={item.href} href={item.href} className="group flex items-start gap-[24px] py-[28px]">
                <span className="pt-[3px] font-mono text-f12 text-accent">{item.number}</span>
                <div className="flex-1"><h3 className="text-f18 font-medium group-hover:text-accent">{item.title}</h3><p className="mt-[5px] text-f14 text-ink-2">{item.body}</p></div>
                <span aria-hidden="true" className="text-f20 text-accent">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

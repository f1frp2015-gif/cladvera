import Link from "next/link";
import { Breadcrumbs, Section } from "@/components/ui";
import CatalogVisual from "@/components/catalog/CatalogVisual";
import SelectionButton from "@/components/catalog/SelectionButton";
import JsonLd from "@/components/seo/JsonLd";
import { catalogProducts, catalogCategories, catalogApplications, filterCatalog } from "@/content/data/catalog";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const path = "/products";
const description = "Explore architectural UHPC, metal composite, exterior HPL and custom GFRP panels. Filter by material or application and shortlist products for your project.";

export const metadata = buildPageMetadata({
  title: "Architectural Panel Product Finder | Cladvera",
  description,
  path,
});

const inputClass = "mt-[7px] min-h-[46px] w-full min-w-0 rounded-none border border-line-strong bg-paper px-[11px] py-[10px] text-f14 font-normal normal-case tracking-normal text-ink transition-colors hover:border-ink focus:border-accent";

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
      <JsonLd data={buildWebPageSchema({ name: "Architectural panel product finder", description, path, type: "CollectionPage" })} />
      <header className="border-b border-line bg-paper">
        <div className="site-container pb-[32px] pt-[24px] md:pb-[40px] md:pt-[28px]">
          <Breadcrumbs items={[{ name: "Products", path: "/products" }]} />
          <div className="mt-[32px] grid gap-[24px] lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)] lg:items-end lg:gap-[64px]">
            <div>
              <p className="eyebrow mb-[16px]">Cladvera / Material archive</p>
              <h1 className="max-w-[760px] text-[clamp(2.5rem,4.9vw,4.5rem)] font-normal leading-[1.04] tracking-[-0.055em]">Architectural panel<br /><span className="editorial-serif">product finder.</span></h1>
            </div>
            <div className="lg:pb-[4px]">
              <p className="max-w-[400px] text-f16 leading-[1.65] text-ink-2">Find facade panels, interior surfaces and custom components. Review manufacturer information and shortlist up to four products.</p>
              <div className="mt-[20px] flex flex-wrap gap-x-[28px] gap-y-[12px]">
                <Link href="#archive-filters" className="inline-flex min-h-[32px] items-center gap-[16px] border-b border-line-strong text-f14 font-medium hover:border-accent hover:text-accent">Find a material <span aria-hidden="true">↓</span></Link>
                <Link href="/compare" className="inline-flex min-h-[32px] items-center gap-[16px] border-b border-line-strong text-f14 font-medium hover:border-accent hover:text-accent">Your shortlist <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="site-container py-[32px] md:py-[48px]">
        <div className="grid items-start gap-[36px] lg:grid-cols-[232px_minmax(0,1fr)] lg:gap-[36px] xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-[44px]">
          <aside id="archive-filters" aria-labelledby="filter-heading" className="lg:sticky lg:top-[108px] lg:max-h-[calc(100dvh-132px)] lg:overflow-y-auto lg:overscroll-contain">
            <form key={JSON.stringify(filters)} action="/products#catalog-results" method="get" aria-label="Filter the material archive" className="border-t-2 border-ink bg-paper-2 p-[20px]">
              <div className="mb-[22px] flex items-baseline justify-between gap-[12px]">
                <h2 id="filter-heading" className="text-f20 font-medium tracking-[-0.035em]">Refine archive</h2>
                <span className="font-mono text-[10px] text-ink-3">{catalogProducts.length} entries</span>
              </div>
              <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-1">
                <label className="min-w-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-2">
                  Search products
                  <input name="q" type="search" defaultValue={filters.q} placeholder="Material or manufacturer" className={inputClass} />
                </label>
                <label className="min-w-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-2">
                  Material / product role
                  <select name="category" defaultValue={filters.category} className={inputClass}>
                    <option value="">All materials</option>
                    {catalogCategories.map(category => <option value={category.id} key={category.id}>{category.label}</option>)}
                  </select>
                </label>
                <label className="min-w-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-2">
                  Application
                  <select name="application" defaultValue={filters.application} className={inputClass}>
                    <option value="">All applications</option>
                    {catalogApplications.map(application => <option key={application.id} value={application.id}>{application.label}</option>)}
                  </select>
                </label>
                <label className="min-w-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-2">
                  Manufacturer
                  <select name="manufacturer" defaultValue={filters.manufacturer} className={inputClass}>
                    <option value="">All manufacturers</option>
                    {[...new Set(catalogProducts.map(product => product.manufacturer))].map(manufacturer => <option key={manufacturer}>{manufacturer}</option>)}
                  </select>
                </label>
              </div>
              <div className="mt-[24px] flex flex-wrap items-center gap-x-[24px] gap-y-[8px] lg:flex-col lg:items-stretch">
                <button type="submit" className="inline-flex min-h-[46px] items-center justify-between gap-[28px] bg-ink px-[16px] py-[12px] text-f14 font-medium text-paper transition-colors hover:bg-accent">
                  Find products <span aria-hidden="true">→</span>
                </button>
                <Link href="/products#catalog-results" className="inline-flex min-h-[44px] items-center justify-center text-f12 text-ink-2 underline underline-offset-4 hover:text-accent">Reset filters</Link>
              </div>
            </form>
            <p className="mt-[16px] max-w-[460px] text-f12 leading-[1.6] text-ink-3">Open a product for its construction, source information and documents to confirm.</p>
            <p className="mt-[16px] max-w-[460px] border-t border-line pt-[16px] text-f12 leading-[1.7] text-ink-2">Choosing between ACM, HPL, UHPC and GFRP? <Link href="/guides/facade-materials#material-comparison" className="text-accent underline underline-offset-4">Compare facade material types</Link> before shortlisting.</p>
          </aside>

          <section id="catalog-results" aria-labelledby="archive-heading" className="min-w-0">
            <div className="mb-[28px]">
              <div className="flex flex-wrap items-baseline justify-between gap-[12px] border-b border-line pb-[20px]">
                <h2 id="archive-heading" className="text-[28px] font-normal leading-[1.15] tracking-[-0.04em] md:text-[34px]">{hasFilters ? "Filtered archive" : "Materials & components"}</h2>
                <p className="font-mono text-[11px] text-ink-3"><span className="text-ink">{String(products.length).padStart(2, "0")}</span> / {String(catalogProducts.length).padStart(2, "0")} families</p>
              </div>
              {hasFilters && (
                <nav aria-label="Active filters" className="mt-[18px] flex flex-wrap items-center gap-[8px]">
                  {activeFilters.map(filter => (
                    <Link key={filter.key} href={withoutFilter(filter.key)} aria-label={`Remove filter: ${filter.label}`} className="inline-flex min-h-[44px] max-w-full items-center gap-[14px] border border-line-strong px-[12px] py-[9px] text-f12 text-ink-2 hover:border-accent hover:text-accent">
                      <span className="break-words [overflow-wrap:anywhere]">{filter.label}</span><span aria-hidden="true">×</span>
                    </Link>
                  ))}
                  <Link href="/products#catalog-results" className="inline-flex min-h-[44px] items-center px-[6px] text-f12 text-ink-3 underline underline-offset-4 hover:text-accent">Clear all</Link>
                </nav>
              )}
            </div>

            {products.length ? (
              <div className="grid gap-x-[24px] gap-y-[44px] md:grid-cols-2 xl:grid-cols-3 xl:gap-y-[56px]">
                {products.map(product => {
                  const category = catalogCategories.find(item => item.id === product.category);
                  const archiveIndex = catalogProducts.findIndex(item => item.id === product.id) + 1;
                  return (
                    <article key={product.id} className="group flex min-w-0 flex-col">
                      <div className="flex min-h-[56px] items-start justify-between gap-[16px] border-t border-ink py-[12px]">
                        <span className="font-mono text-[20px] leading-none tracking-[-0.06em] text-ink">{String(archiveIndex).padStart(2, "0")}</span>
                        {category && <Link href={category.path} className="max-w-[175px] text-right font-mono text-[10px] leading-[1.5] text-accent hover:underline">{category.label}</Link>}
                      </div>
                      <Link href={product.path} aria-label={`Explore ${product.name}`} className="block overflow-hidden">
                        <CatalogVisual product={product} sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 46vw, (max-width: 1279px) 32vw, 330px" />
                      </Link>
                      <div className="flex flex-1 flex-col pt-[20px]">
                        <p className="mb-[9px] font-mono text-[10px] uppercase leading-[1.5] tracking-[0.06em] text-ink-3">{product.manufacturer}</p>
                        <h3 className="text-[25px] font-normal leading-[1.15] tracking-[-0.04em]"><Link href={product.path} className="hover:text-accent">{product.name}</Link></h3>
                        <p className="mt-[8px] text-f12 text-ink-3">{product.selectionType}</p>
                        <p className="mb-[24px] mt-[14px] text-f14 leading-[1.65] text-ink-2">{product.summary}</p>
                        <div className="mt-auto border-t border-line pt-[15px]">
                          <Link href={product.path} className="mb-[15px] flex min-h-[28px] items-center justify-between gap-[12px] text-f14 font-medium text-ink hover:text-accent">
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
              <div className="border-y border-line bg-paper-2 px-[24px] py-[56px] md:px-[40px] md:py-[80px]">
                <p className="eyebrow mb-[18px]">Broaden your search</p>
                <h3 className="max-w-[480px] text-f32 font-normal tracking-[-0.04em]">No families match these filters</h3>
                <p className="mb-[28px] mt-[12px] max-w-[520px] text-ink-2">Try a broader material or application, or share your project brief for selection assistance.</p>
                <div className="flex flex-wrap gap-x-[28px] gap-y-[12px]">
                  <Link className="inline-flex min-h-[44px] items-center border-b border-ink text-f14 font-medium hover:border-accent hover:text-accent" href="/products#catalog-results">Clear all filters →</Link>
                  <Link className="inline-flex min-h-[44px] items-center text-f14 text-ink-2 underline underline-offset-4 hover:text-accent" href="/request-quote">Ask for selection assistance</Link>
                </div>
              </div>
            )}

            <p className="mt-[40px] border-t border-line pt-[20px] text-f12 leading-[1.6] text-ink-3">Application tags indicate candidates for review. They do not establish project approval, performance equivalence or stock availability. Attachment components support compatible systems and are listed separately.</p>
          </section>
        </div>
      </div>

      <Section tone="muted">
        <nav aria-label="Browse material collections">
          <div className="mb-[32px] flex flex-wrap items-baseline justify-between gap-[16px]">
            <h2 className="text-[30px] font-normal tracking-[-0.04em] md:text-[40px]">Explore a material collection.</h2>
            <p className="eyebrow">{String(catalogCategories.length).padStart(2, "0")} collections</p>
          </div>
          <div className="grid gap-x-[32px] md:grid-cols-2 lg:grid-cols-3">
            {catalogCategories.map((category, index) => (
              <Link key={category.id} href={category.path} className="group flex items-start gap-[16px] border-t border-line-strong py-[24px] hover:border-accent">
                <span className="pt-[3px] font-mono text-[11px] text-accent">{String(index + 1).padStart(2, "0")}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-f18 font-medium leading-[1.3] group-hover:text-accent">{category.label}</h3>
                  <p className="mt-[9px] text-f14 text-ink-2">{category.description}</p>
                </div>
                <span aria-hidden="true" className="text-f18 text-accent">↗</span>
              </Link>
            ))}
          </div>
        </nav>
      </Section>

      <Section>
        <div className="grid gap-[28px] lg:grid-cols-[0.8fr_1.5fr] lg:gap-[88px]">
          <div>
            <p className="eyebrow mb-[16px]">From selection to specification</p>
            <h2 className="text-[36px] font-normal leading-[1.12] tracking-[-0.045em] md:text-[46px]">Plan your<br /><span className="editorial-serif">next step.</span></h2>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {[
              { href: "/applications", number: "01", title: "Explore architectural applications", body: "Find material candidates for facade, interior, transit and custom architectural projects." },
              { href: "/compare", number: "02", title: "Review your product shortlist", body: "Compare up to four selected products and identify what needs confirmation." },
              { href: "/technical-resources", number: "03", title: "Find technical resources", body: "Start with product documents, drawings and project-specific evidence." },
            ].map(item => (
              <Link key={item.href} href={item.href} className="group flex items-start gap-[20px] py-[24px]">
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

"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import CatalogVisual from "@/components/catalog/CatalogVisual";
import { catalogProducts, catalogCategories, catalogApplications, MAX_SELECTION, type CatalogProduct } from "@/content/data/catalog";
import { useSelection } from "@/lib/product-selection";

const primaryAction = "inline-flex min-h-[48px] items-center justify-center gap-[28px] bg-ink px-[22px] py-[12px] text-f14 font-medium text-paper transition-colors hover:bg-accent";
const secondaryAction = "inline-flex min-h-[48px] items-center justify-center gap-[16px] border border-line-strong px-[20px] py-[12px] text-f14 font-medium transition-colors hover:border-ink hover:bg-paper-2";

const factors = [
  { label: "Material / role", value: (product: CatalogProduct) => `${catalogCategories.find(category => category.id === product.category)?.label ?? product.category} · ${product.selectionType}` },
  { label: "Intended applications", value: (product: CatalogProduct) => product.applications.map(application => catalogApplications.find(item => item.id === application)?.label ?? application).join(", ") },
  { label: "Construction", value: (product: CatalogProduct) => product.construction },
  { label: "Documentation", value: (product: CatalogProduct) => product.documentation },
  { label: "Confirm for your project", value: (product: CatalogProduct) => product.confirm },
];

function MaterialHeading({ product, onRemove }: { product: CatalogProduct; onRemove: (product: CatalogProduct) => void }) {
  const archiveIndex = catalogProducts.findIndex(item => item.id === product.id) + 1;
  return (
    <div className="group max-w-[420px]">
      <div className="mb-[14px] flex items-center justify-between gap-[12px]">
        <span className="font-mono text-[10px] font-normal tracking-[0.08em] text-ink-3">CV / {String(archiveIndex).padStart(2, "0")}</span>
        <button type="button" onClick={() => onRemove(product)} aria-label={`Remove ${product.name} from comparison`} className="inline-flex min-h-[44px] items-center gap-[10px] px-[4px] text-f12 font-normal text-ink-2 underline underline-offset-4 hover:text-accent">
          Remove <span aria-hidden="true">×</span>
        </button>
      </div>
      <Link href={product.path} aria-label={`Explore ${product.name}`} className="block">
        <CatalogVisual product={product} className="h-[220px] md:h-[180px]" />
      </Link>
      <p className="mb-[10px] mt-[20px] font-mono text-[10px] font-normal uppercase tracking-[0.06em] text-ink-3">{product.manufacturer}</p>
      <h3 className="text-f24 font-medium leading-[1.2] tracking-[-0.035em]">
        <Link href={product.path} className="hover:text-accent">{product.name}</Link>
      </h3>
      <Link href={product.path} className="mt-[12px] inline-flex min-h-[44px] items-center gap-[20px] text-f12 font-medium text-accent hover:underline">
        Product & documents <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}

export default function CompareProducts({ sharedIds }: { sharedIds?: string[] }) {
  const { ids: savedIds, setSelection } = useSelection();
  const [shared, setShared] = useState(sharedIds);
  const [message, setMessage] = useState("");
  const [copyUrl, setCopyUrl] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isShared = shared !== undefined;
  const ids = shared ?? savedIds;
  const products = ids.flatMap(id => catalogProducts.filter(product => product.id === id));
  const query = encodeURIComponent(ids.join(","));

  function focusHeading() {
    requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
  }

  function update(next: string[], announcement: string) {
    // A shared URL is an editable view. Only the explicit Save action may
    // replace the viewer's existing browser shortlist.
    if (isShared) setShared(next);
    else setSelection(next);
    setCopyUrl("");
    setMessage(announcement);
    focusHeading();
  }

  function remove(product: CatalogProduct) {
    const next = ids.filter(id => id !== product.id);
    update(next, `${product.name} removed. ${next.length} ${next.length === 1 ? "product remains" : "products remain"}${isShared ? " in this shared selection. Your saved shortlist is unchanged." : " in your shortlist."}`);
  }

  function saveShared() {
    setSelection(ids);
    setShared(undefined);
    setCopyUrl("");
    setMessage("This selection is now saved as your browser shortlist.");
    focusHeading();
  }

  async function copySelectionLink() {
    const url = `${window.location.origin}/compare?products=${query}`;
    setCopyUrl("");
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Selection link copied. Share it with your project team.");
    } catch {
      setCopyUrl(url);
      setMessage("Select and copy the selection link below.");
    }
  }

  return (
    <div>
      {isShared && (
        <aside aria-label="Shared selection" className="mb-[44px] grid gap-[22px] border-y border-line-strong bg-paper-2 px-[22px] py-[24px] lg:grid-cols-[1fr_auto] lg:items-center lg:gap-[40px]">
          <div>
            <p className="eyebrow mb-[8px]">Shared material selection</p>
            <p className="max-w-[650px] text-f14 text-ink-2">Changes stay in this view until you save. Saving replaces your current browser shortlist.</p>
          </div>
          <div className="flex flex-wrap items-center gap-[20px]">
            <button type="button" className={primaryAction} onClick={saveShared}>Save this selection <span aria-hidden="true">↗</span></button>
            <button type="button" className="min-h-[44px] text-f14 text-ink-2 underline underline-offset-4 hover:text-accent" onClick={() => { setShared(undefined); setCopyUrl(""); setMessage("Showing your saved browser shortlist."); focusHeading(); }}>View saved shortlist</button>
          </div>
        </aside>
      )}

      <div className="mb-[24px] flex flex-wrap items-end justify-between gap-[18px]">
        <div>
          <p className="eyebrow mb-[14px]">Material review / {isShared ? "Shared selection" : "Your shortlist"}</p>
          <h2 ref={headingRef} tabIndex={-1} className="text-[32px] font-normal leading-[1.1] tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent md:text-[42px]">
            {products.length ? "Your material selection" : "Start with a material."}
          </h2>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">{products.length} / {MAX_SELECTION} product families</p>
      </div>

      <p className="mb-[28px] max-w-[820px] text-f14 leading-[1.7] text-ink-2">Compare construction, application and documentation. These families are candidates for review; performance equivalence and assembly compatibility require project evidence.</p>

      <div role="status" aria-atomic="true" className="text-f14 text-accent">
        {message && <p className="mb-[24px] border-l-2 border-accent pl-[14px]">{message}</p>}
      </div>
      {copyUrl && (
        <div className="mb-[28px] max-w-[840px]">
          <label htmlFor="selection-share-link" className="mb-[8px] block text-f12 font-medium">Selection link</label>
          <input id="selection-share-link" type="text" readOnly value={copyUrl} onFocus={event => event.currentTarget.select()} className="min-h-[48px] w-full border border-line-strong bg-paper-2 px-[14px] py-[10px] text-f14" />
        </div>
      )}

      {products.length === 0 ? (
        <div className="grid gap-[28px] border-y border-line-strong py-[36px] md:grid-cols-[96px_1fr] md:gap-[40px] md:py-[48px]">
          <span aria-hidden="true" className="font-mono text-[48px] leading-none tracking-[-0.05em] text-line-strong">00</span>
          <div>
            <h3 className="text-f24 font-medium tracking-[-0.03em]">{isShared ? "This shared selection is empty." : "Make room for the right materials."}</h3>
            <p className="mb-[24px] mt-[12px] max-w-[610px] text-f16 text-ink-2">{isShared ? "View your saved shortlist above, or explore the product archive to build a new selection." : "Add up to four candidates from the product finder. Compare them here, then carry your selection into a sample or project request."}</p>
            <Link href="/products" className={primaryAction}>Explore the product archive <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-[36px] flex flex-wrap items-center gap-[12px]">
            <Link className={primaryAction} href={`/request-quote?products=${query}`}>Request a project quote <span aria-hidden="true">↗</span></Link>
            <Link className={secondaryAction} href={`/samples?products=${query}`}>Request samples</Link>
            <button type="button" className={secondaryAction} onClick={copySelectionLink}>Copy selection link</button>
            <button type="button" className="min-h-[44px] px-[8px] text-f12 text-ink-3 underline underline-offset-4 hover:text-accent lg:ml-auto" onClick={() => update([], isShared ? "Shared selection cleared. Your saved shortlist is unchanged." : "Your browser shortlist is cleared.")}>{isShared ? "Clear shared selection" : "Clear shortlist"}</button>
          </div>

          <p className="mb-[20px] border-t border-line pt-[16px] font-mono text-[11px] text-ink-3 md:hidden">Read each material’s selection factors below.</p>
          <div className="grid gap-[48px] md:hidden">
            {products.map(product => (
              <article key={product.id} className="border-t border-line-strong pt-[2px]">
                <MaterialHeading product={product} onRemove={remove} />
                <dl className="mt-[16px] divide-y divide-line border-y border-line">
                  {factors.map(factor => (
                    <div key={factor.label} className="py-[18px]">
                      <dt className="mb-[8px] font-mono text-[10px] uppercase tracking-[0.07em] text-ink-3">{factor.label}</dt>
                      <dd className="text-f14 leading-[1.7] text-ink-2">{factor.value(product)}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>

          <div className="hidden md:block">
            <p id="comparison-scroll-hint" className="mb-[16px] flex flex-wrap items-center justify-between gap-[12px] font-mono text-[11px] text-ink-3">
              <span>Read across to compare each material.</span>
              {products.length > 2 && <span>Scroll horizontally if needed <span aria-hidden="true">↔</span></span>}
            </p>
            <div className="overflow-x-auto border-y border-line-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent" role="region" aria-label="Product comparison" aria-describedby="comparison-scroll-hint" tabIndex={0}>
              <table className="w-full table-fixed border-collapse text-left text-f14" style={{ minWidth: `${176 + products.length * 248}px` }}>
                <caption className="sr-only">Shortlisted product construction, application and document comparison</caption>
                <colgroup><col style={{ width: 176 }} />{products.map(product => <col key={product.id} />)}</colgroup>
                <thead>
                  <tr>
                    <th scope="col" className="sticky left-0 z-10 bg-paper px-[16px] py-[28px] align-bottom font-mono text-[10px] font-normal uppercase tracking-[0.08em] text-ink-3">Selection factors</th>
                    {products.map(product => (
                      <th key={product.id} scope="col" className="border-l border-line px-[20px] pb-[24px] pt-[2px] align-top">
                        <MaterialHeading product={product} onRemove={remove} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {factors.map(factor => (
                    <tr key={factor.label} className="border-t border-line">
                      <th scope="row" className="sticky left-0 z-10 bg-paper px-[16px] py-[24px] align-top text-f12 font-medium text-ink">{factor.label}</th>
                      {products.map(product => <td key={product.id} className="border-l border-line px-[20px] py-[24px] align-top text-f14 leading-[1.7] text-ink-2">{factor.value(product)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-[32px] flex flex-wrap items-center justify-between gap-[24px]">
            <Link href="/products" className="inline-flex min-h-[44px] items-center gap-[32px] border-b border-line-strong text-f14 font-medium hover:border-accent hover:text-accent">Explore more materials <span aria-hidden="true">↗</span></Link>
            <Link href={`/request-quote?products=${query}&intent=documents`} className="inline-flex min-h-[44px] items-center gap-[24px] text-f14 text-ink-2 hover:text-accent">Request technical documents <span aria-hidden="true">↗</span></Link>
          </div>
        </>
      )}
    </div>
  );
}

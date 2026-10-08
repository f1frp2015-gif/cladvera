"use client";
import Link from "next/link";
import { useState } from "react";
import { catalogProducts, catalogCategories, catalogApplications } from "@/content/data/catalog";
import { useSelection } from "@/lib/product-selection";
export default function CompareProducts({ sharedIds }: { sharedIds?: string[] }) {
  const { ids: savedIds, setSelection } = useSelection();
  const [shared, setShared] = useState(sharedIds);
  const [message, setMessage] = useState("");
  const ids = shared ?? savedIds;
  const products = ids.flatMap(id => catalogProducts.filter(p => p.id === id));
  function update(next: string[]) { setSelection(next); setShared(undefined); }
  const query = encodeURIComponent(ids.join(","));
  const rows = [
    { label: "Material / role", value: (p: typeof products[number]) => `${catalogCategories.find(c => c.id === p.category)?.label} · ${p.selectionType}` },
    { label: "Intended applications", value: (p: typeof products[number]) => p.applications.map(a => catalogApplications.find(item => item.id === a)?.label).join(", ") },
    { label: "Construction", value: (p: typeof products[number]) => p.construction },
    { label: "Documentation", value: (p: typeof products[number]) => p.documentation },
    { label: "Confirm for your project", value: (p: typeof products[number]) => p.confirm },
  ];
  return <div>
    {shared !== undefined && <div className="mb-[20px] rounded-card border border-line bg-paper-2 p-[16px]"><p className="text-f14">You are viewing a shared selection. Save it to replace your current shortlist.</p><button type="button" className="mt-[8px] font-semibold text-accent underline" onClick={() => { update(ids); setMessage("Shared selection saved on this browser."); }}>Save this selection</button></div>}
    {products.length === 0 ? <div className="rounded-card border border-line p-[28px]"><h2 className="text-f24 font-semibold">Start with a product family</h2><p className="mt-[8px] text-ink-2">Add up to four candidates from the product finder. Your selection stays on this browser and can travel with a project request.</p><Link href="/products" className="mt-[16px] inline-block font-semibold text-accent underline">Find products →</Link></div> : <>
      <div className="mb-[20px] flex flex-wrap gap-[12px]">
        <Link className="rounded-control bg-accent px-[16px] py-[10px] font-semibold text-paper" href={`/request-quote?products=${query}`}>Request a quote for this selection</Link>
        <Link className="rounded-control border border-line px-[16px] py-[10px]" href={`/samples?products=${query}`}>Request samples</Link>
        <button className="rounded-control border border-line px-[16px] py-[10px]" onClick={async () => { const url = `${window.location.origin}/compare?products=${query}`; try { await navigator.clipboard.writeText(url); setMessage("Selection link copied."); } catch { setMessage(`Copy this link: ${url}`); } }}>Copy selection link</button>
        <button className="text-f14 text-ink-2 underline" onClick={() => update([])}>Clear shortlist</button>
      </div>
      <p className="mb-[14px] text-f14 text-ink-2">Compare selection factors. These families are candidates for review; performance equivalence and assembly compatibility require project evidence.</p>
      <div className="overflow-x-auto rounded-card border border-line" role="region" aria-label="Product comparison" tabIndex={0}>
        <table className="w-full min-w-[640px] text-left text-f14">
          <caption className="sr-only">Shortlisted product construction, application and document comparison</caption>
          <thead className="bg-paper-2"><tr><th className="min-w-[160px] p-[16px]" scope="col">Selection factors</th>{products.map(p => <th key={p.id} className="min-w-[250px] max-w-[340px] p-[16px] align-top" scope="col"><span className="block text-f12 font-normal text-ink-3">{p.manufacturer}</span><Link href={p.path} className="mt-[6px] block text-f18 text-accent hover:underline">{p.name}</Link><button className="mt-[12px] text-f12 font-normal underline" aria-label={`Remove ${p.name}`} onClick={() => update(ids.filter(id => id !== p.id))}>Remove</button></th>)}</tr></thead>
          <tbody>{rows.map(row => <tr key={row.label} className="border-t border-line"><th scope="row" className="bg-paper-2 p-[16px] align-top font-medium">{row.label}</th>{products.map(p => <td key={p.id} className="p-[16px] align-top text-ink-2">{row.value(p)}</td>)}</tr>)}</tbody>
        </table>
      </div><Link href="/products" className="mt-[20px] inline-block font-semibold text-accent underline">Add or explore more products →</Link>
    </>}
    <p className="mt-[12px] break-all text-f14 text-accent" role="status">{message}</p>
  </div>;
}

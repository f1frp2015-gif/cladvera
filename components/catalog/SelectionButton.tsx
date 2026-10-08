"use client";
import { MAX_SELECTION } from "@/content/data/catalog";
import { useSelection } from "@/lib/product-selection";
export default function SelectionButton({ productId }: { productId: string }) {
  const { ids, setSelection } = useSelection();
  const selected = ids.includes(productId);
  const full = !selected && ids.length >= MAX_SELECTION;
  return <button type="button" aria-pressed={selected} disabled={full} onClick={() => setSelection(selected ? ids.filter(id => id !== productId) : [...ids, productId])} className="rounded-control border border-line-strong px-[14px] py-[10px] text-f14 font-semibold hover:bg-paper-2 disabled:cursor-not-allowed disabled:opacity-60">{selected ? "✓ In shortlist · remove" : full ? "Shortlist full (4)" : "+ Add to shortlist"}</button>;
}

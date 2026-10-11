"use client";
import { findCatalogProduct, MAX_SELECTION } from "@/content/data/catalog";
import { useSelection } from "@/lib/product-selection";
export default function SelectionButton({ productId }: { productId: string }) {
  const { ids, setSelection } = useSelection();
  const selected = ids.includes(productId);
  const full = !selected && ids.length >= MAX_SELECTION;
  const name = findCatalogProduct(productId)?.name || "this product";
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={selected ? `Remove ${name} from shortlist` : full ? `Shortlist full (${MAX_SELECTION} products): ${name}` : `Add ${name} to shortlist`}
      disabled={full}
      onClick={() => setSelection(selected ? ids.filter(id => id !== productId) : [...ids, productId])}
      className={`inline-flex min-h-[46px] items-center justify-center gap-[12px] border px-[16px] py-[10px] text-f14 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${selected ? "border-ink bg-ink text-paper hover:bg-accent" : "border-line-strong hover:border-ink hover:bg-paper-2"}`}
    >
      <span aria-hidden="true">{selected ? "✓" : "+"}</span>
      {selected ? "Shortlisted · remove" : full ? `Shortlist full (${MAX_SELECTION})` : "Add to shortlist"}
    </button>
  );
}

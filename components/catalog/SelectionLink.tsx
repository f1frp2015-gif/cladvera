"use client";
import Link from "next/link";
import { useSelection } from "@/lib/product-selection";
export default function SelectionLink() {
  const { ids } = useSelection();
  return <Link href="/compare" className="whitespace-nowrap rounded-control border border-line px-[12px] py-[8px] text-f14 font-medium" aria-label={`Compare shortlist, ${ids.length} products`}>Shortlist <span aria-live="polite">({ids.length})</span></Link>;
}

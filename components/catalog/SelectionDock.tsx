"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAX_SELECTION } from "@/content/data/catalog";
import { useSelection } from "@/lib/product-selection";

export default function SelectionDock() {
  const pathname = usePathname();
  const { ids } = useSelection();
  const browsing = pathname === "/products" || pathname === "/applications" || pathname === "/architects" || pathname.startsWith("/materials/") || pathname.startsWith("/suppliers/");
  if (!browsing || ids.length === 0) return null;

  return (
    <>
      <div aria-hidden="true" className="h-[calc(88px+env(safe-area-inset-bottom))]" />
      <aside aria-label="Your material shortlist" className="fixed inset-x-0 bottom-0 z-40 border-t border-paper/20 bg-slate pb-[env(safe-area-inset-bottom)] text-paper">
        <div className="site-container flex min-h-[80px] items-center justify-between gap-[16px] py-[12px]">
          <div className="min-w-0">
            <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-paper/70 sm:text-[10px]">Material shortlist</p>
            <p className="mt-[3px] text-f14" role="status" aria-atomic="true">{ids.length} of {MAX_SELECTION} selected<span className="ml-[16px] hidden text-paper/70 lg:inline">Ready for a closer look.</span></p>
          </div>
          <div className="flex shrink-0 items-center gap-[24px]">
            <Link href={`/samples?products=${encodeURIComponent(ids.join(","))}`} className="hidden min-h-[44px] items-center border-b border-paper/40 text-f14 hover:border-paper sm:inline-flex">Request samples</Link>
            <Link href="/compare" className="inline-flex min-h-[46px] items-center gap-[24px] bg-paper px-[16px] py-[10px] text-f14 font-medium text-ink hover:bg-paper-3">Compare <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </aside>
    </>
  );
}

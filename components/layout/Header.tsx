"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { mainNav, type NavGroup } from "@/content/data/navigation";
import SelectionLink from "@/components/catalog/SelectionLink";

function ProductNavigation({ group, active }: { group: NavGroup; active: boolean }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={event => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="product-category-nav"
        className={`flex items-center gap-[6px] rounded-control px-[10px] py-[8px] text-f14 font-medium hover:bg-paper-2 ${active || open ? "text-accent" : "text-ink-2"}`}
        onClick={() => setOpen(current => !current)}
      >
        {group.label}
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" className={`transition-transform ${open ? "rotate-180" : ""}`}><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {open && (
        <div id="product-category-nav" className="absolute left-0 top-[calc(100%+12px)] w-[680px] rounded-card border border-line bg-paper p-[16px] shadow-pop">
          <p className="mb-[10px] px-[12px] font-mono text-f12 uppercase tracking-[0.08em] text-ink-3">Explore by product category</p>
          <ul className="grid grid-cols-2 gap-[4px]">
            {group.links.map((link, index) => (
              <li key={link.href} className={index === 0 ? "col-span-2 mb-[4px] border-b border-line pb-[8px]" : ""}>
                <Link href={link.href} onClick={() => setOpen(false)} className="block rounded-control px-[12px] py-[12px] hover:bg-paper-2 focus-visible:bg-paper-2">
                  <span className="block text-f16 font-semibold">{link.label}<span aria-hidden="true" className="ml-[6px] text-accent">→</span></span>
                  <span className="mt-[4px] block text-f12 text-ink-3">{link.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;
  const productsActive = pathname === "/products" || pathname.startsWith("/materials/") || pathname.startsWith("/suppliers/");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="site-container flex min-h-[72px] items-center justify-between gap-[12px]">
        <Link href="/" className="flex items-center gap-[10px] text-f20 font-semibold tracking-tight"><span aria-hidden="true" className="h-[22px] w-[22px] rounded-[4px] bg-accent" />Cladvera</Link>
        <nav aria-label="Main" className="hidden items-center gap-[4px] xl:flex">
          {mainNav.map(item => item.links.length > 0 ? (
            <ProductNavigation key={`${pathname}-${item.label}`} group={item} active={productsActive} />
          ) : (
            <Link key={item.href} href={item.href!} aria-current={pathname === item.href ? "page" : undefined} className={`rounded-control px-[10px] py-[8px] text-f14 font-medium hover:bg-paper-2 ${pathname === item.href ? "text-accent" : "text-ink-2"}`}>{item.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-[10px]">
          <div className="hidden sm:block"><SelectionLink /></div>
          <Link href="/request-quote" className="hidden rounded-control bg-accent px-[14px] py-[8px] text-f14 font-semibold text-paper hover:bg-accent-hover xl:block">Request a quote</Link>
          <button ref={mobileButtonRef} type="button" className="rounded-control border border-line px-[12px] py-[8px] text-f14 xl:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpenOnPath(open ? null : pathname)}>{open ? "Close" : "Menu"}</button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile main" className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-line bg-paper xl:hidden" onKeyDown={event => { if (event.key === "Escape") { event.preventDefault(); setOpenOnPath(null); mobileButtonRef.current?.focus(); } }}>
          <div className="site-container grid gap-[8px] py-[16px]">
            {mainNav.map(item => item.links.length > 0 ? (
              <div key={item.label} className="border-b border-line pb-[12px]">
                <p className="px-[10px] py-[8px] text-f16 font-semibold">{item.label}</p>
                <ul className="ml-[10px] border-l border-line pl-[10px]">
                  {item.links.map(link => (
                    <li key={link.href}><Link href={link.href} onClick={() => setOpenOnPath(null)} className="block rounded-control px-[10px] py-[11px] text-f14 hover:bg-paper-2">{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link key={item.href} href={item.href!} onClick={() => setOpenOnPath(null)} className="rounded-control px-[10px] py-[10px] text-f16 font-medium hover:bg-paper-2">{item.label}</Link>
            ))}
            <Link href="/compare" onClick={() => setOpenOnPath(null)} className="px-[10px] py-[10px] text-f16">Compare shortlist</Link>
            <Link href="/samples" onClick={() => setOpenOnPath(null)} className="px-[10px] py-[10px] text-f16">Request samples</Link>
            <Link href="/request-quote" onClick={() => setOpenOnPath(null)} className="rounded-control bg-accent px-[14px] py-[10px] font-semibold text-paper">Request a quote</Link>
          </div>
        </nav>
      )}
    </header>
  );
}

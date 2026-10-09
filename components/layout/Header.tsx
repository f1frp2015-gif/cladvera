"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { mainNav, type NavGroup } from "@/content/data/navigation";
import SelectionLink from "@/components/catalog/SelectionLink";
import BrandMark from "@/components/layout/BrandMark";

function ProductNavigation({ group, active }: { group: NavGroup; active: boolean }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

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
        aria-controls={menuId}
        className={`flex min-h-[44px] items-center gap-[6px] px-[9px] py-[10px] text-[13px] font-medium transition-colors hover:text-accent ${active || open ? "text-accent" : "text-ink-2"}`}
        onClick={() => setOpen(current => !current)}
      >
        {group.label}
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" className={`transition-transform ${open ? "rotate-180" : ""}`}><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {open && (
        <div id={menuId} className="absolute left-0 top-[calc(100%+18px)] w-[720px] border border-line-strong border-t-2 border-t-ink bg-paper p-[28px]">
          <div className="mb-[12px] flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
            <p>Material index</p>
            <span>Cladvera / Collections</span>
          </div>
          <ul className="grid grid-cols-2 gap-x-[24px]">
            {group.links.map((link, index) => (
              <li key={link.href} className={index === 0 ? "col-span-2 mb-[4px] border-b border-line pb-[12px]" : "border-b border-line"}>
                <Link href={link.href} onClick={() => setOpen(false)} className="group flex h-full items-start gap-[14px] py-[18px] pr-[8px] transition-colors hover:text-accent focus-visible:bg-paper-2">
                  {index > 0 && <span aria-hidden="true" className="pt-[3px] font-mono text-[10px] text-ink-3">0{index}</span>}
                  <span className="flex-1">
                    <span className={`block ${index === 0 ? "text-[30px] font-normal tracking-[-0.045em]" : "text-f16 font-medium"}`}>{link.label}</span>
                    {link.description && <span className="mt-[5px] block text-f12 leading-[1.6] text-ink-3">{link.description}</span>}
                  </span>
                  <span aria-hidden="true" className="mt-[2px] text-ink-3 transition-transform group-hover:translate-x-[3px] group-hover:text-accent">↗</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-[20px] flex items-center justify-between gap-[20px] text-f12">
            <span className="text-ink-3">Choose a material. Define the details.</span>
            <Link href="/compare" onClick={() => setOpen(false)} className="font-medium text-accent underline-offset-4 hover:underline">Compare your shortlist <span aria-hidden="true">→</span></Link>
          </div>
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
    <header className="sticky top-0 z-50 border-b border-line-strong bg-paper">
      <div className="site-container flex min-h-[72px] items-center justify-between gap-[16px] xl:min-h-[80px]">
        <Link href="/" aria-label="Cladvera home" className="flex shrink-0 items-center gap-[12px]">
          <BrandMark className="h-[33px] w-[33px] text-accent" />
          <span className="flex flex-col gap-[5px]">
            <span className="text-[21px] font-medium leading-none tracking-[0.055em]">CLADVERA</span>
            <span className="text-[8px] font-medium uppercase leading-none tracking-[0.15em] text-ink-3">Architectural materials</span>
          </span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-[2px] xl:flex">
          {mainNav.map(item => item.links.length > 0 ? (
            <ProductNavigation key={`${pathname}-${item.label}`} group={item} active={productsActive} />
          ) : (
            <Link key={item.href} href={item.href!} aria-current={pathname === item.href ? "page" : undefined} className={`px-[9px] py-[12px] text-[13px] font-medium transition-colors hover:text-accent ${pathname === item.href ? "text-accent" : "text-ink-2"}`}>{item.label}</Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-[10px]">
          <div className="hidden sm:block"><SelectionLink /></div>
          <Link href="/request-quote" className="hidden min-h-[44px] items-center gap-[20px] bg-ink px-[16px] py-[10px] text-[13px] font-medium text-paper transition-colors hover:bg-accent xl:flex">Request a quote<span aria-hidden="true">↗</span></Link>
          <button ref={mobileButtonRef} type="button" className="flex min-h-[44px] items-center gap-[12px] border-l border-line-strong pl-[16px] py-[10px] text-[13px] xl:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpenOnPath(open ? null : pathname)}>
            {open ? "Close" : "Menu"}
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d={open ? "m3 3 10 10M3 13 13 3" : "M1 5h14M1 11h14"} stroke="currentColor" strokeWidth="1.5" /></svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile main" className="max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain border-t border-line-strong bg-paper xl:hidden" onKeyDown={event => { if (event.key === "Escape") { event.preventDefault(); setOpenOnPath(null); mobileButtonRef.current?.focus(); } }}>
          <div className="site-container grid gap-[4px] py-[20px]">
            {mainNav.map(item => item.links.length > 0 ? (
              <div key={item.label} className="mb-[8px] border-b border-line pb-[16px]">
                <p className="mb-[8px] font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">{item.label}</p>
                <ul className="grid sm:grid-cols-2 sm:gap-x-[24px]">
                  {item.links.map(link => (
                    <li key={link.href}><Link href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setOpenOnPath(null)} className={`flex min-h-[44px] items-center justify-between py-[11px] text-f14 hover:text-accent ${pathname === link.href ? "font-medium text-accent" : "text-ink-2"}`}>{link.label}<span aria-hidden="true" className="pl-[12px] text-ink-3">↗</span></Link></li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link key={item.href} href={item.href!} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setOpenOnPath(null)} className={`min-h-[44px] py-[10px] text-f16 font-medium hover:text-accent ${pathname === item.href ? "text-accent" : ""}`}>{item.label}</Link>
            ))}
            <div className="mt-[16px] grid grid-cols-2 gap-[12px] border-t border-line pt-[20px]">
              <Link href="/compare" onClick={() => setOpenOnPath(null)} className="flex min-h-[48px] items-center justify-center border border-line-strong px-[12px] py-[10px] text-center text-f14 hover:border-ink">Compare shortlist</Link>
              <Link href="/samples" onClick={() => setOpenOnPath(null)} className="flex min-h-[48px] items-center justify-center border border-line-strong px-[12px] py-[10px] text-center text-f14 hover:border-ink">Request samples</Link>
              <Link href="/request-quote" onClick={() => setOpenOnPath(null)} className="col-span-2 flex min-h-[48px] items-center justify-between bg-ink px-[16px] py-[12px] text-f14 font-medium text-paper hover:bg-accent">Request a quote<span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { mainNav, type NavGroup } from "@/content/data/navigation";
import SelectionLink from "@/components/catalog/SelectionLink";
import BrandMark from "@/components/layout/BrandMark";

const projectPaths = [
  { href: "/#materials", label: "Explore by design intent", description: "Start with the surface, form and character of your project." },
  { href: "/applications", label: "Applications", description: "Find a starting point for your project context." },
  { href: "/technical-resources", label: "Technical resources", description: "Review documents for a named material." },
  { href: "/samples", label: "Request samples", description: "Prepare a material and finish sample brief." },
];

function ProductNavigation({ group, active, pathname }: { group: NavGroup; active: boolean; pathname: string }) {
  const materialIndex = group.href === "/products";
  const [overviewLink, ...collectionLinks] = group.links;
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
        // Clicking the panel's non-focusable space can leave relatedTarget null.
        if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
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
        <div id={menuId} className={`absolute top-[calc(100%+18px)] max-h-[calc(100dvh-104px)] overflow-y-auto overscroll-contain border border-line-strong border-t-2 border-t-ink bg-paper ${materialIndex ? "-left-[24px] w-[840px]" : "right-0 w-[400px] p-[24px]"}`}>
          {materialIndex ? (
            <div className="grid grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
              <section aria-labelledby={`${menuId}-collections`} className="min-w-0 p-[24px]">
                <div className="flex items-center justify-between gap-[16px] font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
                  <h2 id={`${menuId}-collections`}>Material collections</h2>
                  <span aria-hidden="true">01 / {String(collectionLinks.length).padStart(2, "0")}</span>
                </div>
                <Link href={overviewLink.href} aria-current={pathname === overviewLink.href ? "page" : undefined} onClick={() => setOpen(false)} className="group mt-[12px] flex min-h-[64px] items-center justify-between gap-[20px] border-b border-line-strong pb-[16px] hover:text-accent focus-visible:bg-paper-2">
                  <span>
                    <span className="block text-[26px] font-normal leading-[1.2] tracking-[-0.04em]">{overviewLink.label}</span>
                    {overviewLink.description && <span className="mt-[6px] block text-f12 leading-[1.5] text-ink-3">{overviewLink.description}</span>}
                  </span>
                  <span aria-hidden="true" className="text-[22px] text-accent transition-transform group-hover:translate-x-[3px]">↗</span>
                </Link>
                <ul className="grid grid-cols-2 gap-x-[24px]">
                  {collectionLinks.map((link, index) => (
                    <li key={link.href} className="border-b border-line">
                      <Link href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setOpen(false)} className="group flex h-full min-h-[96px] items-start gap-[10px] py-[16px] hover:text-accent focus-visible:bg-paper-2">
                        <span aria-hidden="true" className="pt-[2px] font-mono text-[10px] text-ink-3">{String(index + 1).padStart(2, "0")}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-f14 font-medium leading-[1.45]">{link.label}</span>
                          {link.description && <span className="mt-[5px] block text-f12 leading-[1.5] text-ink-3">{link.description}</span>}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
              <section aria-labelledby={`${menuId}-project`} className="min-w-0 border-l border-line bg-paper-2 p-[24px]">
                <h2 id={`${menuId}-project`} className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">For your project</h2>
                <ul className="mt-[12px]">
                  {projectPaths.map((link, index) => (
                    <li key={link.href} className="border-b border-line">
                      <Link href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setOpen(false)} className="group flex min-h-[60px] items-start justify-between gap-[12px] py-[14px] hover:text-accent focus-visible:bg-paper">
                        <span>
                          <span className={`block leading-[1.3] ${index === 0 ? "editorial-serif text-[27px] tracking-[-0.035em]" : "text-f14 font-medium"}`}>{link.label}</span>
                          <span className="mt-[6px] block text-f12 leading-[1.5] text-ink-3">{link.description}</span>
                        </span>
                        <span aria-hidden="true" className="mt-[2px] text-accent transition-transform group-hover:translate-x-[3px]">↗</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/compare" aria-current={pathname === "/compare" ? "page" : undefined} onClick={() => setOpen(false)} className="mt-[12px] flex min-h-[44px] items-center justify-between gap-[16px] text-f12 font-medium text-accent underline-offset-4 hover:underline">Compare your shortlist <span aria-hidden="true">→</span></Link>
              </section>
            </div>
          ) : (
            <>
              <div className="mb-[12px] flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
                <p>Project supply</p>
                <span>Cladvera / Procurement</span>
              </div>
              <ul>
                {group.links.map(link => (
                  <li key={link.href} className="border-b border-line">
                    <Link href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setOpen(false)} className="group flex min-h-[44px] items-start gap-[14px] py-[18px] pr-[8px] hover:text-accent focus-visible:bg-paper-2">
                      <span className="flex-1">
                        <span className="block text-f16 font-medium">{link.label}</span>
                        {link.description && <span className="mt-[5px] block text-f12 leading-[1.6] text-ink-3">{link.description}</span>}
                      </span>
                      <span aria-hidden="true" className="mt-[2px] text-ink-3 transition-transform group-hover:translate-x-[3px] group-hover:text-accent">↗</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
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
    <header
      className="sticky top-0 z-50 border-b border-line-strong bg-paper"
      onBlur={event => {
        // A null destination can come from clicking non-focusable menu space.
        // Only dismiss when focus moves to a known element outside the header.
        if (open && event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) {
          setOpenOnPath(null);
        }
      }}
      onKeyDown={event => {
        if (event.key === "Escape" && open && !event.defaultPrevented) {
          event.preventDefault();
          setOpenOnPath(null);
          mobileButtonRef.current?.focus();
        }
      }}
    >
      <div className="site-container flex min-h-[72px] items-center justify-between gap-[16px] xl:min-h-[80px]">
        <Link href="/" aria-label="Cladvera home" className="flex shrink-0 items-center gap-[10px] sm:gap-[12px]">
          <BrandMark className="h-[33px] w-[33px] text-accent" />
          <span className="flex flex-col gap-[5px]">
            <span className="text-[20px] font-medium leading-none tracking-[0.055em] sm:text-[21px]">CLADVERA</span>
            <span className="text-[8px] font-medium uppercase leading-none tracking-[0.15em] text-ink-3">Architectural materials</span>
          </span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-[2px] xl:flex">
          {mainNav.map(item => item.links.length > 0 ? (
            <ProductNavigation key={`${pathname}-${item.label}`} group={item} pathname={pathname} active={item.href === "/products" ? productsActive : item.links.some(link => pathname === link.href)} />
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
        <nav id="mobile-nav" aria-label="Mobile main" className="max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain border-t border-line-strong bg-paper xl:hidden">
          <div className="site-container grid gap-[4px] py-[20px]">
            {mainNav.map(item => item.links.length > 0 ? (
              <div key={item.label} className="mb-[8px] border-b border-line pb-[16px]">
                <p className="mb-[8px] font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">{item.label}</p>
                <ul className="grid sm:grid-cols-2 sm:gap-x-[24px]">
                  {item.links.map(link => (
                    <li key={link.href}><Link href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setOpenOnPath(null)} className={`flex min-h-[44px] items-center justify-between py-[11px] text-f14 hover:text-accent ${pathname === link.href ? "font-medium text-accent" : "text-ink-2"}`}>{link.label}<span aria-hidden="true" className="pl-[12px] text-ink-3">↗</span></Link></li>
                  ))}
                </ul>
                {item.href === "/products" && <Link href="/#materials" onClick={() => setOpenOnPath(null)} className="mt-[12px] flex min-h-[48px] items-center justify-between gap-[16px] border-t border-line pt-[12px] text-f14 font-medium text-accent hover:underline">Explore by design intent<span aria-hidden="true">↗</span></Link>}
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

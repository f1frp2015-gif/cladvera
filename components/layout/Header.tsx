"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { mainNav } from "@/content/data/navigation";
import SelectionLink from "@/components/catalog/SelectionLink";
export default function Header() {
  const pathname = usePathname();
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;
  return <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
    <div className="site-container flex min-h-[72px] items-center justify-between gap-[12px]">
      <Link href="/" className="flex items-center gap-[10px] text-f20 font-semibold tracking-tight"><span aria-hidden="true" className="h-[22px] w-[22px] rounded-[4px] bg-accent" />Cladvera</Link>
      <nav aria-label="Main" className="hidden items-center gap-[4px] xl:flex">{mainNav.map(item => <Link key={item.href} href={item.href!} aria-current={pathname === item.href ? "page" : undefined} className={`rounded-control px-[10px] py-[8px] text-f14 font-medium hover:bg-paper-2 ${pathname === item.href ? "text-accent" : "text-ink-2"}`}>{item.label}</Link>)}</nav>
      <div className="flex items-center gap-[10px]"><div className="hidden sm:block"><SelectionLink /></div><Link href="/request-quote" className="hidden rounded-control bg-accent px-[14px] py-[8px] text-f14 font-semibold text-paper hover:bg-accent-hover xl:block">Request a quote</Link><button type="button" className="rounded-control border border-line px-[12px] py-[8px] text-f14 xl:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpenOnPath(open ? null : pathname)}>{open ? "Close" : "Menu"}</button></div>
    </div>
    {open && <nav id="mobile-nav" aria-label="Mobile main" className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-line bg-paper xl:hidden" onKeyDown={e => { if(e.key === "Escape") setOpenOnPath(null); }}><div className="site-container grid gap-[8px] py-[16px]">{mainNav.map(item => <Link key={item.href} href={item.href!} onClick={() => setOpenOnPath(null)} className="rounded-control px-[10px] py-[10px] text-f16 font-medium hover:bg-paper-2">{item.label}</Link>)}<Link href="/compare" onClick={() => setOpenOnPath(null)} className="px-[10px] py-[10px] text-f16">Compare shortlist</Link><Link href="/samples" onClick={() => setOpenOnPath(null)} className="px-[10px] py-[10px] text-f16">Request samples</Link><Link href="/request-quote" onClick={() => setOpenOnPath(null)} className="rounded-control bg-accent px-[14px] py-[10px] font-semibold text-paper">Request a quote</Link></div></nav>}
  </header>;
}

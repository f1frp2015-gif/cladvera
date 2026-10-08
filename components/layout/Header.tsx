"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ctaNav, mainNav } from "@/content/data/navigation";
import { site } from "@/content/data/site";
import { isAlminePath, isPublishedPath } from "@/content/data/publication";
import { taktlInquiryHref } from "@/lib/taktl-inquiry";
import { almineInquiryHref } from "@/lib/almine-inquiry";
import RegionSwitch from "@/components/region/RegionSwitch";

export default function Header() {
  const pathname = usePathname();
  const publishedLaunch = site.stage === "draft" && isPublishedPath(pathname);
  const inquiryHref = isAlminePath(pathname) ? almineInquiryHref() : taktlInquiryHref();
  // The menu is open only for the path it was opened on, so navigating closes it.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="site-container flex h-[64px] items-center justify-between gap-[16px]">
        <Link href={publishedLaunch ? "/suppliers/taktl" : "/"} className="flex items-center gap-[10px] text-f18 font-semibold tracking-tight">
          <span aria-hidden="true" className="inline-block h-[22px] w-[22px] rounded-[4px] bg-accent" />
          {site.brand}
        </Link>

        {publishedLaunch ? (
          <nav aria-label="Main" className="hidden items-center gap-[18px] lg:flex">
            <Link href="/suppliers/taktl" className="text-f14 font-medium text-ink-2 hover:text-ink">TAKTL products</Link>
            <Link href="/materials/acm-panels" className="text-f14 font-medium text-ink-2 hover:text-ink">ALMINE panels</Link>
            <a href={inquiryHref} className="rounded-control bg-accent px-[14px] py-[8px] text-f14 font-semibold text-paper hover:bg-accent-hover">Project inquiry</a>
          </nav>
        ) : <nav aria-label="Main" className="hidden items-center gap-[4px] lg:flex">
          {mainNav.map((group) =>
            group.links.length === 0 && group.href ? (
              <Link key={group.label} href={group.href} className="rounded-control px-[10px] py-[8px] text-f14 font-medium text-ink-2 hover:bg-paper-2 hover:text-ink">
                {group.label}
              </Link>
            ) : (
              <div key={group.label} className="group relative">
                {group.href ? (
                  <Link href={group.href} className="rounded-control px-[10px] py-[8px] text-f14 font-medium text-ink-2 hover:bg-paper-2 hover:text-ink">
                    {group.label}
                  </Link>
                ) : (
                  <button type="button" className="rounded-control px-[10px] py-[8px] text-f14 font-medium text-ink-2 hover:bg-paper-2 hover:text-ink" aria-haspopup="true">
                    {group.label}
                  </button>
                )}
                <div className="invisible absolute left-0 top-full z-50 w-[360px] pt-[8px] opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="rounded-card border border-line bg-paper p-[8px] shadow-pop">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="block rounded-control px-[12px] py-[8px] hover:bg-paper-2">
                          <span className="block text-f14 font-medium text-ink">{link.label}</span>
                          {link.description && <span className="block text-f12 text-ink-3">{link.description}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ),
          )}
        </nav>}

        {!publishedLaunch && <div className="hidden items-center gap-[10px] lg:flex">
          <RegionSwitch compact />
          {ctaNav.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-control px-[14px] py-[8px] text-f14 font-semibold ${
                index === ctaNav.length - 1
                  ? "bg-accent text-paper hover:bg-accent-hover"
                  : "border border-line-strong text-ink hover:border-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>}

        <button
          type="button"
          className="rounded-control border border-line px-[12px] py-[8px] text-f14 font-medium lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpenOnPath(open ? null : pathname)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-paper lg:hidden">
          <div className="site-container max-h-[calc(100vh-64px)] overflow-y-auto py-[16px]">
            {publishedLaunch ? (
              <div className="grid gap-[10px]">
                <Link href="/suppliers/taktl" className="py-[6px] text-f16 font-semibold">TAKTL products</Link>
                <Link href="/materials/acm-panels" className="py-[6px] text-f16 font-semibold">ALMINE panels</Link>
                <a href={inquiryHref} className="rounded-control bg-accent px-[12px] py-[8px] text-center text-f14 font-semibold text-paper">Project inquiry</a>
              </div>
            ) : <>
            <div className="mb-[16px] flex items-center justify-between gap-[12px]">
              <RegionSwitch />
              <div className="flex gap-[8px]">
                {ctaNav.map((link) => (
                  <Link key={link.href} href={link.href} className="rounded-control bg-accent px-[12px] py-[8px] text-f14 font-semibold text-paper">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            {mainNav.map((group) => (
              <div key={group.label} className="border-t border-line py-[10px]">
                {group.href ? (
                  <Link href={group.href} className="block py-[4px] text-f16 font-semibold">
                    {group.label}
                  </Link>
                ) : (
                  <p className="py-[4px] text-f16 font-semibold">{group.label}</p>
                )}
                {group.links.length > 0 && (
                  <ul className="mt-[4px] grid gap-[2px]">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="block py-[6px] text-f14 text-ink-2">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            </>}
          </div>
        </div>
      )}
    </header>
  );
}

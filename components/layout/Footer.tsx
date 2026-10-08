"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerNav } from "@/content/data/navigation";
import { site } from "@/content/data/site";
import { isAlminePath, isPublishedPath } from "@/content/data/publication";
import { taktlInquiryHref } from "@/lib/taktl-inquiry";
import { almineInquiryHref } from "@/lib/almine-inquiry";

export default function Footer() {
  const pathname = usePathname();
  if (site.stage === "draft" && isPublishedPath(pathname)) {
    const inquiryHref = isAlminePath(pathname) ? almineInquiryHref() : taktlInquiryHref();
    return (
      <footer className="border-t border-line bg-slate text-paper">
        <div className="site-container grid gap-[20px] py-[40px] md:grid-cols-2">
          <div>
            <p className="text-f18 font-semibold">Cladvera · product collections</p>
            <p className="mt-[8px] max-w-[520px] text-f14 text-paper/70">TAKTL and ALMINE are the named manufacturers of the products shown here. Cladvera handles project inquiries. Final construction, documentation and availability are confirmed for each project.</p>
          </div>
          <div className="grid content-start gap-[8px] text-f14 md:justify-items-end">
            <Link href="/suppliers/taktl" className="hover:underline">Explore TAKTL products</Link>
            <Link href="/materials/acm-panels" className="hover:underline">Explore ALMINE panels</Link>
            <a href={inquiryHref} className="hover:underline">Email {site.contact.email}</a>
            <a href="https://www.taktl-llc.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">TAKTL manufacturer site ↗</a>
            <a href="https://www.alminecn.com/En/Products/?id=3" target="_blank" rel="noopener noreferrer" className="hover:underline">ALMINE manufacturer catalogue ↗</a>
          </div>
          <p className="text-f12 text-paper/60 md:col-span-2">© {new Date().getFullYear()} {site.brand}. Manufacturer names and product imagery belong to their respective owners.</p>
        </div>
      </footer>
    );
  }
  return (
    <footer className="border-t border-line bg-slate text-paper">
      <div className="site-container py-[48px]">
        <div className="grid gap-[32px] md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <p className="text-f18 font-semibold">{site.brand}</p>
            <p className="mt-[8px] text-f14 text-paper/70">{site.tagline}</p>
            <p className="mt-[16px] text-f12 text-paper/60">Cladvera core ranges: {site.origin}</p>
          </div>
          {footerNav.map((column) => (
            <div key={column.heading}>
              <p className="mb-[10px] font-mono text-f12 font-medium uppercase tracking-[0.08em] text-paper/60">{column.heading}</p>
              <ul className="grid gap-[6px]">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-f14 text-paper/85 hover:text-paper">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-[40px] grid gap-[16px] border-t border-paper/15 pt-[24px] text-f12 text-paper/60 md:grid-cols-2">
          <div className="grid gap-[6px]">
            <p>
              Material-level test reports do not establish wall-assembly compliance. Project approval rests with the authority
              having jurisdiction and the design professionals of record. See <Link href="/compliance" className="underline">compliance</Link>.
            </p>
            <p>
              Cladvera&apos;s China-sourced ranges are not for projects subject to Buy American, Build America Buy America or Buy Canadian rules.
              Duties and taxes are payable by the importer.
            </p>
          </div>
          <div className="grid gap-[6px] md:text-right">
            <p>
              <a href={`mailto:${site.contact.email}`} className="underline">{site.contact.email}</a>
              {site.contact.phone && (
                <>
                  {" · "}
                  <a href={`tel:${site.contact.phone}`} className="underline">{site.contact.phone}</a>
                </>
              )}
            </p>
            <p>{site.legal.entity} · {site.legal.address}</p>
            <p>en-US · en-CA · fr-CA (planned)</p>
            <p>© {new Date().getFullYear()} {site.brand}. <Link href="/privacy" className="underline">Privacy</Link></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

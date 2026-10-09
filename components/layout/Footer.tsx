import Link from "next/link";
import BrandMark from "@/components/layout/BrandMark";
import { footerNav } from "@/content/data/navigation";
import { site } from "@/content/data/site";

export default function Footer() {
  return (
    <footer className="bg-slate text-paper">
      <div className="site-container">
        <div className="grid gap-[36px] border-b border-paper/25 py-[48px] md:grid-cols-[1.15fr_1fr] md:gap-[72px] md:py-[72px]">
          <div>
            <p className="mb-[24px] flex items-center gap-[10px] font-mono text-[10px] uppercase tracking-[0.15em] text-paper/65"><span aria-hidden="true" className="h-[5px] w-[5px] bg-paper/70" />Project enquiries</p>
            <h2 className="max-w-[620px] text-[40px] font-normal leading-[1.04] tracking-[-0.055em] md:text-[58px] lg:text-[68px]">Let’s talk about<br />your project.</h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="max-w-[400px] text-f16 leading-[1.8] text-paper/70">Bring your drawings, material direction and project requirements. Together, we can define the next steps.</p>
            <div className="mt-[28px] border-t border-paper/25">
              <Link href="/request-quote" className="group flex min-h-[58px] items-center justify-between gap-[24px] border-b border-paper/25 py-[15px] text-f16 transition-colors hover:text-paper/70">Discuss your project <span aria-hidden="true" className="text-[24px] transition-transform group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">↗</span></Link>
              <Link href="/samples" className="group flex min-h-[54px] items-center justify-between gap-[24px] py-[15px] text-f14 text-paper/70 transition-colors hover:text-paper">Request material samples <span aria-hidden="true" className="text-[20px] transition-transform group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">↗</span></Link>
            </div>
          </div>
        </div>

        <div className="grid gap-x-[40px] gap-y-[36px] py-[44px] md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:py-[56px]">
          <div className="lg:pr-[32px]">
            <p className="mb-[18px] font-mono text-[10px] uppercase tracking-[0.15em] text-paper/60">Material. Surface. Form.</p>
            <p className="max-w-[290px] text-f14 leading-[1.8] text-paper/75">Architectural panel sourcing for US and Canadian project teams. China-sourced core ranges and a separately identified TAKTL manufacturer collection.</p>
            <a href={`mailto:${site.contact.email}`} className="mt-[22px] inline-block py-[4px] text-f14 text-paper underline decoration-paper/35 underline-offset-[6px] transition-colors hover:text-paper/70">{site.contact.email}</a>
          </div>
          {footerNav.map(group => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="mb-[20px] font-mono text-[10px] uppercase tracking-[0.12em] text-paper/60">{group.heading}</h2>
              <ul className="grid gap-[10px]">
                {group.links.map(link => (
                  <li key={link.href}><Link href={link.href} className="inline-block py-[2px] text-[13px] leading-[1.7] text-paper/80 underline-offset-[5px] transition-colors hover:text-paper hover:underline">{link.label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Link href="/" aria-label="Cladvera home" className="flex items-end justify-between gap-[16px] border-b border-paper/25 pb-[28px] pt-[12px] sm:pb-[36px] lg:pt-[28px]">
          <span aria-hidden="true" className="block text-[clamp(2.75rem,14.3vw,12.5rem)] font-medium leading-[0.82] tracking-[-0.065em]">CLADVERA</span>
          <BrandMark className="mb-[2px] h-[36px] w-[36px] shrink-0 text-paper/90 sm:h-[56px] sm:w-[56px] lg:h-[100px] lg:w-[100px]" />
        </Link>

        <div className="grid gap-[16px] py-[24px] text-[11px] leading-[1.8] text-paper/60 lg:grid-cols-[1.7fr_1fr] lg:gap-[64px]">
          <p>Cladvera coordinates project supply. Named manufacturers remain the source of product information. Offered construction, documentation, availability and commercial terms are confirmed for each project.</p>
          <p className="lg:text-right">© {new Date().getFullYear()} Cladvera.<br />Manufacturer names and supplied imagery belong to their respective owners.</p>
        </div>
      </div>
    </footer>
  );
}

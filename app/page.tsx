import Image from "next/image";
import Link from "next/link";
import DesignExplorer from "@/components/catalog/DesignExplorer";
import JsonLd from "@/components/seo/JsonLd";
import { Cta } from "@/components/ui";
import { catalogCategories, catalogApplications, catalogProducts } from "@/content/data/catalog";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const description = "Source facade panels and architectural materials for US and Canadian projects. Explore China-sourced HPL, metal composite and GFRP, plus the TAKTL UHPC range.";
export const metadata = buildPageMetadata({ title: "Facade Panel Supplier & Architectural Materials | Cladvera", description, path: "/" });

const process = [
  { number: "01", title: "The material.", text: "Begin with surface, structure and the character of each family.", link: "Explore the product library", href: "/products" },
  { number: "02", title: "The detail.", text: "Bring samples, drawings and assembly requirements into the conversation.", link: "Review technical resources", href: "/technical-resources" },
  { number: "03", title: "The project.", text: "Connect your design intent to quantities, documentation and delivery needs.", link: "Plan your procurement", href: "/procurement" },
];

export default function Page() {
  return <>
    <JsonLd data={buildWebPageSchema({ name: "Facade panels and architectural materials", description, path: "/" })} />
    <section className="bg-paper">
      <div className="site-container pb-[24px] pt-[24px] md:pt-[28px]">
        <div className="flex items-center justify-between gap-[24px] border-t border-line-strong pt-[14px]">
          <p className="eyebrow">Facade panels & architectural surfaces</p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3 sm:block">Material selection / Project supply</p>
        </div>
        <div className="cover-grid">
          <div className="cover-narrative">
            <h1 className="cover-title">Material <span className="md:block">shapes </span><span className="editorial-serif block text-accent">architecture.</span></h1>
            <div className="mt-[24px] max-w-[360px] md:mt-[32px]">
              <p className="text-f16 text-ink-2">Facade panels, interior surfaces and custom forms. A considered material library for architects and project teams.</p>
              <Link href="/products" className="index-link mt-[24px] flex min-h-[48px] items-center justify-between gap-[24px] border-b border-ink pb-[10px] text-f14 font-medium">Explore the material library <span aria-hidden="true" className="link-arrow text-f24">↗</span></Link>
              <Link href="#materials" className="index-link mt-[12px] inline-flex min-h-[44px] items-center gap-[16px] text-f12 text-ink-3">Explore by design intent <span aria-hidden="true">↓</span></Link>
            </div>
          </div>
          <figure className="min-w-0">
            <div className="cover-plate">
              <Image src={catalogProducts[0].imageUrl!} alt="Pale TAKTL architectural UHPC facade panels meeting glass and shadow at a building corner" fill sizes="(min-width: 1440px) 740px, (min-width: 768px) 54vw, calc(100vw - 40px)" className="object-cover" preload />
              <Link href="/suppliers/taktl/facade-elements" aria-label="Explore TAKTL architectural UHPC facade elements" className="index-link absolute inset-x-[16px] bottom-[16px] flex items-center justify-between gap-[20px] bg-paper p-[16px] md:inset-x-[24px] md:bottom-[24px] md:p-[20px]">
                <div><p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">01 / Architectural UHPC</p><p className="mt-[6px] text-[20px] leading-tight tracking-[-0.03em]">Light. Surface. Shadow.</p></div>
                <span aria-hidden="true" className="link-arrow text-[30px] font-light leading-none text-accent">↗</span>
              </Link>
            </div>
            <figcaption className="border-b border-line pb-[12px] pt-[14px] text-[11px] leading-[1.6] text-ink-3">
              <Link href="/suppliers/taktl/facade-elements" className="inline-flex min-h-[32px] items-center gap-[16px] font-medium text-ink hover:text-accent">TAKTL A|UHPC® Facade Elements <span aria-hidden="true">↗</span></Link>
              <span className="block">Image: TAKTL manufacturer reference. Project suitability reviewed separately.</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <nav aria-label="Explore material collections" className="bg-paper">
      <div className="site-container grid grid-cols-2 gap-x-[24px] pb-[24px] md:grid-cols-3 lg:grid-cols-6">
        {catalogCategories.map((category, index) => <Link key={category.id} href={category.path} className="index-link group flex min-h-[112px] flex-col justify-between gap-[20px] border-b border-line py-[18px]"><span className="font-mono text-[10px] text-ink-3">0{index + 1} / Collection</span><span className="flex items-start justify-between gap-[12px] text-f14 font-medium">{category.label}<span aria-hidden="true" className="link-arrow text-f16 text-ink-3 group-hover:text-accent">↗</span></span></Link>)}
      </div>
    </nav>

    <section id="materials" className="bg-paper">
      <div className="site-container py-[56px] md:py-[88px]">
        <div className="mb-[44px] grid gap-[24px] border-t border-line-strong pt-[22px] md:mb-[64px] md:grid-cols-[1fr_2fr]">
          <p className="eyebrow">01 / Material studies</p>
          <div><h2 className="editorial-title max-w-[720px]">Start with<br /><span className="editorial-serif">the architecture.</span></h2><p className="mt-[24px] max-w-[480px] text-f16 text-ink-2">Texture, rhythm, warmth or form. Follow a design direction, discover candidate materials, then bring the details into focus.</p></div>
        </div>
        <DesignExplorer />
        <div className="mt-[48px] grid gap-[20px] border-t border-line-strong pt-[22px] md:mt-[64px] md:grid-cols-[1fr_auto] md:items-center">
          <p className="max-w-[590px] text-f12 text-ink-3">Explore the complete archive: 11 product families across six material and component collections. Review attachment components with the selected panel system.</p>
          <Cta href="/products" variant="ghost">Open the complete material archive <span aria-hidden="true">↗</span></Cta>
        </div>
      </div>
    </section>

    <section className="bg-slate text-paper">
      <div className="site-container grid gap-[40px] py-[64px] md:py-[96px] lg:grid-cols-[1fr_1fr] lg:gap-[96px]">
        <div className="flex flex-col items-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.13em] text-paper/65">02 / Architecture begins with a question</p>
          <h2 className="editorial-title mt-[32px]">What will the<br /><span className="editorial-serif text-[#d6ad99]">material do?</span></h2>
          <p className="mt-[24px] max-w-[350px] text-f16 text-paper/75">Frame a facade. Define an interior. Follow a curve. Start with the application and work toward the detail.</p>
          <Link href="/applications" className="mt-[28px] inline-flex min-h-[44px] items-center gap-[36px] border-b border-paper/50 pb-[8px] text-f14 hover:text-[#d6ad99]">Explore architectural applications <span aria-hidden="true">↗</span></Link>
          <svg aria-hidden="true" viewBox="0 0 320 180" fill="none" className="mt-[44px] hidden w-[260px] text-paper/30 lg:block"><path d="M0 150h320M24 0v180M296 0v180M0 30h320M80 180V65h160v115M114 65v85M148 65v85M182 65v85M216 65v85" stroke="currentColor" strokeWidth="0.6" /><path d="M80 150V65h160" stroke="#d6ad99" strokeWidth="2" /><circle cx="24" cy="30" r="4" stroke="currentColor" /><circle cx="296" cy="150" r="4" stroke="currentColor" /></svg>
        </div>
        <div className="border-t border-paper/40">{catalogApplications.map((application, index) => <Link key={application.id} href={`/applications#${application.id}`} className="group grid grid-cols-[24px_1fr_20px] items-start gap-[16px] border-b border-paper/20 py-[26px]"><span className="pt-[4px] font-mono text-[10px] text-paper/55">0{index + 1}</span><div><h3 className="text-[22px] font-normal leading-tight tracking-[-0.03em] group-hover:text-[#d6ad99] md:text-[26px]">{application.label}</h3><p className="mt-[10px] max-w-[340px] text-f14 text-paper/65">{application.description}</p></div><span aria-hidden="true" className="text-f20 text-paper/70">↗</span></Link>)}</div>
      </div>
    </section>

    <section className="bg-paper">
      <div className="site-container py-[64px] md:py-[112px]">
        <div className="grid gap-[24px] border-t border-line-strong pt-[22px] md:grid-cols-[1fr_2fr]"><p className="eyebrow">03 / A considered process</p><h2 className="editorial-title">From first impression<br /><span className="editorial-serif">to the final detail.</span></h2></div>
        <ol className="mt-[48px] grid gap-[32px] md:mt-[64px] md:grid-cols-3">{process.map(item => <li key={item.number} className="border-t border-line pt-[16px]"><p className="font-mono text-[10px] text-accent">{item.number} /</p><h3 className="mb-[18px] mt-[28px] text-[34px] font-normal tracking-[-0.045em]">{item.title}</h3><p className="max-w-[340px] text-f16 text-ink-2">{item.text}</p><Link href={item.href} className="index-link mt-[28px] inline-flex min-h-[44px] items-center gap-[24px] border-b border-line-strong text-f14 font-medium">{item.link}<span aria-hidden="true">↗</span></Link></li>)}</ol>
      </div>
    </section>

    <section className="border-t border-line bg-paper">
      <div className="site-container grid gap-[32px] py-[56px] md:py-[80px] lg:grid-cols-[1fr_1.5fr] lg:gap-[96px]">
        <div><p className="eyebrow">04 / Sourcing & supply</p><h2 className="mt-[24px] text-[36px] font-normal leading-[1.1] tracking-[-0.045em] md:text-[48px]">A clear material.<br /><span className="editorial-serif">A defined supply route.</span></h2></div>
        <div>
          <p className="max-w-[650px] text-f18 text-ink-2">Cladvera is an architectural panel supplier for United States and Canadian project inquiries. Explore China-sourcing options for ALMINE metal composite panels, Compactwood exterior HPL and interior boards, and custom GFRP elements. TAKTL architectural UHPC is a separately identified manufacturer range.</p>
          <p className="mt-[18px] max-w-[650px] text-f14 text-ink-2">Confirm the manufacturing origin, offered construction, shipment route and project documents with each quotation.</p>
          <div className="mt-[28px] flex flex-wrap gap-x-[32px] gap-y-[16px]"><Cta href="/sourcing/china" variant="ghost">Sourcing architectural panels from China ↗</Cta><Cta href="/guides/facade-materials" variant="ghost">Compare facade material types ↗</Cta></div>
        </div>
      </div>
    </section>

    <section className="border-t border-line bg-paper-2">
      <div className="site-container grid md:grid-cols-2">
        {[
          { label: "For architects & designers", title: "Keep the design intent.", copy: "Establish the material language, review the construction and identify what your specification needs.", href: "/architects", link: "The architect’s material desk" },
          { label: "For buyers & project teams", title: "Bring the scope together.", copy: "Connect your approved shortlist to quantities, document requirements and project supply.", href: "/procurement", link: "Procurement & project supply" },
        ].map((item, index) => <div key={item.href} className={`py-[48px] md:py-[64px] ${index ? "border-t border-line md:border-l md:border-t-0 md:pl-[64px]" : "md:pr-[64px]"}`}><p className="eyebrow">{item.label}</p><h2 className="mt-[28px] text-[32px] font-normal leading-[1.15] tracking-[-0.04em] md:text-[38px]">{item.title}</h2><p className="mt-[18px] max-w-[420px] text-f16 text-ink-2">{item.copy}</p><Cta href={item.href} variant="ghost" className="mt-[24px]">{item.link}<span aria-hidden="true">↗</span></Cta></div>)}
      </div>
    </section>
  </>;
}

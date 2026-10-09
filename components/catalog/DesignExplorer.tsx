"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import AlmineVisual from "@/components/almine/AlmineVisual";
import { catalogProducts } from "@/content/data/catalog";
import { compactwoodImages, compactwoodSources } from "@/content/data/compactwood";
import { designDirections } from "@/content/data/design-directions";

export default function DesignExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(index: number, focus = false) {
    setActive(index);
    if (focus) tabs.current[index]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Explore by design intent" className="mb-[32px] grid grid-cols-2 gap-px border border-line-strong bg-line-strong md:mb-[48px] md:grid-cols-4">
        {designDirections.map((direction, index) => (
          <button
            key={direction.id}
            ref={node => { tabs.current[index] = node; }}
            type="button" role="tab" id={`direction-tab-${direction.id}`} aria-selected={active === index} aria-controls={`direction-panel-${direction.id}`} tabIndex={active === index ? 0 : -1}
            onClick={() => select(index)}
            onKeyDown={event => {
              const next = event.key === "ArrowRight" ? (index + 1) % designDirections.length : event.key === "ArrowLeft" ? (index - 1 + designDirections.length) % designDirections.length : event.key === "Home" ? 0 : event.key === "End" ? designDirections.length - 1 : null;
              if (next !== null) { event.preventDefault(); select(next, true); }
            }}
            className={`group flex min-h-[116px] flex-col items-start justify-between gap-[24px] px-[16px] py-[18px] text-left transition-colors md:min-h-[136px] md:px-[24px] md:py-[22px] ${active === index ? "bg-ink text-paper focus-visible:outline-[#d6ad99] focus-visible:-outline-offset-4" : "bg-paper text-ink-2 hover:bg-paper-2 focus-visible:-outline-offset-4"}`}
          >
            <span aria-hidden="true" className={`flex w-full items-center justify-between font-mono text-[10px] ${active === index ? "text-[#d6ad99]" : "text-ink-3"}`}><span>0{index + 1} / Study</span><span>{active === index ? "−" : "+"}</span></span>
            <span className="text-[18px] font-normal leading-[1.15] tracking-[-0.025em] md:text-[22px]">{direction.label}</span>
          </button>
        ))}
      </div>
      {designDirections.map((direction, index) => {
        const products = direction.productIds.map(id => catalogProducts.find(product => product.id === id)!);
        const visual = catalogProducts.find(product => product.id === direction.imageProductId)!;
        const isWarm = direction.id === "layered";
        const source = isWarm ? compactwoodSources.supplierProject : visual.sourceUrl;
        const imageUrl = isWarm ? compactwoodImages.supplierProject : visual.imageUrl;
        return (
          <div key={direction.id} role="tabpanel" id={`direction-panel-${direction.id}`} aria-labelledby={`direction-tab-${direction.id}`} hidden={active !== index} tabIndex={0} className="focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent">
            <div className="grid items-start gap-[32px] lg:grid-cols-[1.18fr_1fr] lg:gap-[64px]">
              <div>
                <figure>
                  <div className="relative aspect-[5/4] overflow-hidden bg-paper-2 sm:aspect-[6/5]">
                    {direction.id === "planar" ? (
                      <AlmineVisual visual="a2" className="h-full w-full rounded-none border-0" />
                    ) : imageUrl ? (
                      <Image src={imageUrl} alt={isWarm ? "Facade reference published by Compactwood; specific finish and product scope require confirmation" : visual.imageAlt || visual.name} fill sizes="(min-width: 1440px) 694px, (min-width: 1024px) 51vw, calc(100vw - 40px)" className={direction.id === "sculptural" ? "object-contain p-[20px] md:p-[32px]" : "object-cover"} />
                    ) : null}
                    <span aria-hidden="true" className="absolute left-[16px] top-[16px] bg-paper px-[12px] py-[8px] font-mono text-[10px]">STUDY / 0{index + 1}</span>
                  </div>
                  <figcaption className="flex flex-wrap items-start justify-between gap-x-[20px] gap-y-[8px] border-b border-line py-[12px] text-[10px] leading-[1.7] text-ink-3">
                    <span className="max-w-[370px]">{direction.id === "planar" ? "Illustration · not a finish sample or an installed project." : `Source: ${isWarm ? "Compactwood" : visual.manufacturer}. Manufacturer reference; not a Cladvera-delivered project.`}</span>
                    <a href={source} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-[8px] underline underline-offset-4 hover:text-accent">View source <span aria-hidden="true">↗</span></a>
                  </figcaption>
                </figure>
                <p className="mt-[24px] max-w-[560px] border-l border-accent pl-[20px] font-editorial text-[24px] italic leading-[1.35] tracking-[-0.025em] text-ink-2 md:text-[30px]">{direction.question}</p>
              </div>
              <div className="border-t border-line-strong pt-[20px] lg:pt-[24px]">
                <p className="eyebrow mb-[20px]">The design direction / 0{index + 1}</p>
                <h3 className="max-w-[520px] text-[36px] font-normal leading-[1.06] tracking-[-0.045em] md:text-[48px]">{direction.title}</h3>
                <p className="mt-[20px] text-f16 leading-[1.8] text-ink-2">{direction.description}</p>
                <p className="mb-[12px] mt-[32px] font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">Candidate materials</p>
                <div className="mb-[28px] border-y border-line-strong">
                  {products.map(product => <Link key={product.id} href={product.path} className="group flex min-h-[82px] items-center justify-between gap-[24px] border-b border-line py-[16px] last:border-b-0"><div><span className="block font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">{product.manufacturer}</span><span className="mt-[4px] block text-f16 group-hover:text-accent">{product.name}</span></div><span aria-hidden="true" className="text-accent">↗</span></Link>)}
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">Bring into the review</p>
                <p className="mt-[10px] text-f14 leading-[1.8] text-ink-2">{direction.review}</p>
                <div className="mt-[28px] flex flex-wrap items-center gap-x-[28px] gap-y-[12px]">
                  <Link href={direction.collection} className="inline-flex min-h-[44px] items-center gap-[24px] border-b border-ink text-f14 font-medium hover:border-accent hover:text-accent">Explore the material <span aria-hidden="true">↗</span></Link>
                  <Link href={`/compare?products=${encodeURIComponent(direction.productIds.join(","))}`} className="inline-flex min-h-[44px] items-center text-f14 text-ink-2 underline underline-offset-4 hover:text-accent">Review {products.length === 1 ? "this candidate" : "these candidates"}</Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <p className="mt-[32px] max-w-[760px] text-f12 text-ink-3">Design directions help begin a conversation. Confirm finishes with physical samples and review each product and assembly against the project requirements.</p>
    </div>
  );
}

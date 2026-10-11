"use client";

import { useId, useState } from "react";
import SmartGlassVisual from "./SmartGlassVisual";

export default function SmartGlassDemo() {
  const [frosted, setFrosted] = useState(false);
  const descriptionId = useId();

  return (
    <figure className="border border-line bg-paper-2">
      <div className="flex flex-wrap items-center justify-between gap-[12px] border-b border-line px-[18px] py-[14px] md:px-[28px]">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-2">Study 01 / A changing facade</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">Switchable architectural glazing</span>
      </div>
      <div className="relative overflow-hidden" role="img" aria-label={`Illustrated building facade in its ${frosted ? "frosted, power-off" : "transparent, power-on"} state`}>
        <SmartGlassVisual frosted={frosted} className="max-h-[620px]" />
      </div>
      <figcaption className="grid gap-[24px] border-t border-line px-[18px] py-[24px] md:grid-cols-[1fr_auto] md:items-center md:px-[28px]">
        <div>
          <p className="text-[24px] font-normal leading-[1.15] tracking-[-0.035em] md:text-[32px]">One facade. <span className="editorial-serif">Two expressions.</span></p>
          <p id={descriptionId} aria-live="polite" className="mt-[10px] max-w-[560px] text-f14 text-ink-2">{frosted ? "Power off: a frosted appearance. Light transmission continues." : "Power on: a transparent appearance. Views through the glazing open up."}</p>
          <p className="mt-[10px] font-mono text-[10px] leading-[1.6] text-ink-3">Concept illustration · not a supplied assembly, built project or optical simulation.</p>
        </div>
        <div role="group" aria-label="Preview smart glass facade states" aria-describedby={descriptionId} className="grid grid-cols-2 gap-[6px] border border-line-strong p-[5px]">
          <button type="button" aria-pressed={!frosted} onClick={() => setFrosted(false)} className={`min-h-[52px] px-[16px] text-f14 font-medium transition-colors motion-reduce:transition-none ${!frosted ? "bg-ink text-paper" : "text-ink-2 hover:bg-paper-3"}`}><span className="block">Clear</span><span className="font-mono text-[9px] uppercase tracking-[0.1em]">Power on</span></button>
          <button type="button" aria-pressed={frosted} onClick={() => setFrosted(true)} className={`min-h-[52px] px-[16px] text-f14 font-medium transition-colors motion-reduce:transition-none ${frosted ? "bg-ink text-paper" : "text-ink-2 hover:bg-paper-3"}`}><span className="block">Frosted</span><span className="font-mono text-[9px] uppercase tracking-[0.1em]">Power off</span></button>
        </div>
      </figcaption>
    </figure>
  );
}

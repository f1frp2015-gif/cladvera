import type { AlmineProduct } from "@/content/data/almine";

const finishes: Record<AlmineProduct["visual"], string> = {
  a2: "linear-gradient(145deg, #c8d0d2 0%, #eff1ee 38%, #a7b1b5 100%)",
  tunnel: "repeating-linear-gradient(110deg, #d0d5d3 0 34px, #9da9ab 35px 37px, #e8e9e4 38px 70px)",
  medical: "linear-gradient(135deg, #eef3f0 0%, #c9d8d4 55%, #f6f7f3 100%)",
};

export default function AlmineVisual({ visual, className = "" }: { visual: AlmineProduct["visual"]; className?: string }) {
  return (
    <div aria-hidden="true" className={`relative overflow-hidden rounded-card border border-line ${className}`} style={{ background: finishes[visual] }}>
      <div className="absolute inset-x-[8%] top-[18%] h-[2px] bg-white/75" />
      <div className="absolute inset-x-[8%] bottom-[18%] h-[2px] bg-slate/40" />
      <span className="absolute bottom-[10px] left-[10px] rounded-tag bg-paper/90 px-[8px] py-[3px] font-mono text-f12 text-ink-2">Illustration · not a product sample</span>
    </div>
  );
}

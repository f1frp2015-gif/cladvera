import type { TaktlProduct } from "@/content/data/taktl";

const backgrounds: Record<TaktlProduct["visual"], string> = {
  ribs: "repeating-linear-gradient(90deg, #bdb9b0 0 13px, #e3dfd6 14px 30px, #aaa69d 31px 34px)",
  aggregate: "radial-gradient(circle at 18% 26%, #756f69 0 3px, transparent 4px), radial-gradient(circle at 68% 72%, #948e84 0 4px, transparent 5px), radial-gradient(circle at 83% 31%, #b0a69a 0 3px, transparent 4px), #d8d3c8",
  light: "linear-gradient(145deg, #e9e7e0 0%, #d0d0c8 42%, #f6f3ea 100%)",
  form: "repeating-linear-gradient(135deg, #cbc7bf 0 18px, #e2ded6 18px 34px, #aaa69e 35px 37px)",
  hardware: "linear-gradient(90deg, transparent 0 24%, #747c82 24% 30%, transparent 30% 68%, #747c82 68% 74%, transparent 74%), linear-gradient(0deg, #d7d4cd 0 27%, #969da0 27% 31%, #d7d4cd 31% 70%, #969da0 70% 74%, #d7d4cd 74%)",
};

export default function TaktlVisual({
  visual,
  className = "",
}: {
  visual: TaktlProduct["visual"];
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-card border border-line ${className}`}
      style={{ background: backgrounds[visual] }}
    >
      <span className="absolute bottom-[10px] left-[10px] rounded-tag bg-paper/90 px-[8px] py-[3px] font-mono text-f12 text-ink-2">
        Diagrammatic illustration · not a sample
      </span>
    </div>
  );
}

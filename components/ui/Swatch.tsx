import Link from "next/link";
import type { Finish } from "@/content/data/finishes";
import { Badge } from "@/components/ui";

export function Swatch({ finish, size = "md" }: { finish: Finish; size?: "sm" | "md" | "lg" }) {
  const heights = { sm: "h-[72px]", md: "h-[120px]", lg: "h-[260px]" };
  return (
    <div
      role="img"
      aria-label={`${finish.name} swatch (placeholder)`}
      className={`${heights[size]} w-full rounded-card border border-line`}
      style={{ background: finish.swatch }}
    />
  );
}

export function FinishCard({ finish }: { finish: Finish }) {
  return (
    <Link
      href={`/finishes/${finish.code.toLowerCase()}`}
      className="group block rounded-card border border-line bg-paper p-[12px] transition-shadow hover:border-line-strong hover:shadow-card"
    >
      <Swatch finish={finish} />
      <div className="mt-[10px] flex items-start justify-between gap-[8px]">
        <div>
          <p className="font-mono text-f12 text-ink-3">{finish.code}</p>
          <p className="text-f16 font-semibold group-hover:text-accent">{finish.name}</p>
        </div>
        <Badge tone={finish.use.includes("exterior") ? "accent" : "neutral"}>
          {finish.use.includes("exterior") ? "Int / Ext" : "Interior"}
        </Badge>
      </div>
      <p className="mt-[4px] text-f12 text-ink-3">{finish.gloss}</p>
    </Link>
  );
}

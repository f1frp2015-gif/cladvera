"use client";

import { regionList, regions } from "@/content/data/regions";
import { useRegion } from "./RegionProvider";

export default function RegionSwitch({ compact = false }: { compact?: boolean }) {
  const { region, setRegion } = useRegion();
  return (
    <div
      role="group"
      aria-label="Country"
      className="inline-flex items-center rounded-control border border-line bg-paper p-[2px] text-f12 font-medium"
    >
      {regionList.map((code) => {
        const active = code === region;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            onClick={() => setRegion(code)}
            className={`rounded-[4px] px-[10px] py-[4px] transition-colors ${
              active ? "bg-ink text-paper" : "text-ink-2 hover:text-ink"
            }`}
          >
            {compact ? code : regions[code].name}
          </button>
        );
      })}
    </div>
  );
}

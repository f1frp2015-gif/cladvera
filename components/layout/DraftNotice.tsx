"use client";

import { usePathname } from "next/navigation";
import { site } from "@/content/data/site";
import { isTaktlPath } from "@/content/data/publication";

/**
 * Shown on draft pages. The published TAKTL collection is exempt.
 */
export default function DraftNotice() {
  const pathname = usePathname();
  if (site.stage !== "draft" || isTaktlPath(pathname)) return null;
  return (
    <div className="bg-warn-bg text-warn">
      <div className="site-container py-[8px] text-f12 font-medium">
        Pre-launch draft. Specifications, finishes, stock and compliance statuses are placeholders pending verification and
        are not offers to sell.
      </div>
    </div>
  );
}

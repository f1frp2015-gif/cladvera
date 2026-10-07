import { site } from "@/content/data/site";

/**
 * Shown on every page while NEXT_PUBLIC_SITE_STAGE is not "live". Pages are
 * also sent as noindex in that state (lib/seo.ts).
 */
export default function DraftNotice() {
  if (site.stage !== "draft") return null;
  return (
    <div className="bg-warn-bg text-warn">
      <div className="site-container py-[8px] text-f12 font-medium">
        Pre-launch draft. Specifications, finishes, stock and compliance statuses are placeholders pending verification and
        are not offers to sell.
      </div>
    </div>
  );
}

import { regions } from "@/content/data/regions";

interface RegionBlockProps {
  us: React.ReactNode;
  ca: React.ReactNode;
  /** Hide the country label when the surrounding heading already names it. */
  unlabelled?: boolean;
  className?: string;
}

/**
 * Renders the United States and Canada variants of a block. Both are in the
 * HTML; the stylesheet hides the inactive one once <html data-region> is set.
 */
export default function RegionBlock({ us, ca, unlabelled = false, className = "" }: RegionBlockProps) {
  return (
    <>
      <div data-region-block="US" className={className}>
        {!unlabelled && <RegionLabel code="US" />}
        {us}
      </div>
      <div data-region-block="CA" className={className}>
        {!unlabelled && <RegionLabel code="CA" />}
        {ca}
      </div>
    </>
  );
}

function RegionLabel({ code }: { code: "US" | "CA" }) {
  return (
    <p className="mb-[8px] font-mono text-f12 font-medium uppercase tracking-[0.08em] text-ink-3">
      {regions[code].name}
    </p>
  );
}

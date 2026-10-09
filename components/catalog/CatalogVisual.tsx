import Image from "next/image";
import AlmineVisual from "@/components/almine/AlmineVisual";
import type { AlmineProduct } from "@/content/data/almine";
import type { CatalogProduct } from "@/content/data/catalog";

const almineVisuals: Record<string, AlmineProduct["visual"]> = {
  "almine-a2": "a2",
  "almine-tunnel": "tunnel",
  "almine-medical": "medical",
};

export default function CatalogVisual({
  product,
  className = "",
  sizes = "(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 50vw, 33vw",
}: {
  product: CatalogProduct;
  className?: string;
  sizes?: string;
}) {
  const illustration = almineVisuals[product.id];
  const isDiagram = product.manufacturer === "Compactwood";

  if (illustration) {
    return (
      <figure
        aria-label={`${product.name}: illustration`}
        className={`relative aspect-[4/3] w-full overflow-hidden bg-paper-2 ${className}`}
      >
        <div className="absolute inset-x-[16px] bottom-[44px] top-[16px] [&_span]:hidden">
          <AlmineVisual visual={illustration} className="h-full w-full rounded-none border-0" />
        </div>
        <figcaption className="absolute inset-x-[12px] bottom-[10px] font-mono text-[10px] leading-[1.5] text-ink-3">Illustration · not a product sample</figcaption>
      </figure>
    );
  }

  return (
    <figure className={`relative aspect-[4/3] w-full overflow-hidden bg-paper-2 ${className}`}>
      {product.imageUrl ? (
        <div className="absolute inset-x-0 bottom-[36px] top-0 overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.imageAlt || product.name}
            fill
            sizes={sizes}
            className={isDiagram || product.id === "gfrp-custom" ? "object-contain p-[18px]" : "object-cover transition-transform duration-500 group-hover:scale-[1.025]"}
          />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center p-[24px] text-center text-f14 text-ink-2">Product image pending</div>
      )}
      <figcaption className="absolute inset-x-[12px] bottom-[10px] font-mono text-[10px] leading-[1.5] text-ink-3">
        {isDiagram ? "Manufacturer construction diagram" : product.manufacturer === "TAKTL" ? "Image: TAKTL" : "Image: supplier presentation"}
      </figcaption>
    </figure>
  );
}

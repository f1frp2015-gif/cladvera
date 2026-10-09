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
}: {
  product: CatalogProduct;
  className?: string;
}) {
  const illustration = almineVisuals[product.id];
  const isDiagram = product.manufacturer === "Compactwood";

  if (illustration) {
    return (
      <div
        role="img"
        aria-label={`${product.name}: illustration, not a product sample`}
        className={`relative aspect-[4/3] w-full overflow-hidden bg-paper-2 ${className}`}
      >
        <div className="absolute inset-[16px]">
          <AlmineVisual visual={illustration} className="h-full w-full rounded-none border-0" />
        </div>
      </div>
    );
  }

  return (
    <figure className={`relative aspect-[4/3] w-full overflow-hidden bg-paper-2 ${className}`}>
      {product.imageUrl ? (
        <Image
          src={product.imageUrl}
          alt={product.imageAlt || product.name}
          fill
          sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 50vw, 33vw"
          className={isDiagram ? "object-contain px-[24px] pb-[44px] pt-[24px]" : "object-cover px-[16px] pb-[38px] pt-[16px] transition-transform duration-700 group-hover:scale-[1.015]"}
        />
      ) : (
        <div className="flex h-full items-center justify-center p-[24px] text-center text-f14 text-ink-2">Product image pending</div>
      )}
      <figcaption className="absolute bottom-[11px] left-[16px] max-w-[calc(100%-32px)] font-mono text-[10px] leading-[1.5] tracking-[0.02em] text-ink-3">
        {isDiagram ? "Manufacturer construction diagram" : product.manufacturer === "TAKTL" ? "Image: TAKTL" : "Image: supplier presentation"}
      </figcaption>
    </figure>
  );
}

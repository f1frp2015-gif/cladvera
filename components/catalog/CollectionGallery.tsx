import Image from "next/image";
import Link from "next/link";
import AlmineVisual from "@/components/almine/AlmineVisual";
import { catalogCategories, catalogProducts } from "@/content/data/catalog";
import { compactwoodImages } from "@/content/data/compactwood";

const collectionImages: Record<string, string> = {
  uhpc: "taktl-korsa",
  hpl: "compactwood-exterior",
  "interior-board": "compactwood-interior",
  gfrp: "gfrp-custom",
  hardware: "taktl-hardware",
};

export default function CollectionGallery() {
  return (
    <div className="grid grid-cols-2 gap-x-[16px] gap-y-[32px] md:gap-x-[28px] md:gap-y-[48px] lg:grid-cols-3">
      {catalogCategories.map((category, index) => {
        const product = catalogProducts.find(item => item.id === collectionImages[category.id]);
        const imageUrl = category.id === "hpl" ? compactwoodImages.supplierProject : product?.imageUrl;
        const contained = ["interior-board", "gfrp", "hardware"].includes(category.id);
        const caption = category.id === "mcm" ? "Material illustration" : category.id === "hpl" ? "Compactwood / facade reference" : category.id === "interior-board" ? "Compactwood / construction diagram" : category.id === "gfrp" ? "Kinflare / supplier reference" : "TAKTL / manufacturer reference";

        return (
          <Link key={category.id} href={category.path} className="group block min-w-0" aria-label={`Explore ${category.label}`}>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
                {category.id === "mcm" ? (
                  <AlmineVisual visual="a2" className="h-full w-full border-0 [&_span]:hidden" />
                ) : imageUrl ? (
                  <Image src={imageUrl} alt={category.id === "hpl" ? "Facade reference published by Compactwood" : product?.imageAlt || category.label} fill sizes="(min-width: 1440px) 430px, (min-width: 1024px) 30vw, 45vw" className={contained ? "object-contain p-[12px] md:p-[24px]" : "object-cover transition-transform duration-500 group-hover:scale-[1.035]"} />
                ) : null}
                <span aria-hidden="true" className="absolute left-[10px] top-[10px] flex h-[28px] w-[28px] items-center justify-center bg-paper font-mono text-[10px] md:left-[16px] md:top-[16px]">0{index + 1}</span>
              </div>
              <figcaption className="mt-[10px] font-mono text-[9px] leading-[1.5] text-ink-3 md:text-[10px]">{caption}</figcaption>
            </figure>
            <div className="mt-[14px] flex items-start justify-between gap-[12px] border-t border-line-strong pt-[14px] md:mt-[18px] md:pt-[18px]">
              <h3 className="text-[18px] font-normal leading-[1.15] tracking-[-0.035em] transition-colors group-hover:text-accent md:text-[27px]">{category.label}</h3>
              <span aria-hidden="true" className="text-[22px] leading-none text-accent transition-transform group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">↗</span>
            </div>
            <p className="mt-[12px] max-w-[360px] text-[12px] leading-[1.65] text-ink-2 md:text-f14">{category.description}</p>
          </Link>
        );
      })}
    </div>
  );
}

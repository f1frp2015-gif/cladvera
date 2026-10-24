import Image from "next/image";

/** The approved Fold V4 lockup, including its proportional clearspace. */
export default function BrandLogo({ className = "", reverse = false }: { className?: string; reverse?: boolean }) {
  return (
    <Image
      src={`/images/brand/cladvera-fold-v4-horizontal${reverse ? "-reverse" : ""}.svg`}
      alt=""
      aria-hidden="true"
      width={939.085784491}
      height={235.5417528}
      className={className}
      loading="eager"
      unoptimized
    />
  );
}

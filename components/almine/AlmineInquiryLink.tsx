import { almineInquiryHref } from "@/lib/almine-inquiry";

export default function AlmineInquiryLink({ productName }: { productName?: string }) {
  return (
    <a
      href={almineInquiryHref(productName)}
      className="inline-flex items-center justify-center rounded-control border border-accent bg-accent px-[18px] py-[10px] text-f14 font-semibold text-paper transition-colors hover:bg-accent-hover"
    >
      Ask about ALMINE availability →
    </a>
  );
}

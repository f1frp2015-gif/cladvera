import { compactwoodInquiryHref } from "@/lib/compactwood-inquiry";

export default function CompactwoodInquiryLink({ productName }: { productName?: string }) {
  return (
    <a
      href={compactwoodInquiryHref(productName)}
      className="inline-flex items-center justify-center rounded-control border border-accent bg-accent px-[18px] py-[10px] text-f14 font-semibold text-paper transition-colors hover:bg-accent-hover"
    >
      Request Compactwood project pricing →
    </a>
  );
}

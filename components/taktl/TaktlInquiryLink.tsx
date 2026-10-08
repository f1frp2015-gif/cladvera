import { taktlInquiryHref } from "@/lib/taktl-inquiry";

export default function TaktlInquiryLink({ productName }: { productName?: string }) {
  return (
    <a
      href={taktlInquiryHref(productName)}
      className="inline-flex items-center justify-center rounded-control border border-accent bg-accent px-[18px] py-[10px] text-f14 font-semibold text-paper transition-colors hover:bg-accent-hover"
    >
      Request TAKTL project pricing →
    </a>
  );
}

import { site } from "@/content/data/site";

export function compactwoodInquiryHref(productName?: string) {
  const subject = `Compactwood panel inquiry${productName ? ` — ${productName}` : ""}`;
  const body = [
    "Hello Cladvera,",
    "",
    `Please advise sourcing and project options for ${productName ?? "Compactwood panels"}.`,
    "",
    "Project name and location:",
    "Exterior or interior application:",
    "Approximate area or quantity:",
    "Panel size and finish preferences:",
    "Required tests and code documents:",
    "Target schedule:",
    "",
    "Please confirm the exact offered construction, samples, documents and quotation process.",
  ].join("\n");
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

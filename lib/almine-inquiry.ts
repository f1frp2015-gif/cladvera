import { site } from "@/content/data/site";

export function almineInquiryHref(productName?: string) {
  const subject = `ALMINE panel inquiry${productName ? ` — ${productName}` : ""}`;
  const body = [
    "Hello Cladvera,",
    "",
    `Please advise sourcing and project options for ${productName ?? "ALMINE metal composite panels"}.`,
    "",
    "Project name and location:",
    "Application and building type:",
    "Approximate area or quantity:",
    "Finish and size preferences:",
    "Required fire or performance reports:",
    "Target schedule:",
    "",
    "Please let me know the available construction, documents, samples and pricing process.",
  ].join("\n");
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

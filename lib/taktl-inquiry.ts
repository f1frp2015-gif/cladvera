import { site } from "@/content/data/site";

export function taktlInquiryHref(productName?: string) {
  const subject = `TAKTL project inquiry${productName ? ` — ${productName}` : ""}`;
  const body = [
    "Hello Cladvera,",
    "",
    `I would like to discuss ${productName ?? "TAKTL architectural UHPC products"} for a project.`,
    "",
    "Project name and location:",
    "Approximate panel area or quantities:",
    "Color, texture and finish:",
    "Target schedule:",
    "Drawings or specification links:",
    "",
    "Please advise availability, samples, budget pricing and next steps.",
  ].join("\n");

  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

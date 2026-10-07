import type { Metadata } from "next";
import { site } from "@/content/data/site";

export const SITE_URL = site.url;

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: site.brand,
  url: SITE_URL,
  description: `${site.brand} supplies exterior phenolic (HPL) compact panels, UHPC facade panels, aluminum composite (ACM) panels and real-wood veneer panels from audited Chinese mills to fabricators, distributors and contractors in the United States and Canada.`,
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Canada" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: site.contact.email,
    availableLanguage: ["English", "Chinese"],
    areaServed: ["US", "CA"],
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: site.brand,
  description: site.tagline,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  /** Pages that must never be indexed (forms, privacy) regardless of stage. */
  noindex?: boolean;
}

const SEO_LENIENT = process.env.SEO_LENIENT === "1";

function enforceSeoLimits(path: string, title: string, description: string) {
  const violations: string[] = [];
  if (title.length > 60) {
    violations.push(`title is ${title.length} chars (max 60): "${title}"`);
  }
  if (description.length < 120) {
    violations.push(`description is ${description.length} chars (min 120): "${description.slice(0, 80)}..."`);
  }
  if (description.length > 160) {
    violations.push(`description is ${description.length} chars (max 160): "${description.slice(0, 80)}..."`);
  }
  if (violations.length === 0) return;
  const msg = `[seo] ${path}\n  - ${violations.join("\n  - ")}`;
  if (SEO_LENIENT) {
    console.warn(msg);
    return;
  }
  throw new Error(`${msg}\n\nSet SEO_LENIENT=1 to downgrade to a warning.`);
}

/**
 * Page metadata with the same guard rails as f1composite.com: titles at most
 * 60 characters and descriptions between 120 and 160, enforced at build time.
 * While `site.stage` is "draft" every page is sent as noindex.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  noindex = false,
}: PageMetadataOptions): Metadata {
  enforceSeoLimits(path, title, description);
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const blockIndexing = noindex || site.stage === "draft";

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: blockIndexing ? { index: false, follow: !noindex } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: site.brand,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

interface WebPageSchemaOptions {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "CollectionPage" | "ItemPage" | "FAQPage" | "AboutPage" | "ContactPage";
  dateModified?: string;
}

export function buildWebPageSchema({
  name,
  description,
  path,
  type = "WebPage",
  dateModified,
}: WebPageSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    ...(dateModified && { dateModified }),
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqSchema(faq: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

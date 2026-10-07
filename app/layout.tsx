import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DraftNotice from "@/components/layout/DraftNotice";
import JsonLd from "@/components/seo/JsonLd";
import { RegionProvider, regionBootstrapScript } from "@/components/region/RegionProvider";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { site } from "@/content/data/site";
import "./globals.css";

const dmSans = localFont({
  src: "./fonts/dm-sans-latin.woff2",
  weight: "400 800",
  style: "normal",
  display: "swap",
  variable: "--font-dm-sans",
});

const dmMono = localFont({
  src: [
    { path: "./fonts/dm-mono-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-mono-latin-500.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
  preload: false,
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: {
    default: `${site.brand} | Architectural Panels for North America`,
    template: `%s | ${site.brand}`,
  },
  description: site.tagline,
  metadataBase: new URL(site.url),
  robots: site.stage === "draft" ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.brand,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  verification: {
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION && { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION && {
      other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION },
    }),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`} data-region="US">
      <head>
        <script id="region-bootstrap" dangerouslySetInnerHTML={{ __html: regionBootstrapScript }} />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-[16px] focus:top-[10px] focus:z-[100] focus:rounded-control focus:bg-paper focus:px-[16px] focus:py-[8px] focus:text-ink focus:shadow-card"
        >
          Skip to content
        </a>
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
        <RegionProvider>
          <DraftNotice />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </RegionProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

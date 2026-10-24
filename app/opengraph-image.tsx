import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/data/site";

export const alt = `${site.brand} — Material shapes architecture`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/images/brand/cladvera-fold-v4-horizontal.svg"), "base64");
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "44px 64px", background: "#F3F0E8", color: "#292D2B", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #b7b8ae", paddingBottom: 24 }}>
        {/* ImageResponse consumes the local outlined SVG directly. */}
        <img src={`data:image/svg+xml;base64,${logo}`} width={330} height={82.77} alt="Cladvera" />
        <div style={{ fontSize: 13, letterSpacing: 2 }}>ARCHITECTURAL MATERIALS</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 88, lineHeight: 1.04, letterSpacing: -5 }}>
        <div>Material shapes</div>
        <div style={{ color: "#C9633E" }}>architecture.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #b7b8ae", paddingTop: 24, fontSize: 17, color: "#565a52" }}>
        <div>Facade panels & interior surfaces</div>
        <div>UHPC / Metal composite / HPL / GFRP</div>
      </div>
    </div>,
    { ...size },
  );
}

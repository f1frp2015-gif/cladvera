import { ImageResponse } from "next/og";
import { site } from "@/content/data/site";

export const alt = `${site.brand} — Material shapes architecture`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "52px 64px", background: "#f6f4ef", color: "#242722", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #b7b8ae", paddingBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="#984b37"><path d="M37 3H3v34h34v-5H8V8h29V3Z" /><path d="M32 13H13v14h19v-5H18v-4h14v-5Z" /></svg>
          <div style={{ fontSize: 30, letterSpacing: 3 }}>CLADVERA</div>
        </div>
        <div style={{ fontSize: 13, letterSpacing: 2 }}>ARCHITECTURAL MATERIALS</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 88, lineHeight: 1.04, letterSpacing: -5 }}>
        <div>Material shapes</div>
        <div style={{ color: "#984b37" }}>architecture.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #b7b8ae", paddingTop: 24, fontSize: 17, color: "#565a52" }}>
        <div>Facade panels & interior surfaces</div>
        <div>UHPC / Metal composite / HPL / GFRP</div>
      </div>
    </div>,
    { ...size },
  );
}

import { ImageResponse } from "next/og";
import { site } from "@/content/data/site";

export const alt = `${site.brand} architectural panels`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#1f2630",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36, fontWeight: 700 }}>
          <div style={{ width: 36, height: 36, background: "#8f3f1b", borderRadius: 6 }} />
          <div style={{ display: "flex" }}>{site.brand}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 54, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>
            Architectural panels for North American fabricators, distributors and contractors
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#c9ccd1" }}>{`Phenolic HPL · UHPC · ACM · Wood veneer · ${site.origin}`}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}

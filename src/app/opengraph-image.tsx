import { ImageResponse } from "next/og";
import { profile } from "@/lib/site";

export const alt = `${profile.name}, Full-Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#141517",
          color: "#edece7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 28, color: "#b0afa8" }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid rgba(237,236,231,0.25)",
              borderRadius: 8,
              color: "#edece7",
              fontWeight: 800,
              fontSize: 22,
            }}
          >
            EC
          </div>
          {profile.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 86, fontWeight: 800, lineHeight: 0.95, letterSpacing: -2 }}>
          <span>I BUILD DIGITAL PRODUCTS</span>
          <span>THAT SOLVE REAL PROBLEMS.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#b0afa8" }}>
          <span>Full-Stack Developer, {profile.location}</span>
          <span style={{ color: "#8199ff" }}>Web apps, API integrations, AI automation</span>
        </div>
      </div>
    ),
    size,
  );
}

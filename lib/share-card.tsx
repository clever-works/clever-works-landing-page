import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Social share card (Open Graph + Twitter) built from the site's own palette, icon and tagline.
export const shareCardSize = { width: 1200, height: 630 };

export async function renderShareCard() {
  const icon = await readFile(join(process.cwd(), "public", "clever-works-icon.png"));
  const iconSrc = `data:image/png;base64,${icon.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", background: "linear-gradient(135deg,#0d252e 0%,#102c36 55%,#15333c 100%)", color: "#f5f8f7" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={iconSrc} width={96} height={96} alt="" />
          <span style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1 }}>Clever Works</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 76, fontWeight: 600, letterSpacing: -3, lineHeight: 1.05 }}>Building Ideas.</span>
          <span style={{ fontSize: 76, fontWeight: 600, letterSpacing: -3, lineHeight: 1.05, color: "#65e5c1" }}>Creating Impact.</span>
        </div>
        <span style={{ fontSize: 28, color: "#a1b4b3" }}>Web Development &amp; Digital Solutions</span>
      </div>
    ),
    shareCardSize,
  );
}

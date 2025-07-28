// app/api/og/route.tsx
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") || "Judul Default";
  const imageName = searchParams.get("image") || "default.jpg";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          backgroundImage: `url(https://${req.headers.get("host")}/${imageName})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Overlay gelap transparan */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(2px)",
          }}
        />
        {/* Teks judul */}
        <div
          style={{
            position: "relative",
            padding: "40px 80px",
            color: "white",
            fontSize: 48,
            fontWeight: 700,
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1050,
      height: 549,
    }
  );
}

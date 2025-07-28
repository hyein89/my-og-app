import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

// Preload Google Font (Poppins Bold)
const poppins = fetch(
  new URL("../../public/fonts/Poppins-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const fontData = await poppins;
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") || "Judul Default";
  const imageUrl = searchParams.get("image") || "https://via.placeholder.com/1200x630.png";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 60,
          fontFamily: "Poppins",
        }}
      >
        {/* background image with dark overlay */}
        <img
          src={imageUrl}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)", // dark overlay
          }}
        />
        <div
          style={{
            padding: "0 60px",
            zIndex: 10,
            textAlign: "center",
            textShadow: "2px 2px 10px rgba(0,0,0,0.7)",
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Poppins",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}

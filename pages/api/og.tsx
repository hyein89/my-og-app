// pages/api/og.tsx
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

// Optional: pakai font Inter dari Google Fonts (langsung via URL)
const inter = fetch(
  "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTcviYDQjOKzaj7t9F4g.ttf"
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const fontData = await inter;

  const { searchParams } = new URL(req.url);
  const title =
    searchParams.get("title") ||
    "Fall Marathoners: It’s Time to Up the Miles and Find Your Pace";

  const image =
    searchParams.get("image") ||
    "https://static01.nyt.com/images/2023/08/22/multimedia/21MARATHON-TRAINING-BUILDING1-blwc/21MARATHON-TRAINING-BUILDING1-blwc-facebookJumbo.jpg";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          padding: "60px 80px",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: 60,
            fontFamily: "Inter",
            fontWeight: "bold",
            maxWidth: 900,
            textShadow: "0 2px 10px rgba(0,0,0,0.7)",
          }}
        >
          {title}
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}

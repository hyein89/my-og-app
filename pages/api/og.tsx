import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

// 👇 Pre‑load the custom font once at module level
const cheltenham = fetch(
  new URL("../../styles/cheltenham-italic-700.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

/**
 * Example: /api/og?url=https://example.com/post/hello-world
 */
export default async function handler(req: NextRequest) {
  const fontData = await cheltenham;

  const { searchParams } = new URL(req.url);
  const pageUrl = searchParams.get("url") || "";

  // TODO: Replace this with real DB/query logic ─ this is only an example
  const { title, image } = {
    title: "Fall Marathoners: It’s Time to Up the Miles and Find Your Pace",
    image:
      "https://static01.nyt.com/images/2023/08/22/multimedia/21MARATHON-TRAINING-BUILDING1-blwc/21MARATHON-TRAINING-BUILDING1-blwc-facebookJumbo.jpg",
  };

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
          fontWeight: 600,
          color: "white",
        }}
      >
        <h1
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            margin: 0,
            fontSize: 50,
            fontFamily: "NYT Cheltenham",
            maxWidth: 900,
            whiteSpace: "pre-wrap",
            letterSpacing: -1,
          }}
        >
          {title}
        </h1>
      </div>
    ),
    {
      width: 1050,
      height: 549,
      fonts: [
        {
          name: "NYT Cheltenham",
          data: fontData,
        },
      ],
    }
  );
}

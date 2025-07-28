// app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get('title') || 'Judul Default';
  const image = searchParams.get('image') || 'mountains.jpg';

  // Buat full path ke file public
  const imageUrl = `https://${req.headers.get('host')}/${image}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {/* Background image */}
        <img
          src={imageUrl}
          alt="OG"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Overlay gelap */}
        <div
          style={{
            position: 'absolute',
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            width: '100%',
            height: '100%',
          }}
        />

        {/* Title */}
        <h1
          style={{
            color: 'white',
            fontSize: 72,
            padding: '0 60px',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {title}
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

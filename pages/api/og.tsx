// pages/api/og.tsx
import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get('title') || 'Judul Default';
  const imageUrl = searchParams.get('image') || 'https://my-og-app.vercel.app/mountains.jpg';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          position: 'relative',
          fontFamily: 'sans-serif',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Background Image */}
        <img
          src={imageUrl}
          alt="OG Background"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(4px) brightness(0.6)', // Blur dan agak gelap
          }}
        />

        {/* Title Text */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            padding: '0 80px',
            textAlign: 'center',
            lineHeight: 1.2,
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

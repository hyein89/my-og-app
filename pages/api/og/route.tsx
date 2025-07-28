import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get('title') || 'Judul Default';
  const imageName = searchParams.get('image') || 'default.jpg';
  const host = req.headers.get('host');
  const imageUrl = `https://${host}/${imageName}`;

  return new ImageResponse(
    (
      <div style={{
        width: '1200px',
        height: '630px',
        position: 'relative',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
      }}>
        {/* Background image dengan object-fit contain */}
        <img
          src={imageUrl}
          alt="OG Image"
          style={{
            position: 'absolute',
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            zIndex: 0,
          }}
        />

        {/* Overlay gelap tipis agar teks terbaca */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1,
        }} />

        {/* Judul */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          color: 'white',
          fontSize: 60,
          fontWeight: 'bold',
          textAlign: 'center',
          padding: '0 80px',
          lineHeight: 1.2,
        }}>
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

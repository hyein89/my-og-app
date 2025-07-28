import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

// Aktifkan fitur edge
export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title') || 'Tanpa Judul';
  const imageName = searchParams.get('image') || 'default.jpg'; // image di folder /public/

  const imageUrl = `${req.nextUrl.origin}/${imageName}`;

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
          fontFamily: 'Poppins',
        }}
      >
        {/* Gambar latar belakang */}
        <img
          src={imageUrl}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />

        {/* Overlay gelap semi transparan */}
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(3px)',
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        />

        {/* Judul */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            color: 'white',
            fontSize: 64,
            fontWeight: 700,
            padding: '0 80px',
            textAlign: 'center',
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
          name: 'Poppins',
          data: await fetch(
            'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfedw.woff'
          ).then((res) => res.arrayBuffer()),
          style: 'normal',
        },
      ],
    }
  );
}

// app/api/og/route.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'Judul Default'
  const image = searchParams.get('image') || 'mountains.jpg'

  // image path lengkap ke gambar di folder /public
  const host = req.headers.get('host') || 'localhost:3000'
  const imageUrl = `https://${host}/${image}`

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
        {/* Gambar latar */}
        <img
          src={imageUrl}
          alt="OG Image"
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
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            width: '100%',
            height: '100%',
          }}
        />

        {/* Judul */}
        <div
          style={{
            color: '#fff',
            fontSize: 64,
            padding: '0 100px',
            textAlign: 'center',
            zIndex: 1,
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
  )
}

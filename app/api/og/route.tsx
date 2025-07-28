// app/api/og/route.tsx
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

// Ukuran OG image standar
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') || 'Judul Kosong'
  const imageName = searchParams.get('image') || 'mountains.jpg'

  // Ambil font dari public
  const fontPath = path.join(process.cwd(), 'public', 'Poppins-Bold.ttf')
  const fontData = fs.readFileSync(fontPath)

  // URL gambar publik (harus udah ada di /public)
  const imageUrl = `https://my-og-app.vercel.app/${imageName}`

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
          color: 'white',
          fontFamily: 'Poppins',
          fontSize: 60,
          fontWeight: 'bold',
        }}
      >
        {/* Gambar utama */}
        <img
          src={imageUrl}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'contain', // Biar gambar nggak dipotong
            backgroundColor: 'black',
            filter: 'brightness(0.5)',
          }}
        />

        {/* Tulisan judul */}
        <div
          style={{
            position: 'relative',
            textAlign: 'center',
            padding: '0 60px',
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Poppins',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}

import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get('title') || 'Judul Kosong';
  const imageName = searchParams.get('image') || 'default.jpg';

  const imageUrl = `https://${req.headers.get('host')}/${imageName}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontSize: 60,
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        {/* Background Image */}
        <img
          src={imageUrl}
          alt="bg"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.5) blur(1px)',
          }}
        />

        {/* Title */}
        <span style={{ zIndex: 1 }}>{title}</span>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

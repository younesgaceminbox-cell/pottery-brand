import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Pottery Brand';
    const description = searchParams.get('description') || 'Handcrafted Algerian Pottery';

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 128,
            background: 'linear-gradient(135deg, #A0633A 0%, #C85A2F 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontFamily: 'system-ui',
            flexDirection: 'column',
            padding: '40px',
          }}
        >
          <div style={{ fontSize: '72px', fontWeight: 'bold', marginBottom: '20px' }}>
            🏺
          </div>
          <div style={{ fontSize: '64px', fontWeight: 'bold', marginBottom: '20px' }}>
            {title}
          </div>
          <div style={{ fontSize: '32px', opacity: 0.8 }}>
            {description}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    return new Response('Failed to generate image', { status: 500 });
  }
}

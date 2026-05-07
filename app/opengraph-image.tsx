import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${site.brand.name} — ${site.brand.tagline}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.18), transparent 60%), linear-gradient(180deg, #0b0b0d 0%, #060607 100%)',
          color: '#fff',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 26,
            letterSpacing: '-0.01em',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
            }}
          >
            ◎
          </div>
          {site.brand.name}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 22,
              padding: '10px 18px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.18)',
              alignSelf: 'flex-start',
              color: 'rgba(255,255,255,0.78)',
            }}
          >
            ● {site.hero.eyebrow}
          </div>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: '-0.035em',
              maxWidth: 1040,
            }}
          >
            AI systems that run the work you don’t have time for.
          </div>
          <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.7)', maxWidth: 900 }}>
            Production AI agents and automations for Norwich SMEs · Internal AI for larger teams.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 22,
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          <span>{site.brand.domain}</span>
          <span>Norwich · UK</span>
        </div>
      </div>
    ),
    { ...size },
  );
}

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { site } from '@/content/site';
import { siteSchemaBundle } from '@/lib/schema';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.brand.url),
  title: {
    default: `${site.brand.name} — ${site.brand.tagline}`,
    template: `%s · ${site.brand.name}`,
  },
  description: site.hero.description,
  applicationName: site.brand.name,
  keywords: [
    'AI automation agency Norwich',
    'AI agents Norfolk',
    'business automation Norwich',
    'CRM automation UK',
    'internal AI assistant',
    'workflow automation',
  ],
  authors: [{ name: site.brand.name }],
  creator: site.brand.name,
  alternates: { canonical: site.brand.url },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: site.brand.url,
    siteName: site.brand.name,
    title: `${site.brand.name} — ${site.brand.tagline}`,
    description: site.hero.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.brand.name} — ${site.brand.tagline}`,
    description: site.hero.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = siteSchemaBundle();
  return (
    <html lang="en-GB" className={inter.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          // JSON-LD is safe — content is fully controlled by us
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}

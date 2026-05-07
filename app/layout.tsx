import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://norfolkai.co.uk'),
  title: {
    default: 'NorfolkAI — AI Automation Agency Norwich',
    template: '%s · NorfolkAI',
  },
  description:
    'NorfolkAI builds production AI agents and automations for Norwich SMEs — and private internal AI for larger teams. Lead generation, onboarding, marketing and operations, handled.',
  applicationName: 'NorfolkAI',
  keywords: [
    'AI automation agency Norwich',
    'AI agents Norfolk',
    'business automation Norwich',
    'CRM automation',
    'internal AI assistant',
    'workflow automation UK',
  ],
  authors: [{ name: 'NorfolkAI' }],
  creator: 'NorfolkAI',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://norfolkai.co.uk',
    siteName: 'NorfolkAI',
    title: 'NorfolkAI — AI Automation Agency Norwich',
    description:
      'Production AI agents and automations for Norwich SMEs, plus private internal AI for larger teams.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NorfolkAI — AI Automation Agency Norwich',
    description:
      'Production AI agents and automations for Norwich SMEs, plus private internal AI for larger teams.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}

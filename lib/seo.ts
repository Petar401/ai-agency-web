import type { Metadata } from 'next';
import { site } from '@/content/site';

type BuildMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
};

const defaultDescription = site.hero.description;

export function buildMetadata({
  title,
  description = defaultDescription,
  path = '/',
}: BuildMetadataOptions = {}): Metadata {
  const url = new URL(path, site.brand.url).toString();
  const fullTitle = title ?? `${site.brand.name} — ${site.brand.tagline}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: fullTitle,
      description,
      siteName: site.brand.name,
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}

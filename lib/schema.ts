import { site } from '@/content/site';

const baseUrl = site.brand.url;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}#org`,
    name: site.brand.name,
    url: baseUrl,
    email: site.brand.email,
    telephone: site.brand.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.brand.address.street,
      addressLocality: site.brand.address.locality,
      addressRegion: site.brand.address.region,
      postalCode: site.brand.address.postcode,
      addressCountry: site.brand.address.country,
    },
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}#localbusiness`,
    name: site.brand.name,
    description: site.hero.description,
    url: baseUrl,
    email: site.brand.email,
    telephone: site.brand.phone,
    areaServed: ['Norwich', 'Norfolk', 'United Kingdom'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.brand.address.street,
      addressLocality: site.brand.address.locality,
      addressRegion: site.brand.address.region,
      postalCode: site.brand.address.postcode,
      addressCountry: site.brand.address.country,
    },
    priceRange: '££',
    knowsAbout: [
      'AI automation',
      'AI agents',
      'CRM automation',
      'Internal knowledge assistants',
      'Document automation',
      'Custom AI integrations',
    ],
  };
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${baseUrl}#faq`,
    mainEntity: site.faq.map((entry) => ({
      '@type': 'Question',
      name: entry.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.a,
      },
    })),
  };
}

export function servicesSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${baseUrl}#services`,
    itemListElement: site.services.map((s, i) => ({
      '@type': 'Service',
      position: i + 1,
      name: s.title,
      description: s.blurb,
      provider: { '@id': `${baseUrl}#org` },
    })),
  };
}

export function siteSchemaBundle() {
  return [organizationSchema(), localBusinessSchema(), faqSchema(), servicesSchema()];
}

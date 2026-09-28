import { site, abs } from '../config/site';
import { offers, faq } from '../config/offre';

const orgId = abs('/#organisation');

export const organization = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': orgId,
  name: site.brand,
  url: abs('/'),
  email: site.email,
  ...(site.phone && { telephone: site.phone }),
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressCountry: site.address.country,
  },
  areaServed: site.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
  knowsLanguage: 'fr',
  priceRange: `${Math.min(...offers.map((o) => o.price))}–${Math.max(...offers.map((o) => o.price))} CHF`,
});

export const website = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': abs('/#site'),
  name: site.brand,
  url: abs('/'),
  inLanguage: site.locale,
  publisher: { '@id': orgId },
});

export const service = () => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Création de site internet à prix fixe',
  serviceType: 'Création de site internet',
  provider: { '@id': orgId },
  areaServed: site.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
  offers: offers.map((o) => ({
    '@type': 'Offer',
    name: `Site ${o.name}`,
    description: o.pitch,
    price: o.price,
    priceCurrency: 'CHF',
    url: abs(`/demande/?offre=${o.id}`),
  })),
});

export const faqPage = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

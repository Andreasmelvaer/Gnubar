/**
 * SEO utilities for generating structured data and metadata
 */

export const SITE_URL = 'https://gnubar.no';
export const SITE_NAME = 'Gnu Bar';

export const BUSINESS_INFO = {
  name: 'Gnu Bar',
  address: 'Nedre Strandgate 23, 4005 Stavanger, Norway',
  telephone: '+47 51 56 73 00',
  latitude: 58.9699,
  longitude: 5.7331,
  instagram: 'https://instagram.com/gnu.bar',
  url: SITE_URL,
};

export const OPENING_HOURS = [
  { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'], opens: '16:00', closes: '00:00' },
  { dayOfWeek: ['Friday', 'Saturday'], opens: '15:00', closes: '02:00' },
];

/**
 * Generate LocalBusiness schema
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    name: BUSINESS_INFO.name,
    image: `${SITE_URL}/images/og-image.png`,
    description: 'Bar og live music venue in Stavanger, Norway',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Nedre Strandgate 23',
      addressLocality: 'Stavanger',
      postalCode: '4005',
      addressCountry: 'NO',
    },
    telephone: BUSINESS_INFO.telephone,
    url: BUSINESS_INFO.url,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.latitude,
      longitude: BUSINESS_INFO.longitude,
    },
    priceRange: '$$',
    servesCuisine: ['Norwegian', 'International'],
    openingHoursSpecification: OPENING_HOURS.map(spec => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: spec.dayOfWeek,
      opens: spec.opens,
      closes: spec.closes,
    })),
    sameAs: [BUSINESS_INFO.instagram],
  };
}

/**
 * Generate Event schema
 */
export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    ...(event.endDate && { endDate: event.endDate }),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: BUSINESS_INFO.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Nedre Strandgate 23',
        addressLocality: 'Stavanger',
        postalCode: '4005',
        addressCountry: 'NO',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: BUSINESS_INFO.name,
      url: BUSINESS_INFO.url,
    },
  };
}

/**
 * Generate VideoObject schema
 */
export function generateVideoObjectSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    ...(video.duration && { duration: video.duration }),
    ...(video.contentUrl && { contentUrl: video.contentUrl }),
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/og-image.png`,
    description: 'Bar og live music venue in Stavanger, Norway',
    sameAs: [BUSINESS_INFO.instagram],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Nedre Strandgate 23',
      addressLocality: 'Stavanger',
      postalCode: '4005',
      addressCountry: 'NO',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: BUSINESS_INFO.telephone,
    },
  };
}

/**
 * Generate combined schema for homepage with multiple types
 */
export function generateHomePageSchema() {
  return [
    generateLocalBusinessSchema(),
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
    ]),
  ];
}

/**
 * Helper to combine multiple schemas
 */
export function combineSchemas(...schemas: unknown[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}

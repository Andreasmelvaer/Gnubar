import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gnubar.no';
  const lastModified = new Date();

  return [
    // Homepage
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          nb: baseUrl,
          en: `${baseUrl}/en`,
        },
      },
    },
    // What's On
    {
      url: `${baseUrl}/hva-skjer`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: {
        languages: {
          nb: `${baseUrl}/hva-skjer`,
          en: `${baseUrl}/en/whats-on`,
        },
      },
    },
    // Gnu Sounds
    {
      url: `${baseUrl}/gnu-sounds`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          nb: `${baseUrl}/gnu-sounds`,
          en: `${baseUrl}/en/gnu-sounds`,
        },
      },
    },
    // Gnu Raua
    {
      url: `${baseUrl}/gnu-raua`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          nb: `${baseUrl}/gnu-raua`,
          en: `${baseUrl}/en/gnu-raua`,
        },
      },
    },
    // Gnu Raua - Poetry
    {
      url: `${baseUrl}/gnu-raua/poesi`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          nb: `${baseUrl}/gnu-raua/poesi`,
          en: `${baseUrl}/en/gnu-raua/poetry`,
        },
      },
    },
    // About
    {
      url: `${baseUrl}/om`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          nb: `${baseUrl}/om`,
          en: `${baseUrl}/en/about`,
        },
      },
    },
    // History
    {
      url: `${baseUrl}/historie`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          nb: `${baseUrl}/historie`,
          en: `${baseUrl}/en/history`,
        },
      },
    },
    // Booking
    {
      url: `${baseUrl}/booking`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          nb: `${baseUrl}/booking`,
          en: `${baseUrl}/en/booking`,
        },
      },
    },
  ];
}

import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['no', 'en'],
  defaultLocale: 'no',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/hva-skjer': {
      no: '/hva-skjer',
      en: '/whats-on',
    },
    '/gnu-sounds': '/gnu-sounds',
    '/gnu-raua': '/gnu-raua',
    '/gnu-raua/poesi': {
      no: '/gnu-raua/poesi',
      en: '/gnu-raua/poetry',
    },
    '/om': {
      no: '/om',
      en: '/about',
    },
    '/booking': '/booking',
  },
});

export type Locale = (typeof routing.locales)[number];

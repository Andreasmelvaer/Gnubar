import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import messagesNo from '@/messages/no.json';
import messagesEn from '@/messages/en.json';

const messages = {
  no: messagesNo,
  en: messagesEn,
};

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || routing.defaultLocale;

  // Validate that the incoming locale is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    return {
      locale: routing.defaultLocale,
      messages: messages[routing.defaultLocale],
    };
  }

  return {
    locale,
    messages: messages[locale as keyof typeof messages],
    timeZone: 'Europe/Oslo',
    now: new Date(),
  };
});

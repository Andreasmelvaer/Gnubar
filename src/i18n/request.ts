import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import messagesNo from '@/messages/no.json';
import messagesEn from '@/messages/en.json';
import { getMessagesWithCMSOverrides } from '@/lib/content';

const staticMessages = {
  no: messagesNo,
  en: messagesEn,
};

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || routing.defaultLocale;

  // Validate that the incoming locale is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    const messages = await getMessagesWithCMSOverrides(
      staticMessages[routing.defaultLocale] as Record<string, unknown>,
      routing.defaultLocale
    );
    return {
      locale: routing.defaultLocale,
      messages,
    };
  }

  const validLocale = locale as 'no' | 'en';
  const messages = await getMessagesWithCMSOverrides(
    staticMessages[validLocale] as Record<string, unknown>,
    validLocale
  );

  return {
    locale,
    messages,
    timeZone: 'Europe/Oslo',
    now: new Date(),
  };
});

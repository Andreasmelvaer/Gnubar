import { createClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';

// Direct Supabase client for server-side content fetching (no cookies needed)
function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

interface ContentRow {
  key: string;
  value_no: string;
  value_en: string;
}

/**
 * Convert flat key-value pairs to nested object
 * e.g. { "home.heroTitle": "Gnu Bar" } => { home: { heroTitle: "Gnu Bar" } }
 */
function buildNestedObject(items: ContentRow[], locale: 'no' | 'en'): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const item of items) {
    const value = locale === 'en' ? item.value_en : item.value_no;
    if (!value) continue;

    const keys = item.key.split('.');
    let current: Record<string, unknown> = result;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]] || typeof current[keys[i]] !== 'object') {
        current[keys[i]] = {};
      }
      current = current[keys[i]] as Record<string, unknown>;
    }

    current[keys[keys.length - 1]] = value;
  }

  return result;
}

/**
 * Deep merge source into target, source values take precedence
 */
function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };

  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(
        target[key] as Record<string, unknown>,
        source[key] as Record<string, unknown>
      );
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

/**
 * Fetch site content from Supabase, cached for 60 seconds
 */
const fetchSiteContent = unstable_cache(
  async (): Promise<ContentRow[]> => {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('site_content')
        .select('key, value_no, value_en');

      if (error) {
        console.error('Failed to fetch site content:', error);
        return [];
      }

      return data || [];
    } catch (err) {
      console.error('Site content fetch error:', err);
      return [];
    }
  },
  ['site-content'],
  { revalidate: 60 } // Cache for 60 seconds
);

/**
 * Get messages with CMS overrides merged in.
 * DB content takes priority over static JSON translations.
 */
export async function getMessagesWithCMSOverrides(
  staticMessages: Record<string, unknown>,
  locale: 'no' | 'en'
): Promise<Record<string, unknown>> {
  const contentRows = await fetchSiteContent();

  if (contentRows.length === 0) {
    return staticMessages;
  }

  const cmsOverrides = buildNestedObject(contentRows, locale);
  return deepMerge(staticMessages, cmsOverrides);
}

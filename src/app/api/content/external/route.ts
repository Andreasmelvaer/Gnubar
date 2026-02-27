import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';

function validateApiKey(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return false;
  const key = authHeader.slice(7);
  return key === process.env.CONTENT_API_KEY;
}

// GET: List all content keys with current values
export async function GET(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: 'Unauthorized. Provide Bearer token in Authorization header.' }, { status: 401 });
  }

  try {
    const supabase = await createServiceRoleClient();
    const { data, error } = await supabase
      .from('site_content')
      .select('key, section, value_no, value_en, updated_at')
      .order('section')
      .order('sort_order');

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
    }

    return NextResponse.json({
      content: data || [],
      total: data?.length || 0,
      usage: {
        description: 'Use PUT to update content. Send items array with key, value_no, and value_en.',
        example: {
          items: [
            { key: 'home.heroTitle', value_no: 'Ny norsk tekst', value_en: 'New English text' }
          ]
        }
      }
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT: Update content items (both languages required)
export async function PUT(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: 'Unauthorized. Provide Bearer token in Authorization header.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({
        error: 'Missing or empty items array',
        expected: { items: [{ key: 'string', value_no: 'string', value_en: 'string' }] }
      }, { status: 400 });
    }

    // Validate each item
    for (const item of items) {
      if (!item.key || typeof item.key !== 'string') {
        return NextResponse.json({ error: `Invalid item: missing or invalid 'key'`, item }, { status: 400 });
      }
      if (!item.value_no || typeof item.value_no !== 'string') {
        return NextResponse.json({ error: `Invalid item for key '${item.key}': missing 'value_no' (Norwegian text)`, item }, { status: 400 });
      }
      if (!item.value_en || typeof item.value_en !== 'string') {
        return NextResponse.json({ error: `Invalid item for key '${item.key}': missing 'value_en' (English text)`, item }, { status: 400 });
      }
    }

    const supabase = await createServiceRoleClient();

    // Verify all keys exist first
    const keys = items.map((i: { key: string }) => i.key);
    const { data: existing } = await supabase
      .from('site_content')
      .select('key')
      .in('key', keys);

    const existingKeys = new Set((existing || []).map((r: { key: string }) => r.key));
    const invalidKeys = keys.filter((k: string) => !existingKeys.has(k));

    if (invalidKeys.length > 0) {
      return NextResponse.json({
        error: 'Some keys do not exist in the database',
        invalidKeys,
        hint: 'Use GET to see all available keys'
      }, { status: 400 });
    }

    // Update each item
    const results = [];
    for (const item of items as Array<{ key: string; value_no: string; value_en: string }>) {
      const { error } = await supabase
        .from('site_content')
        .update({
          value_no: item.value_no,
          value_en: item.value_en,
          updated_at: new Date().toISOString()
        })
        .eq('key', item.key);

      results.push({ key: item.key, success: !error, error: error?.message });
    }

    const failed = results.filter(r => !r.success);
    if (failed.length > 0) {
      return NextResponse.json({ partial: true, updated: results.filter(r => r.success).length, failed }, { status: 207 });
    }

    return NextResponse.json({
      success: true,
      updated: results.length,
      note: 'Changes will appear on gnubar.no within ~60 seconds'
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

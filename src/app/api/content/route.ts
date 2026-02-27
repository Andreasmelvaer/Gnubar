import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleClient, createServerSupabaseClient } from '@/lib/supabase/server';

// Public: fetch all site content
export async function GET() {
  try {
    const supabase = await createServiceRoleClient();

    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .order('section')
      .order('sort_order');

    if (error) {
      console.error('Content fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
    }

    return NextResponse.json({ content: data || [] });
  } catch (error) {
    console.error('Content API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Admin: update site content
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { items } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Missing items array' }, { status: 400 });
    }

    const serviceClient = await createServiceRoleClient();

    // Update each item
    const updates = items.map((item: { key: string; value_no: string; value_en: string }) =>
      serviceClient
        .from('site_content')
        .update({ value_no: item.value_no, value_en: item.value_en, updated_at: new Date().toISOString() })
        .eq('key', item.key)
    );

    await Promise.all(updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Content PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

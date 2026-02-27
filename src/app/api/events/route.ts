import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleClient, createServerSupabaseClient } from '@/lib/supabase/server';

// Public: fetch published events
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServiceRoleClient();
    const { searchParams } = new URL(request.url);
    const includeRecurring = searchParams.get('recurring') === 'true';

    if (includeRecurring) {
      // Fetch recurring events separately
      const { data: recurring, error: recurringError } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .eq('is_recurring', true)
        .order('recurring_day', { ascending: true });

      if (recurringError) {
        console.error('Recurring events fetch error:', recurringError);
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
      }

      return NextResponse.json({ events: recurring || [] });
    }

    // Fetch upcoming non-recurring events
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_published', true)
      .eq('is_recurring', false)
      .gte('date', new Date().toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (error) {
      console.error('Events fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }

    return NextResponse.json({ events: events || [] });
  } catch (error) {
    console.error('Events API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Admin: create event
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title_no, title_en, description_no, description_en, event_type, date, time, is_recurring, recurring_day, recurring_frequency, is_published } = body;

    if (!title_no || !event_type || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const serviceClient = await createServiceRoleClient();
    const { data, error } = await serviceClient
      .from('events')
      .insert({
        title_no,
        title_en: title_en || null,
        description_no: description_no || null,
        description_en: description_en || null,
        event_type,
        date,
        time,
        is_recurring: is_recurring || recurring_frequency !== 'none',
        recurring_day: recurring_day || null,
        recurring_frequency: recurring_frequency || 'none',
        is_published: is_published !== false,
      })
      .select()
      .single();

    if (error) {
      console.error('Event insert error:', error);
      return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
    }

    return NextResponse.json({ event: data });
  } catch (error) {
    console.error('Events POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

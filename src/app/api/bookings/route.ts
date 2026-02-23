import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { sendBookingNotification, sendBookingConfirmation } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, date, eventType, message, newsletterOptIn } = body;

    // Validate
    if (!name || !email || !date || !eventType || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createServiceRoleClient();

    // Save booking
    const { error: bookingError } = await supabase
      .from('bookings')
      .insert({
        name,
        email,
        desired_date: date,
        event_type: eventType,
        message,
        newsletter_opt_in: newsletterOptIn || false,
      });

    if (bookingError) {
      console.error('Booking insert error:', bookingError);
      return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 });
    }

    // If newsletter opt-in, add to subscribers
    if (newsletterOptIn) {
      await supabase
        .from('newsletter_subscribers')
        .upsert(
          { email, name, source: 'booking', is_active: true },
          { onConflict: 'email' }
        );
    }

    // Send email notifications (don't block the response)
    sendBookingNotification({
      name,
      email,
      date,
      eventType,
      message,
      newsletterOptIn: newsletterOptIn || false,
    }).catch(console.error);

    sendBookingConfirmation(email, name).catch(console.error);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient, createServiceRoleClient } from '@/lib/supabase/server';
import { sendNewsletter } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Verify auth
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { subject, bodyHtml } = body;

    if (!subject || !bodyHtml) {
      return NextResponse.json({ error: 'Missing subject or body' }, { status: 400 });
    }

    // Fetch active subscribers
    const serviceClient = await createServiceRoleClient();
    const { data: subscribers, error } = await serviceClient
      .from('newsletter_subscribers')
      .select('email, unsubscribe_token')
      .eq('is_active', true);

    if (error || !subscribers) {
      return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
    }

    // Add unsubscribe link to each email
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gnubar.no';
    const emails = subscribers.map(s => s.email);

    // For now, send with a generic unsubscribe footer
    const htmlWithFooter = `
      ${bodyHtml}
      <hr style="margin-top: 32px; border: none; border-top: 1px solid #eee;" />
      <p style="font-size: 12px; color: #999; text-align: center;">
        Du mottar denne e-posten fordi du har abonnert på nyheter fra Gnu Bar.<br/>
        <a href="${baseUrl}/api/newsletter/unsubscribe?token=UNSUBSCRIBE_TOKEN" style="color: #999;">Meld deg av</a>
      </p>
    `;

    await sendNewsletter(subject, htmlWithFooter, emails);

    // Log the send
    await serviceClient.from('newsletter_sends').insert({
      subject,
      body_html: bodyHtml,
      sent_by: user.email,
      sent_to_count: emails.length,
    });

    return NextResponse.json({ success: true, sentCount: emails.length });
  } catch (error) {
    console.error('Newsletter send error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

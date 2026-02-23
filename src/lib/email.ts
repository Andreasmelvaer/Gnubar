import { Resend } from 'resend';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set');
  return new Resend(key);
}

interface BookingNotification {
  name: string;
  email: string;
  date: string;
  eventType: string;
  message: string;
  newsletterOptIn: boolean;
}

export async function sendBookingNotification(booking: BookingNotification) {
  const eventTypeLabels: Record<string, string> = {
    konsert: 'Konsert',
    dj: 'DJ-kvelder',
    privat: 'Privat event',
    bedrift: 'Bedriftsfest',
    bryllup: 'Bryllup',
    annet: 'Annet',
  };

  try {
    await getResend().emails.send({
      from: 'Gnu Bar Booking <noreply@gnubar.no>',
      to: ['andrea.olsen2000@gmail.com'],
      subject: `Ny booking: ${booking.name} — ${eventTypeLabels[booking.eventType] || booking.eventType}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #3C4932;">Ny bookingforespørsel</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Navn:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">E-post:</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${booking.email}">${booking.email}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Ønsket dato:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.date}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Type:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${eventTypeLabels[booking.eventType] || booking.eventType}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Nyhetsbrev:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.newsletterOptIn ? 'Ja' : 'Nei'}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-left: 4px solid #3C4932;">
            <p style="margin: 0; font-weight: bold;">Melding:</p>
            <p style="margin: 8px 0 0;">${booking.message}</p>
          </div>
          <p style="margin-top: 24px; color: #999; font-size: 12px;">Sendt fra bookingskjemaet på gnubar.no</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send booking notification:', error);
    throw error;
  }
}

export async function sendBookingConfirmation(to: string, name: string) {
  try {
    await getResend().emails.send({
      from: 'Gnu Bar <noreply@gnubar.no>',
      to: [to],
      subject: 'Takk for din forespørsel — Gnu Bar',
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #3C4932;">Hei ${name}!</h2>
          <p>Takk for din bookingforespørsel. Vi har mottatt den og vil ta kontakt så snart vi kan.</p>
          <p>Har du spørsmål i mellomtiden? Ring oss på <strong>51 56 73 00</strong>.</p>
          <p style="margin-top: 24px;">Hilsen,<br/><strong>Gnu Bar</strong><br/>Nedre Strandgate 23, Stavanger</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send booking confirmation:', error);
    // Don't throw — confirmation email is nice-to-have
  }
}

export async function sendNewsletter(subject: string, bodyHtml: string, recipients: string[]) {
  const results = [];
  // Send in batches of 50 to avoid rate limits
  for (let i = 0; i < recipients.length; i += 50) {
    const batch = recipients.slice(i, i + 50);
    try {
      const result = await getResend().batch.send(
        batch.map(email => ({
          from: 'Gnu Bar <noreply@gnubar.no>',
          to: [email],
          subject,
          html: bodyHtml,
        }))
      );
      results.push(result);
    } catch (error) {
      console.error(`Failed to send batch starting at ${i}:`, error);
    }
  }
  return results;
}

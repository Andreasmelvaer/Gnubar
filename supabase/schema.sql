-- Gnu Bar CMS Database Schema
-- Run this in the Supabase SQL editor to set up all tables

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_no TEXT NOT NULL,
  title_en TEXT,
  description_no TEXT,
  description_en TEXT,
  event_type TEXT NOT NULL DEFAULT 'annet',
  date DATE NOT NULL,
  time TIME NOT NULL,
  is_recurring BOOLEAN DEFAULT false,
  recurring_day TEXT, -- 'monday', 'tuesday', etc.
  image_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  desired_date DATE NOT NULL,
  event_type TEXT NOT NULL,
  message TEXT,
  newsletter_opt_in BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  source TEXT DEFAULT 'booking',
  is_active BOOLEAN DEFAULT true,
  unsubscribe_token UUID DEFAULT gen_random_uuid(),
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ
);

-- Newsletter sends
CREATE TABLE IF NOT EXISTS newsletter_sends (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  body_html TEXT NOT NULL,
  sent_by TEXT,
  sent_to_count INTEGER DEFAULT 0,
  sent_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_events_date ON events (date);
CREATE INDEX IF NOT EXISTS idx_events_published ON events (is_published);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings (status);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON bookings (created_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscribers (is_active);
CREATE INDEX IF NOT EXISTS idx_newsletter_token ON newsletter_subscribers (unsubscribe_token);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_sends ENABLE ROW LEVEL SECURITY;

-- Public can read published events
CREATE POLICY "Public can read published events" ON events
  FOR SELECT USING (is_published = true);

-- Authenticated users can do everything with events
CREATE POLICY "Admin full access to events" ON events
  FOR ALL USING (auth.role() = 'authenticated');

-- Anyone can insert bookings (public form)
CREATE POLICY "Public can insert bookings" ON bookings
  FOR INSERT WITH CHECK (true);

-- Authenticated users can read/update bookings
CREATE POLICY "Admin full access to bookings" ON bookings
  FOR ALL USING (auth.role() = 'authenticated');

-- Anyone can insert newsletter subscribers (public form)
CREATE POLICY "Public can subscribe" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Public can update their own subscription via token
CREATE POLICY "Public can unsubscribe via token" ON newsletter_subscribers
  FOR UPDATE USING (true);

-- Authenticated users can manage subscribers
CREATE POLICY "Admin full access to subscribers" ON newsletter_subscribers
  FOR ALL USING (auth.role() = 'authenticated');

-- Only authenticated users can manage newsletter sends
CREATE POLICY "Admin full access to sends" ON newsletter_sends
  FOR ALL USING (auth.role() = 'authenticated');

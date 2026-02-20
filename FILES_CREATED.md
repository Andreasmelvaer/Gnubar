# Gnu Bar Website - Pages Created

All files have been successfully created with Next.js 14+ App Router structure, TypeScript, and Tailwind CSS design system.

## Created Files

### 1. `/src/app/hva-skjer/page.tsx` — Events / What's On Page
- **Title:** Hva Skjer (with gnu-headline styling)
- **Features:**
  - Section for "Faste innslag" (recurring weekly events)
  - List of upcoming events in brutalist card layout (gnu-card)
  - Event types: Quiz, Konsert, DJ, Music Bingo, Vinyl Listening Party, Søndagsskolen, Jazz Jam
  - Each card displays: date, title, time, type badge (gnu-badge), description
  - Color-coded event cards using: bg-gnu-green, bg-gnu-red
  - Metadata export with title
- **All text in Norwegian**

### 2. `/src/app/gnu-sounds/page.tsx` — Gnu Sounds Video Page
- **Title:** Gnu Sounds (with gnu-headline)
- **Features:**
  - Grid layout for video cards (responsive: 1 column mobile, 2 columns desktop)
  - 4 sample video entries with artist names, dates, descriptions
  - Each card is a gnu-card with placeholder video area (colored div)
  - Uses bg-gnu-green styling
  - Metadata export with title
- **All text in Norwegian**

### 3. `/src/app/gnu-raua/page.tsx` — Gnu-Rauå Story Page
- **Title:** Gnu-Rauå (with gnu-headline)
- **Subtitle:** "Stavangers mest unødvendige monument — og hvorfor det betyr noe"
- **Features:**
  - Dark green section (bg-gnu-green) with cream text for atmosphere
  - Placeholder paragraph for full story
  - Link to `/gnu-raua/poesi` reading "Les Rauspikka Poesi →"
  - Metadata export with title
- **All text in Norwegian**

### 4. `/src/app/gnu-raua/poesi/page.tsx` — Poetry Page (Critical)
- **Title:** Rauspikka Poesi
- **Features:**
  - THREE POEMS INCLUDED VERBATIM (no edits or corrections):
    1. "Tenk hvis eg hadde vært Gnu-rauå!" by Svein Erik «store-gnu» Reienes
    2. "Jobbsøknad – GNU RAU søke veggplass (og anerkjennelse)" by Hilde «lille-gnu» Finbak
    3. "Ode te ei rau" by Marthe «mellom-gnu» Reienes
  - Each poem in its own section with dark green background (bg-gnu-green text-gnu-cream)
  - Poet names with gnu-nicknames displayed prominently
  - Uses monospace formatting for poems (font-serif, whitespace-pre-wrap)
  - "Tilbake til Gnu-Rauå →" navigation link at bottom
  - Metadata export with title
- **All text in Norwegian**

### 5. `/src/app/om/page.tsx` — About Page
- **Title:** Om Gnu (with gnu-headline)
- **Features:**
  - Main description of the bar with design colors (bg-gnu-red)
  - Key statement: "På Gnu kan du sitte og se utover Vågen, på alle de andre flokkdyrene"
  - Features section with 4 brutalist cards:
    - Musikkbar (bg-gnu-green)
    - Quiz & Underholdning (bg-gnu-gold)
    - Mat & Drikke (bg-gnu-olive)
    - Utsikt & Miljø (bg-gnu-red)
  - Opening hours section (bg-gnu-green)
  - Metadata export with title
- **All text in Norwegian**

### 6. `/src/app/booking/page.tsx` — Booking & Contact Page
- **Marked as 'use client'** for form interactivity
- **Title:** Booking & Kontakt (with gnu-headline)
- **Features:**
  - Booking information section (bg-gnu-black)
  - Contact details cards displaying:
    - Barsjef: Andrea (bg-gnu-green)
    - Telefon: 51 56 73 00 (bg-gnu-red)
    - Adresse: Nedre Strandgate 23 (bg-gnu-gold)
    - Hours (bg-gnu-olive)
  - Functional contact form with:
    - Name input
    - Email input
    - Date picker
    - Event type dropdown (Konsert, DJ, Privat event, Bedriftsfest, Bryllup, Annet)
    - Message textarea
    - Submit button with hover state
  - Form uses React hooks (useState, FormEvent)
  - Metadata export with title
- **All text in Norwegian**

## Design System Used

All pages utilize the existing Gnu Bar design system:

### Colors:
- `bg-gnu-green` (dark green background)
- `bg-gnu-cream` (cream background)
- `bg-gnu-red` (red background)
- `bg-gnu-gold` (gold/yellow background)
- `bg-gnu-olive` (olive/dark yellow background)
- `text-gnu-cream` (cream text)
- `text-gnu-black` (black text)

### Classes:
- `gnu-headline` — Road Rage font for big headlines
- `gnu-card` — Brutalist card styling with borders
- `gnu-badge` — Event type badges with uppercase tracking

### Typography:
- All headlines use `gnu-headline` class
- Cards use `gnu-card` class
- Brutalist aesthetic with thick borders (border-4 border-gnu-black)
- Bold, uppercase text for labels and headings
- Tracking-wider for uppercase text

## Technical Specifications

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **All text:** Norwegian
- **Metadata:** Properly exported from each page
- **Form:** Client-side component with 'use client' directive

## Notes

- Poetry page includes all three poems EXACTLY as provided (verbatim, no corrections)
- All recurring and upcoming events are sample data for demonstration
- Booking form is structured but backend integration ready (no actual submission yet)
- All pages follow brutalist design aesthetic with thick borders and bold typography
- Responsive design patterns applied throughout

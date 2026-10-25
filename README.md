# Evangelist Tolucci — Official Website & Digital Ministry Platform

A premium, spiritually grounded digital home and ministry platform for **Evangelist Tolulope Timothy (Tolucci)**, gospel minister, prophetic psalmist, and founder of **The MASS Movement** (Music And Sound Summit).

Built in accordance with the project brief at `/Users/chronicles/Documents/Everything Anything/Dev/tolucci-website`.

---

## 🌟 Strategic Highlights & Features

### 1. Visual Identity & Art Direction

- **Editorial Aesthetic:** Restrained luxury, cinematic darkness (`#0A0A0D`, `#121217`), warm ivory (`#FAF8F5`, `#DCD6CC`), and muted warm gold (`#C5A880`, `#E0CCA9`, `#98784D`).
- **Typography:** Sophisticated serif (`Playfair Display`) paired with clean modern sans-serif (`Plus Jakarta Sans`).
- **Layout:** Spacious, deliberate alignment, subtle ambient gold glows, and clean hierarchy.

### 2. Website Structure & Implemented Pages

- **Home (`/`)**:
  - `01. Hero Section`: Striking portrait, headline ("A Voice for Revival. A Life Set Apart for His Presence."), Dual CTAs.
  - `02. Ministry Introduction`: Calling, focus, and link to About page.
  - `03. Featured Message`: High-impact video player modal & audio preview.
  - `04. Daily Devotional Preview`: Today's meditation, scripture text, and one-click reading CTA.
  - `05. Featured Books`: Covers, format options, pricing, and sample excerpt preview.
  - `06. Music & Creative Works`: Discography preview with interactive audio playback.
  - `07. Ministry & Events Highlights`: Revival gatherings, city storms, campus tour itinerary.
  - `08. Audience Growth`: Newsletter and devotional subscription card.
- **About (`/about`)**:
  - Full biography, early life, spiritual journey, and calling.
  - Vision, mission, and relationship to The MASS Movement.
  - Curated photo gallery of ministry moments.
- **Books (`/books` & `/books/[slug]`)**:
  - Complete literary catalogue (e.g. _The Mantle of Revival_, _Battle at the Gates_, _The Prophetic Minstrel_).
  - Individual detail pages with themes, target audience, format pricing (Paperback, E-Book), sample chapter modal reading, and external buy links (Amazon, Selar).
- **Devotional (`/devotional` & `/devotional/[slug]`)**:
  - Daily devotional archive with search by title, date, or topic tags.
  - Individual reading pages featuring:
    - Scripture of the day with prominent quotation
    - Deep meditation content with drop-cap editorial styling
    - Reflection questions & practical application
    - Consecration closing prayer
    - WhatsApp & X one-click share buttons
    - Previous and Next reading navigation
- **Sermons (`/sermons` & `/sermons/[slug]`)**:
  - Searchable library categorized by topics: Revival, Prayer & Warfare, Holy Spirit, Discipleship, Kingdom Identity.
  - Video modal playback and embedded YouTube video players.
  - Audio player streaming & MP3 download links.
  - Key teaching outlines, scripture references, and transcript previews.
- **Music (`/music`)**:
  - Full discography: _Spirit Of The Prophets (The Album)_, _Spirit Of The Prophets (Vol. 2) (Live)_, _Set Awon Omo Jesu_, _Battle At The Gates_.
  - Interactive playable audio preview tracks (powered by the global floating audio bar).
  - Official video embeds, streaming channels (Apple Music, Spotify, Audiomack, YouTube Music), track credits, and lyric view modals.
- **Contact (`/contact`)**:
  - Ministry engagement form with categorized routing: Invitation to preach, Speaking/conference, Media requests, General enquiries, Book/Music.
  - WhatsApp direct liaison link for urgent itinerary protocol.
- **Privacy Policy (`/privacy`)**:
  - Data protection and consent separation (Devotionals vs. General Newsletter) compliant with NDPA guidelines.
- **Admin Dashboard (`/admin` & `/admin/login`)**:
  - Secretariat CMS: publish devotionals, upload sermons, view/manage enquiries with status badges (`new`, `reviewed`, `responded`), and export subscriber lists to CSV.
  - Access Passcode: `tolucci2026`.

### 3. Core Audience Growth & Interactive Tools

- **First-Visit Subscription Dialog**:
  - _"A DAILY MOMENT WITH GOD — Make room for the Word."_
  - Automatically triggers with a graceful delay on first visit.
  - Separated preferences for Daily Devotionals and Ministry Newsletter.
  - Respects dismissal/subscription state via localStorage.
- **Global Floating Audio Player (`AudioPlayerBar`)**:
  - Continuous audio playback while browsing across any page on the website.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+
- npm (included with Node.js)

### Installation & Running

```bash
# Navigate to the project directory
cd "/Users/chronicles/Documents/Everything Anything/Dev/tolucci-website"

# Install dependencies
npm install

# Run the development server with live updates
npm run dev

# Or build for production and launch
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Admin Dashboard Access

- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Demo Authorization Code:** `tolucci2026` (or `revival`)

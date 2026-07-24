# DekhoAurDekhao – Explore Tourist Places in Odisha

A full-stack tourism website: React + Tailwind frontend, Express backend, showcasing
tourist places across all 30 districts of Odisha, with **Kendrapara as the fully-populated
flagship district**.

## Quick start (frontend + backend together)

```bash
# Terminal 1 — backend
cd backend
npm install
npm run dev          # http://localhost:4000

# Terminal 2 — frontend
npm install
npm run dev           # http://localhost:5173
```

The frontend talks to the backend at `http://localhost:4000/api` by default. Override with
`VITE_API_URL` in a `.env` file if needed (see `.env.example`).

## What's included

**Frontend**
- Home page — animated hero, district selector grid (live theme switching), featured places,
  "why visit" highlights, animated stats counter, testimonials, community CTA.
- Tourist Places page — search + server-side filtering by district and category.
- Place detail page — photo, embedded Google Map, "Get Directions" link, distance & travel
  time, history/significance write-up, best time to visit, entry fee, nearby attractions.
- Login / Signup — real accounts, backed by the API below.
- Submit a Place — logged-in users upload photos/videos and submit new places; they appear
  immediately, tagged "Community".
- District theming engine (`src/data/districts.js`) — all 30 districts, each with its own
  color palette, font pairing and tagline.

**Backend** (`/backend`) — see `backend/README.md` for full details
- Express API with JWT authentication (signup/login, bcrypt-hashed passwords).
- File uploads (Multer) for community-submitted photos/videos, served from `/uploads`.
- Places API with district/category/search filtering.
- Data stored in a JSON file (`backend/data/db.json`) — no database installation required
  for local testing. Swap in MongoDB later by following the guide in `backend/README.md`.

## Project structure

```
src/
  components/   Navbar, Footer, PlaceCard, MapEmbed, DistanceBadge, StatsCounter, DistrictSelector, ProtectedRoute
  context/      ThemeContext (district theming), AuthContext (JWT auth via the API)
  data/         districts.js (all 30 districts + theme tokens), places.js (categories + seed reference)
  hooks/        usePlaces.js (fetch/filter places, submit new places)
  lib/          api.js (fetch client for the backend)
  pages/        Home, About, Contact, TouristPlaces, PlaceDetail, Login, Signup, SubmitPlace, NotFound
backend/
  routes/       auth.js, places.js
  middleware/    auth.js (JWT verification)
  utils/        db.js (JSON-file read/write — swap for Mongoose later)
  data/         db.json (users + places)
  uploads/      community-submitted photos/videos
```

## Adding more districts / places

- **Districts**: all 30 are already defined in `src/data/districts.js` with a color/font theme.
- **Official places**: add entries to `backend/data/db.json` under `places`, following the
  existing shape (coordinates, distance from nearest city, history, category, etc). Kendrapara
  is fully seeded; Puri, Koraput and Mayurbhanj have sample entries to show the pattern.
- **Community places**: added automatically through the "Submit a Place" flow — no manual step.

## Still worth doing before a real deployment

- **Google Maps**: currently uses the key-less `maps.google.com/...&output=embed` iframe (zero
  setup, works immediately). For live distance/travel-time calculation, add the Google Maps
  Distance Matrix API with a billing-enabled key.
- **Hero video**: `src/pages/Home.jsx` references `/public/hero-odisha.mp4` — drop in a real
  muted/looped Odisha landscape reel; it falls back to a still image until you do.
- **Database**: swap the JSON file for MongoDB (or Postgres) once you're ready to deploy — see
  `backend/README.md`.
- **Moderation**: submissions currently publish instantly. Flip `status` to `"pending"` in
  `backend/routes/places.js` and add an admin approval endpoint if you want to review first.

## Tech stack

React 19 (Vite), React Router, Tailwind CSS, Framer Motion, Lucide icons · Node.js, Express,
JWT, bcrypt, Multer.

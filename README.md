# Movie Explorer (CSCI 331 Final)

A simple Next.js app for browsing movies via TMDB, saving favorites locally, and revisiting them later.

## Features
- Browse landing page with trending rows sourced from TMDB.
- Search page that queries TMDB by title and saves movies to localStorage with optional rating/comment.
- "My Stuff" page that reads favorites from localStorage and lists saved movies.
- App Router project with client components and basic global styling.

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TMDB API for movie data
- Supabase client dependency (not required for core flow; available if you add backend features)

## Getting Started
1) Install dependencies:
   ```bash
   npm install
   ```
2) Run the dev server:
   ```bash
   npm run dev
   ```
   The app will be available at http://localhost:3000.

## Environment Variables
Create `.env.local` (already ignored by git) if you want to supply your own keys:
- `NEXT_PUBLIC_TMDB_API_KEY` (optional) – replace the in-code demo key for TMDB requests.
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (optional) – only needed if you add Supabase features.

## Usage
- Home: quick links and two TMDB rows (Trending Now, Top Picks for You). Click a poster to save with an optional rating/comment.
- Browse: search by title, view results in a table, click a row or the Save button to store the movie.
- My Stuff: view everything saved in `localStorage` under `favorites`; shows poster, rating, and comment if provided.

## Scripts
- `npm run dev` – start the development server.
- `npm run build` – production build.
- `npm run start` – run the built app.
- `npm run lint` – lint with ESLint.

## Notes
- Favorites persist in the browser only (no server storage).
- This product uses the TMDB API but is not endorsed or certified by TMDB.

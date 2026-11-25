# Clever Works website

A responsive Next.js App Router website for Clever Works.

## Getting started

1. Install Node.js 20.9 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and set the canonical public site URL.
4. Run `npm run dev` and open `http://localhost:3000`.

`NEXT_PUBLIC_SITE_URL` is used for canonical, Open Graph, JSON-LD, sitemap, and robots metadata. Update it to the verified production domain before deploying. The contact details currently shown on the site are `cleverworksinfo@gmail.com` and `9566072823`. The inquiry form uses the visitor's email application (`mailto:`), so a server-side form endpoint and spam protection should be configured before treating submissions as production-ready.

The portfolio entries are clearly labeled concept explorations. No client results, company statistics, client logos, or testimonials are claimed.

# WESOUL portfolio

Next.js App Router + TypeScript. Responsive single-page company portfolio based on the supplied corporate profile.

## Run

With Node.js 20.9+ and pnpm installed:

```sh
pnpm install
pnpm dev
```

Open http://127.0.0.1:3000. You can also use npm install and npm run dev if pnpm is unavailable (pnpm-lock.yaml is the canonical lockfile).

## Production

```sh
pnpm build
```

The deployable static website is generated in `out/`. Upload its contents to a static hosting provider, or deploy the source to a Next.js-compatible host. There is no server or database requirement.

## Editing

- `app/page.tsx`: content, product data, services, interactions, contact details.
- `app/globals.css`: responsive design and motion.
- `app/layout.tsx`: SEO title, description and favicon.
- `public/images/`: optimized artwork extracted from the supplied corporate profile and logo.
- `public/wesoul-profile.pdf`: downloadable original profile.

Product descriptions are based on the provided PDF. Artwork is illustrative material from that profile, not live product screenshots. Contact links open the visitor's email or phone app; no message is sent automatically. No contact backend, analytics or tracking is configured. Reduced-motion preferences are respected.

On this computer, double-click start-website.cmd to launch using the available Node runtime. Keep its terminal open while browsing. If port 3000 is in use, use the URL printed by Next.js.

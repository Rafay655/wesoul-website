# WESOUL website

Next.js App Router + TypeScript. The approved visual design and page hierarchy are preserved.

## Local development

Run `npm run dev` from `D:\wesoul\website` and open the localhost URL printed by Next.js. The existing pnpm lockfile is the dependency source of truth; use `pnpm install --frozen-lockfile` when installing dependencies.

`npm run build` validates the site and generates a fresh `out/` folder with static HTML, CSS, JavaScript and public assets. Upload the entire contents of `out/` to the static host at the domain root, including `_next/`. Configure clean URLs so `/about` serves `/about.html` and missing routes use `404.html`. Client-side routing, the preloader and the console-only contact form remain available. Images are served directly without a Next.js optimization server. `npm start` (Next.js server mode) does not serve this export; use a static HTTP server for preview. No deployment has been performed.

## Contact behavior

As explicitly requested, a valid submission logs `{ name, company, email, phone, service, message }` with the label `WESOUL enquiry form submission` in the browser console, then shows a centered, dismissible toast for six seconds. Nothing is sent or stored by a backend. Required fields and email format are checked; invalid input remains in the form. Valid submissions reset the form. Product/service enquiry links prefill the message.

This intentionally leaves the production enquiry backend deferred. The visible notice, toast and privacy policy accurately describe console-only behavior. No mail credentials or rate-limiter service are configured.

## Route preloader

`public/loader.mp4` plays muted and inline in a fullscreen white curtain on internal route changes and browser history navigation. Next.js client-side routing and Link prefetching remain in place. The video loops while loading, with a 1.6-second minimum display and short fade. Escape/Skip dismiss the curtain; a 12-second failsafe prevents trapping the visitor. Reduced-motion settings and video playback errors use a static WESOUL fallback. Same-route anchors, downloads, email, telephone, external links and modifier-key clicks keep their normal behavior.

## Environment and launch configuration

Copy `.env.example` to `.env.local` if customization is needed. There are no private service credentials in this version.

- `NEXT_PUBLIC_SITE_URL`: canonical origin, defaults to `https://www.wesoul.net`; only the www or bare HTTPS WESOUL origin is accepted.
- `SITE_ENV=preview`: safe default, noindex metadata/headers, disallow robots and empty sitemap.
- `SITE_ENV=production`: only enable on the approved production build. Development and Vercel preview deployments stay unindexed. Rebuild after changing these values.
- `ENABLE_HSTS=true`: enable only after production HTTPS and domain cutover are verified.

Static exports cannot apply the response headers or hostname redirects defined in Next.js config. Configure security headers, cache headers, HTTPS and the alternate-hostname 301 on the static hosting provider. The existing Next.js rules are retained for development. DNS, certificates and hosting settings have not been changed.

The CSP allows inline Next.js hydration scripts and inline styles; it is not a nonce-based strict CSP. Development also allows eval and WebSocket connections for Fast Refresh. No analytics or third-party embeds are enabled.

## Content and assets

- `app/approved.json`: explicit source headings and approved service/about copy.
- `app/components.tsx`: server-rendered product cards, related content, footer, SEO metadata and schema.
- `app/interactive.tsx`: mobile navigation; `app/contact-form.tsx`: console-only form.
- `app/policies.tsx`: notices matching the current implementation.
- `public/social/`: 26 distinct 1200×630 social cards.
- `public/wesoul-profile.pdf`: compressed 7.1 MB web download; all 16 pages retained.
- `assets/print/wesoul-profile-master.pdf`: original 45.7 MB file, outside public assets and Git-ignored. Preserve this local file separately when transferring the project.

See `V1-HANDOVER.md` for verification and remaining launch dependencies.

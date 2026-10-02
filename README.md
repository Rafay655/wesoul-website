# WESOUL website

Next.js App Router + TypeScript, updated against `WESOUL_Website_Developer_Brief_v2.docx`. The original orange/black visual direction and corporate-profile artwork are retained.

## Run locally

```sh
pnpm install
pnpm dev
```

Open the local URL printed by Next.js. With Node.js 20.9+ available, the existing `start-website.cmd` also launches the site on this computer. `pnpm-lock.yaml` remains the canonical lockfile.

## Verify and build

```sh
pnpm typecheck
pnpm build
```

The build generates the static website in `out/`. No hosting or deployment is required for development.

## Structure

- `app/page.tsx`: homepage.
- `app/[...slug]/page.tsx`: 16 other core marketing routes, three product stories, three insights and three policy pages, generated at build time.
- `app/approved.json`: about/service copy extracted from the supplied brief.
- `app/data.ts`: products, service links, editorial articles, product stories and canonical site URL.
- `app/components.tsx`: reusable server-rendered sections, footer, metadata and structured data.
- `app/interactive.tsx`: responsive navigation, product filters/search and contact form.
- `app/globals.css`: original visual foundation and responsive multi-page styles.
- `app/sitemap.ts`, `app/robots.ts`: static search-discovery files.
- `public/images/`: supplied corporate-profile artwork and logo.
- `public/wesoul-profile.pdf`: original downloadable corporate profile.

## Contact form behavior

As requested, a valid submission logs `{ name, company, email, phone, service, message }` with the label `WESOUL enquiry form submission` to the browser console. A centered, dismissible toast appears for six seconds. No email, API request or database write occurs. Required fields and email format are validated. The form resets after a valid submission.

Product and service enquiry links prefill the message. The interface explicitly describes the form as a preview so visitors are not told a real enquiry has been delivered.

## Content and launch inputs

Product illustrations are not live UI screenshots. Work pages describe product approaches and intended value, not verified client outcomes. See `IMPLEMENTATION-NOTES.md` for source boundaries, verification results and the assets/content to confirm before a public launch.

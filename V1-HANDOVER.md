# V1 development handover — October 3, 2026

The user's latest instructions override the production-contact requirement for now: keep console logging and the centered toast. Hosting/deployment remains out of scope.

## Implemented

- Corrected source heading casing, including AI and sentence starts; Knowledge Systems now uses the same H3/body block as the other AI capabilities.
- Simplified the six-product catalogue; cards now render on the server without shipping the full content dataset to a filtering component.
- Marked every product's illustrative artwork as pending approved real UI screenshots. Existing product CTAs lead to relevant contact/demo enquiries; no store links or client outcomes invented.
- Repositioned Work as Product Stories & Selected Work; preserved the original page design and content architecture.
- Added 0300-7727981 as a telephone link in Contact/footer and Organization schema.
- Added contextual service/product/insight/story links and unique social images for all 26 content pages. Canonical, robots, sitemap and metadata use shared configuration; utility pages are noindex and excluded from the production sitemap.
- Added responsive Next.js images, dimensions and lazy loading; preserved local fonts. Added focus/touch improvements, readable CTA labels and mobile-menu Escape focus restoration.
- Added CSP, anti-framing, content-type, referrer and permissions headers. Prepared canonical 301 and optional HSTS; no live infrastructure changes made.
- Replaced the old curtain artwork with the supplied loader video. Preserved App Router navigation, accessibility fallback, Skip/Escape and timeout behavior.
- Compressed the 16-page company profile to 7,086,955 bytes without reducing image dimensions. Original 45,718,450-byte file retained privately. Rendered all pages and inspected the montage plus a detailed text-heavy page.

## Verification

- Next.js production build and TypeScript pass.
- All 26 generated content pages: unique titles, one H1, parseable JSON-LD, existing social-card assets and valid local link targets checked from generated HTML.
- Local browser: supplied video is playing, muted and inline during route navigation; destination renders after the curtain.
- Local browser: contact submission logs the expected message and shows the truthful centered preview toast; no email service is configured.
- Narrow viewport: contact page has no horizontal overflow; mobile-menu Escape closes it and restores focus to its button.
- `pnpm audit --prod`: zero reported vulnerabilities for the existing lockfile at verification time.

## Remaining launch dependencies

1. Production enquiry endpoint, server validation, durable abuse prevention and verified notification delivery are deliberately deferred. Console-only behavior means P0 launch criteria are not satisfied.
2. Management must confirm the canonical domain (www retained by default), configure DNS/TLS and verify actual redirects and headers on the final deployment.
3. Supply approved screenshots for all six products, current store/product/demo URLs, and any verified client case-study evidence.
4. Choose analytics and any processors/retention policy before adding tracking or delivery; then review the legal notices against that behavior. No conversion event is emitted for a console-only preview submission.
5. Real Android/throttled-network Lighthouse and field Core Web Vitals remain unverified. Responsive checks and the build are not a substitute for that launch test.
6. Final production-domain crawling/schema validation, security-header checks and business/legal sign-off remain open. No deployment was performed or approved by this work.

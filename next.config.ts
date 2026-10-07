import type { NextConfig } from "next";
import { siteUrl } from "./app/site-config";
import { isIndexable } from "./app/indexability";
const production = process.env.NODE_ENV === "production";
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${production ? "" : " 'unsafe-eval'"}`,
  `connect-src 'self'${production ? "" : " ws: wss:"}`,
].join("; ");
const config: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          ...(!isIndexable
            ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]
            : []),
          ...(isIndexable && process.env.ENABLE_HSTS === "true"
            ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }]
            : []),
        ],
      },
    ];
  },
  async redirects() {
    const alternate =
      new URL(siteUrl).hostname === "www.wesoul.net"
        ? "wesoul.net"
        : "www.wesoul.net";
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: alternate }],
        destination: siteUrl + "/:path*",
        statusCode: 301,
      },
    ];
  },
};
// Static deployment has no Next.js server for headers, redirects or image optimization.
// Keep the existing runtime rules available during local development.
export default {
  ...config,
  output: "export",
  images: { ...config.images, unoptimized: true },
  headers: production ? undefined : config.headers,
  redirects: production ? undefined : config.redirects,
} satisfies NextConfig;

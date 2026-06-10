import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://eu.i.posthog.com https://js-de.sentry-cdn.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://eu.i.posthog.com",
  "font-src 'self' data:",
  "connect-src 'self' https://eu.i.posthog.com https://egwxscwpfwuerrxghmnf.supabase.co https://www.google-analytics.com https://www.googletagmanager.com https://o4511541335556096.ingest.de.sentry.io",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: "sav-works",
  project: "sav-works-website",
  silent: !process.env.CI,
});

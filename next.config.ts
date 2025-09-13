import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },

  // Turbopack: ensure correct project root
  turbopack: {
    root: ".",
  },

  // PostHog rewrites (EU)
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },

  // Required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default withSentryConfig(nextConfig, { silent: true });

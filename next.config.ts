import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tell Turbopack the project root (silences the warning)
  turbopack: { root: "." },

  // Keep any flags you actually use here
  experimental: {
    optimizeCss: true
  },

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

  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;

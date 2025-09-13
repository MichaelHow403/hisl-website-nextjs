import type { NextConfig } from "next";
<<<<<<< HEAD

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
=======
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
    GROK_API_KEY: process.env.GROK_API_KEY,
    PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
};

export default withSentryConfig(nextConfig, { silent: true });
>>>>>>> origin/next-main

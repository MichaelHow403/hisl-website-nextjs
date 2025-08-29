import type { NextConfig } from "next";
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

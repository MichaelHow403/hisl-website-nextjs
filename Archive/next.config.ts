import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import { withContentlayer } from "next-contentlayer2";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {}
  },
  env: {
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
    GROK_API_KEY: process.env.GROK_API_KEY,
    PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' vercel.live;
              style-src 'self' 'unsafe-inline' fonts.googleapis.com;
              img-src 'self' data: blob: https:;
              font-src 'self' fonts.gstatic.com;
              connect-src 'self' https: wss:;
              frame-src ${process.env.VERCEL_ENV !== 'production' ? 'https://vercel.live' : "'none'"};
            `.replace(/\n/g, '')
          }
        ]
      }
    ]
  }
};

export default withContentlayer(withSentryConfig(nextConfig, { silent: true }));

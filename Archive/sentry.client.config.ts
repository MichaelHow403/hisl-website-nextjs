import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

// Ensure environment variables are accessed via process.env
const apiKeys = {
  DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
  GROK_API_KEY: process.env.GROK_API_KEY,
  PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY,
};

export { apiKeys };

import * as Sentry from "@sentry/nextjs";

// Only initialize Sentry if DSN is provided
if (process.env.SENTRY_DSN) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isDebugMode = process.env.SENTRY_DEBUG === 'true';
  
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    
    // Performance monitoring
    tracesSampleRate: isDevelopment ? 1.0 : 0.1,
    
    // Session replay
    replaysSessionSampleRate: isDevelopment ? 1.0 : 0.1,
    replaysOnErrorSampleRate: 1.0,
    
    // Environment configuration
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
    
    // Debug mode (only in development or when explicitly enabled)
    debug: isDevelopment || isDebugMode,
    
    // Don't send events in development unless debug is enabled
    enabled: !isDevelopment || isDebugMode,
    
    // Filter out sensitive data
    beforeSend(event) {
      // Remove sensitive headers and data
      if (event.request?.headers) {
        delete event.request.headers['authorization'];
        delete event.request.headers['cookie'];
        delete event.request.headers['x-api-key'];
      }
      
      // Don't send events for health check endpoints
      if (event.request?.url?.includes('/api/health')) {
        return null;
      }
      
      return event;
    },
    
    // Integration configuration - Replay integration may not be available in all versions
    integrations: [],
  });
}

// Ensure environment variables are accessed via process.env
const apiKeys = {
  DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
  GROK_API_KEY: process.env.GROK_API_KEY,
  PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY,
};

export { apiKeys };

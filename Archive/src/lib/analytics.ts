// Analytics Events Tracking System
// Production Enhancement - Analytics Integration

interface AnalyticsEvent {
  name: string;
  category: 'engagement' | 'conversion' | 'performance' | 'error' | 'user_journey';
  properties?: Record<string, unknown>;
  timestamp?: Date;
}

interface UserJourneyStep {
  step: string;
  page: string;
  action: string;
  duration_ms?: number;
}

class AnalyticsTracker {
  private isEnabled: boolean;
  private sessionId: string;
  private userId?: string;

  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production';
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `hisl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Core event tracking
  track(event: AnalyticsEvent): void {
    if (!this.isEnabled) return;

    const enrichedEvent = {
      ...event,
      timestamp: new Date(),
      session_id: this.sessionId,
      user_id: this.userId,
      page_url: typeof window !== 'undefined' ? window.location.pathname : undefined,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined
    };

    // Send to multiple analytics providers
    this.sendToProviders(enrichedEvent);
  }

  private async sendToProviders(event: unknown): Promise<void> {
    // Vercel Analytics
    if (typeof window !== 'undefined') {
      const windowWithVA = window as unknown as { va?: (action: string, name: string, properties?: Record<string, unknown>) => void };
      const eventObj = event as { name: string; properties?: Record<string, unknown> };
      if (windowWithVA.va) {
        windowWithVA.va('track', eventObj.name, eventObj.properties);
      }
    }

    // Custom analytics endpoint (future)
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      try {
        await fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event)
        });
      } catch (error) {
        console.warn('Analytics tracking failed:', error);
      }
    }

    // Console logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event);
    }
  }

  // Specific event methods
  pageView(page: string, properties?: Record<string, unknown>): void {
    this.track({
      name: 'page_view',
      category: 'engagement',
      properties: { page, ...properties }
    });
  }

  aiCommandSubmitted(prompt: string, model: string = 'deepseek'): void {
    this.track({
      name: 'ai_command_submitted',
      category: 'engagement',
      properties: {
        prompt_length: prompt.length,
        model,
        has_construction_keywords: /construction|safety|build|site|manage/i.test(prompt)
      }
    });
  }

  solutionInterest(solutionName: string, action: 'view' | 'click_learn_more'): void {
    this.track({
      name: 'solution_interest',
      category: 'engagement',
      properties: { solution_name: solutionName, action }
    });
  }

  ctaClicked(cta: 'book_demo' | 'download_brief', location: string): void {
    this.track({
      name: 'cta_clicked',
      category: 'conversion',
      properties: { cta_type: cta, location }
    });
  }

  contactAction(method: 'linkedin' | 'substack' | 'email', contact: string): void {
    this.track({
      name: 'contact_action',
      category: 'conversion',
      properties: { method, contact }
    });
  }

  performanceMetric(metric: 'lcp' | 'fcp' | 'cls' | 'fid', value: number): void {
    this.track({
      name: 'performance_metric',
      category: 'performance',
      properties: { metric, value, session_id: this.sessionId }
    });
  }

  errorOccurred(error: Error, context?: string): void {
    this.track({
      name: 'error_occurred',
      category: 'error',
      properties: {
        error_message: error.message,
        error_stack: error.stack?.substring(0, 1000), // Truncate for privacy
        context
      }
    });
  }

  userJourneyStep(step: UserJourneyStep): void {
    this.track({
      name: 'user_journey_step',
      category: 'user_journey',
      properties: step as unknown as Record<string, unknown>
    });
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }
}

// Global analytics instance
export const analytics = new AnalyticsTracker();

// React hook for analytics
export function useAnalytics() {
  return {
    trackPageView: analytics.pageView.bind(analytics),
    trackAICommand: analytics.aiCommandSubmitted.bind(analytics),
    trackSolutionInterest: analytics.solutionInterest.bind(analytics),
    trackCTA: analytics.ctaClicked.bind(analytics),
    trackContact: analytics.contactAction.bind(analytics),
    trackError: analytics.errorOccurred.bind(analytics),
    trackJourneyStep: analytics.userJourneyStep.bind(analytics)
  };
}

// Performance observer for Core Web Vitals
export function initializePerformanceTracking(): void {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint (LCP)
  const lcpObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      analytics.performanceMetric('lcp', entry.startTime);
    }
  });
  lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

  // First Contentful Paint (FCP)
  const fcpObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        analytics.performanceMetric('fcp', entry.startTime);
      }
    }
  });
  fcpObserver.observe({ type: 'paint', buffered: true });

  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const layoutShiftEntry = entry as PerformanceEntry & {
        hadRecentInput?: boolean;
        value: number;
      };
      if (!layoutShiftEntry.hadRecentInput) {
        clsValue += layoutShiftEntry.value;
      }
    }
    analytics.performanceMetric('cls', clsValue);
  });
  clsObserver.observe({ type: 'layout-shift', buffered: true });
}

// GDPR-compliant consent management
export class AnalyticsConsent {
  private static readonly CONSENT_KEY = 'hisl_analytics_consent';

  static hasConsent(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(this.CONSENT_KEY) === 'granted';
  }

  static grantConsent(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.CONSENT_KEY, 'granted');
    // Re-initialize analytics with consent
    initializePerformanceTracking();
  }

  static revokeConsent(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.CONSENT_KEY, 'denied');
    // Clear any stored analytics data
    this.clearAnalyticsData();
  }

  private static clearAnalyticsData(): void {
    // Clear analytics cookies and local storage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('hisl_analytics_') || key.startsWith('_ga')) {
        localStorage.removeItem(key);
      }
    });
  }
}

// Usage examples:
// analytics.pageView('/');
// analytics.aiCommandSubmitted('Analyze construction safety protocols');
// analytics.ctaClicked('book_demo', 'hero_section');
// analytics.solutionInterest('Construction Safety', 'click_learn_more');

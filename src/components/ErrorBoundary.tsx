'use client';
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { analytics } from '@/lib/analytics';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  context?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    
    // Track error in analytics
    analytics.errorOccurred(error, this.props.context || 'ErrorBoundary');
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // Report to Sentry in production
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      // Sentry error reporting (if configured)
      if ((window as any).Sentry) {
        (window as any).Sentry.captureException(error, {
          contexts: {
            react: {
              componentStack: errorInfo.componentStack,
            },
          },
          tags: {
            component: 'ErrorBoundary',
            context: this.props.context
          }
        });
      }
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default HISL-themed error UI
      return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-amber-50 flex items-center justify-center p-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-red-400/30 rounded-2xl p-8 shadow-2xl">
              <div className="text-red-400 text-6xl mb-6">⚠️</div>
              <h1 className="text-2xl font-bold text-amber-400 mb-4">
                System Error Detected
              </h1>
              <p className="text-slate-300 mb-6 leading-relaxed">
                HISL&apos;s industrial intelligence platform encountered an unexpected error. 
                Our engineering team has been automatically notified.
              </p>
              
              <div className="bg-slate-950/60 border border-amber-400/20 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <span className="text-amber-300 text-sm font-semibold">ERROR CONTEXT</span>
                </div>
                <div className="text-slate-400 text-sm">
                  {this.props.context || 'Application Component'}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-black px-6 py-3 rounded-xl font-semibold transition-all shadow-lg"
                >
                  Reload System
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full border border-amber-400/30 text-amber-300 hover:bg-amber-400/10 px-6 py-3 rounded-xl font-semibold transition-all"
                >
                  Return to Home Base
                </button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="text-amber-400 cursor-pointer text-sm font-semibold mb-2">
                    Debug Information
                  </summary>
                  <div className="bg-slate-950/80 border border-red-400/20 rounded p-3 text-xs font-mono text-red-300">
                    <div className="mb-2">
                      <strong>Error:</strong> {this.state.error.message}
                    </div>
                    <div className="mb-2">
                      <strong>Stack:</strong>
                      <pre className="whitespace-pre-wrap text-xs mt-1">
                        {this.state.error.stack}
                      </pre>
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className="whitespace-pre-wrap text-xs mt-1">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Specific error boundary for AI components
export function AIErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      context="AI_Component"
      fallback={
        <div className="bg-slate-900/60 backdrop-blur-xl border border-red-400/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="text-red-400 text-2xl">🤖</div>
            <div>
              <h3 className="text-amber-400 font-semibold">AI System Error</h3>
              <p className="text-slate-400 text-sm">Command processing temporarily unavailable</p>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-amber-600/20 hover:bg-amber-600/40 border border-amber-500/30 text-amber-300 text-sm py-2 px-4 rounded-lg transition-all"
          >
            Restart AI Interface
          </button>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

// Image loading error boundary
export function ImageErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      context="Image_Component"
      fallback={
        <div className="bg-slate-900/60 border border-amber-400/20 rounded-xl p-6 text-center">
          <div className="text-amber-400 text-4xl mb-4">📷</div>
          <p className="text-slate-300 text-sm">Image loading error</p>
          <p className="text-slate-500 text-xs mt-1">Using fallback display</p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

// Navigation error boundary
export function NavigationErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      context="Navigation_Component"
      fallback={
        <div className="bg-slate-900/80 border border-amber-400/20 rounded p-4">
          <div className="text-amber-400 font-semibold">Navigation Error</div>
          <a href="/" className="text-amber-300 text-sm hover:underline">
            Return to Home
          </a>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

// Global app error boundary wrapper
export function GlobalErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary context="Global_Application">
      {children}
    </ErrorBoundary>
  );
}

// Hook for programmatic error reporting
export function useErrorReporting() {
  const reportError = (error: Error, context?: string) => {
    analytics.errorOccurred(error, context);
    
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      if ((window as any).Sentry) {
        (window as any).Sentry.captureException(error);
      }
    } else {
      console.error('Reported error:', error, context);
    }
  };

  return { reportError };
}

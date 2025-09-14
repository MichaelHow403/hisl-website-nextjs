'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';

// Initialize PostHog
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  // Check for Do Not Track
  const doNotTrack = navigator.doNotTrack === '1' || 
                    navigator.doNotTrack === 'yes' || 
                    (window as any).doNotTrack === '1';
  
  if (!doNotTrack) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      
      // Privacy settings
      respect_dnt: true,
      disable_session_recording: true, // Disable by default for privacy
      disable_surveys: true,
      
      // Performance settings
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('PostHog loaded');
        }
      },
      
      // Capture settings
      capture_pageview: false, // We'll handle this manually
      capture_pageleave: true,
      
      // Person profiles
      person_profiles: 'identified_only',
      
      // Autocapture settings
      autocapture: false, // Disable automatic event capture for privacy
      
      // Cross-domain tracking
      cross_subdomain_cookie: false,
      
      // Security
      secure_cookie: true,
    });
  }
}

interface PostHogProviderProps {
  children: React.ReactNode;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views manually
    if (typeof window !== 'undefined' && posthog.__loaded) {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      
      posthog.capture('$pageview', {
        $current_url: url,
        page: pathname,
      });
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}

// Helper functions for tracking events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.capture(eventName, properties);
  }
};

export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.identify(userId, properties);
  }
};

export const resetUser = () => {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.reset();
  }
};

// Check if PostHog is available
export const isPostHogAvailable = () => {
  return typeof window !== 'undefined' && 
         process.env.NEXT_PUBLIC_POSTHOG_KEY && 
         posthog.__loaded;
};

export default PostHogProvider;

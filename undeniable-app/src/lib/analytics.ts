// src/lib/analytics.ts
// src/lib/analytics.ts
import { getStoredConsent } from './consent-store';

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Add this interface at the top of the file, before your functions
interface WindowWithDoNotTrack extends Window {
  doNotTrack?: string;
}

// Verify if analytics should be enabled based on environment and consent
export const isAnalyticsEnabled = (): boolean => {
  return Boolean(
    process.env.NEXT_PUBLIC_APP_ENV === 'production' &&
    GA_MEASUREMENT_ID &&
    getStoredConsent() === 'accepted' &&
    !isDoNotTrackEnabled()
  );
};

// Check if Do Not Track is enabled
export const isDoNotTrackEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;
  const win = window as WindowWithDoNotTrack;
  return Boolean(
    win.doNotTrack === "1" ||
    navigator.doNotTrack === "1" ||
    navigator.doNotTrack === "yes" ||
    (navigator as any).msDoNotTrack === "1"
  );
};

// Types for Google Analytics events
export interface IGAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
}

// Track page views with privacy checks
export const trackPageView = (url: string): void => {
  if (!isAnalyticsEnabled()) return;

  try {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      anonymize_ip: true, // Always anonymize IP
      allow_google_signals: false, // Disable Google signals
      allow_ad_personalization_signals: false // Disable ad personalization
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Track events with privacy checks
export const trackEvent = ({
  action,
  category,
  label,
  value,
  nonInteraction = false
}: IGAEvent): void => {
  if (!isAnalyticsEnabled()) return;

  try {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      non_interaction: nonInteraction,
      anonymize_ip: true
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// Define gtag function globally
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
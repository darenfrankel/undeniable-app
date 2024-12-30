// src/components/analytics-script.tsx
'use client';
import React, { useEffect } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  GA_MEASUREMENT_ID,
  isAnalyticsEnabled,
  trackPageView
} from '@/lib/analytics';
import { getStoredConsent } from '@/lib/consent-store';

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Effect for handling route changes
  useEffect(() => {
    if (getStoredConsent() === 'accepted') {
      const url = pathname + searchParams.toString();
      trackPageView(url);
    }
  }, [pathname, searchParams]);

  // Don't render scripts if analytics is disabled or no consent
  if (!isAnalyticsEnabled() || getStoredConsent() !== 'accepted') {
    return null;
  }

  return (
    <>
      {/* Load GA script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />

      {/* Initialize GA */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_location: window.location.href,
              page_path: '${pathname}${searchParams.toString()}',
              send_page_view: true
            });
            // Respect Do Not Track setting
            if (window.doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack) {
              window['ga-disable-${GA_MEASUREMENT_ID}'] = true;
            }
          `
        }}
      />
    </>
  );
}
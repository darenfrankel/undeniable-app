'use client';

import React, { Suspense } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  GA_MEASUREMENT_ID,
  isAnalyticsEnabled,
  trackPageView
} from '@/lib/analytics';
import { getStoredConsent } from '@/lib/consent-store';

function AnalyticsContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (getStoredConsent() === 'accepted') {
      const url = pathname + searchParams.toString();
      trackPageView(url);
    }
  }, [pathname, searchParams]);

  if (!isAnalyticsEnabled() || getStoredConsent() !== 'accepted') {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
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
            if (window.doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack) {
              window['ga-disable-${GA_MEASUREMENT_ID}'] = true;
            }
          `
        }}
      />
    </>
  );
}

export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent />
    </Suspense>
  );
}
// src/components/cookie-banner.tsx
'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { getStoredConsent, setStoredConsent, type ConsentStatus } from '@/lib/consent-store';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = getStoredConsent();
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  if (!mounted) return null;
  if (!showBanner) return null;

  const handleConsent = (status: ConsentStatus) => {
    setStoredConsent(status);
    setShowBanner(false);
    if (status === 'accepted') {
      window.location.reload(); // Reload to activate analytics
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:p-6 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-600">
            This site uses Google Analytics to help us understand how our tool is being used and to make improvements. 
            We only track anonymous usage data like page views and button clicks - we never track personal information. 
            Additionally, all information you enter in the form stays in your browser and is never sent to any server or saved anywhere. 
            By clicking 'Accept', you allow anonymous usage analytics. You can learn more about our privacy practices in our {' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                Privacy Policy
              </a>{''}
              .
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => handleConsent('rejected')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Decline
            </button>
            <button
              onClick={() => handleConsent('accepted')}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
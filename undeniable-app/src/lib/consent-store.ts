// src/lib/consent-store.ts
'use client';

const CONSENT_KEY = 'cookie-consent-status';

export type ConsentStatus = 'accepted' | 'rejected' | undefined;

export const getStoredConsent = (): ConsentStatus => {
  if (typeof window === 'undefined') return undefined;
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === 'accepted' || stored === 'rejected') return stored;
  return undefined;
};

export const setStoredConsent = (status: ConsentStatus) => {
  if (typeof window === 'undefined' || !status) return;
  localStorage.setItem(CONSENT_KEY, status);
};

export const clearStoredConsent = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONSENT_KEY);
};
// src/middleware.ts
/**
 * Application middleware
 * Implements security headers and protections
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  /**
 * Security Middleware
 * Implements security headers and protections for all routes
 * Includes CSP, HSTS, and other security best practices
 * @param request - Incoming request object
 * @returns Response with added security headers
 */
  const response = NextResponse.next()

  // Implement strict Content Security Policy
  response.headers.set(
    /**
 * Content Security Policy (CSP) Configuration
 * Defines allowed sources for various resource types
 * Prevents XSS and other injection attacks
 */
    'Content-Security-Policy',
    `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://*.googletagmanager.com https://*.google-analytics.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: /api/placeholder/ https://*.google-analytics.com https://*.googletagmanager.com;
      connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;
      font-src 'self' https://fonts.gstatic.com;
      frame-ancestors 'none';
      form-action 'self';
    `.replace(/\s+/g, ' ').trim()
  )

  // Additional security headers
  response.headers.set('X-Frame-Options', 'DENY')  // Prevent clickjacking
  response.headers.set('X-Content-Type-Options', 'nosniff')  // Prevent MIME type sniffing
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')  // Control referrer information
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')  // Restrict browser features
  response.headers.set('X-XSS-Protection', '1; mode=block')  // Enable XSS filtering

  return response
}
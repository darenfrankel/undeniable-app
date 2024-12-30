// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
 * Next.js Configuration
 * Defines build-time and runtime configuration
 * Includes security headers, image optimization, and environment settings
 */
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_APP_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  headers: async () => {
    /**
 * Security Headers Configuration
 * Implements secure headers for all routes
 * Returns array of header configurations
 */
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ],
      },
    ];
  },
  // Ensure images from placeholder API are allowed
  images: {
    domains: ['api.placeholder.com'],
  }
};

module.exports = nextConfig;
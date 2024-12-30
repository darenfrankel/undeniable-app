This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Environment Variables Documentation

## Overview
This document outlines the environment variables used in the Undeniable insurance claims appeal application. Since this is a public repository and the application runs entirely in the browser, we only use environment variables for non-sensitive configuration.

## Environment Variables

### Application Configuration
- `NEXT_PUBLIC_APP_ENV`: Defines the current environment (development/production)
- `NEXT_PUBLIC_APP_URL`: The base URL for the application
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Google Analytics measurement ID

## Security Considerations

### Public Variables
All environment variables in this application are prefixed with `NEXT_PUBLIC_` because:
1. The application runs entirely in the browser
2. These variables need to be accessible at build time and in the client
3. None of these variables contain sensitive information

### What NOT to Store in Environment Variables
Given this is a public repository, never commit:
1. API keys or secrets
2. Private keys or certificates
3. Database credentials
4. Internal URLs or endpoints
5. Personal information or credentials

## Local Development Setup

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Update the values in `.env.local` according to your local setup

3. For production deployment, configure these variables in AWS Amplify's environment variables section

## AWS Amplify Configuration

When deploying to AWS Amplify:
1. Configure environment variables through the Amplify Console
2. Use different values for different branches/environments
3. Never expose sensitive values in the repository or build logs

## Validation
The application includes runtime checks to ensure required environment variables are present:

```typescript
// src/lib/env.ts
export function validateEnv() {
  const required = [
    'NEXT_PUBLIC_APP_ENV',
    'NEXT_PUBLIC_APP_URL'
  ];

  for (const name of required) {
    if (!process.env[name]) {
      throw new Error(`Environment variable ${name} is required`);
    }
  }
}
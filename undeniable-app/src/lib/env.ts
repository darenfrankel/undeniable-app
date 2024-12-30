/**
 * Environment variable validation and type definitions
 */

const requiredEnvVars = [
    'NEXT_PUBLIC_APP_ENV',
    'NEXT_PUBLIC_APP_URL'
] as const;

const optionalEnvVars = [
    'NEXT_PUBLIC_GA_MEASUREMENT_ID'
] as const;

type RequiredEnvVar = typeof requiredEnvVars[number];
type OptionalEnvVar = typeof optionalEnvVars[number];
type EnvVar = RequiredEnvVar | OptionalEnvVar;

/**
 * Validates that all required environment variables are present
 * @throws {Error} If any required environment variables are missing
 */
export function validateEnv(): void {
    const missing = requiredEnvVars.filter(
        (name) => !process.env[name]
    );

    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missing.join(', ')}`
        );
    }
}

/**
 * Type-safe environment variable getter
 * @param name - The name of the environment variable
 * @returns The value of the environment variable
 */
export function getEnvVar(name: RequiredEnvVar): string;
export function getEnvVar(name: OptionalEnvVar): string | undefined;
export function getEnvVar(name: EnvVar): string | undefined {
    return process.env[name];
}

/**
 * Environment configuration object with type-safe access
 */
export const env = {
    appEnv: getEnvVar('NEXT_PUBLIC_APP_ENV'),
    appUrl: getEnvVar('NEXT_PUBLIC_APP_URL'),
    gaMeasurementId: getEnvVar('NEXT_PUBLIC_GA_MEASUREMENT_ID'),

    isProduction: process.env.NEXT_PUBLIC_APP_ENV === 'production',
    isDevelopment: process.env.NEXT_PUBLIC_APP_ENV === 'development',
} as const;
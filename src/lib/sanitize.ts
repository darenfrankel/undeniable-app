// src/lib/sanitize.ts
/**
 * Core validation and sanitization module for form inputs
 * Combines Zod validation with DOMPurify sanitization for secure form handling
 */

import { z } from 'zod';
import DOMPurify from 'dompurify';

/**
 * Sanitizes user input by removing all HTML tags and attributes
 * @param input - Raw user input string
 * @returns Sanitized string with all HTML stripped
 */
export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // Strip all HTML tags
    ALLOWED_ATTR: [] // Strip all attributes
  }).trim();
};

const MAX_INPUT_LENGTH = 30;


/**
 * Creates a Zod schema for string validation with sanitization
 * @param options Configuration options for string validation
 * @param options.minLength Minimum string length
 * @param options.maxLength Maximum string length
 * @param options.pattern Regex pattern for validation
 * @param options.message Custom error message
 * @returns Zod schema with sanitization transform
 */
export const createSanitizedString = (options?: {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
}) => {
  let schema = z.string();

  if (options?.minLength) {
    schema = schema.min(options.minLength,
      options.message || `Must be at least ${options.minLength} characters`);
  }

  schema = schema.max(MAX_INPUT_LENGTH,
    options?.message || `Must be at most ${MAX_INPUT_LENGTH} characters`);

  if (options?.maxLength) {
    schema = schema.max(options.maxLength,
      options.message || `Must be at most ${options.maxLength} characters`);
  }

  if (options?.pattern) {
    schema = schema.regex(options.pattern,
      options.message || 'Invalid format');
  }

  return schema
    .transform(sanitizeInput)
    .transform((str) => str.trim());
};

/**
 * Main form validation schema with sanitization
 * Defines validation rules and sanitization for all form fields
 */
export const formSchema = z.object({
  // Name field: letters and spaces only, 1-30 characters
  name: createSanitizedString({
    minLength: 1,
    maxLength: 30,
    pattern: /^[a-zA-Z\s]*$/,
    message: "Name must contain only letters and spaces"
  }),

  // Insurance company selection: must be a valid selection
  insuranceCompany: z.string().min(1, "Insurance company is required"),

  // State selections: must be valid 2-letter state codes
  stateOfResidence: z.string().length(2, "Please select a valid state"),
  stateOfCare: z.string().length(2, "Please select a valid state"),

  // Claim number: alphanumeric only, 3-30 characters
  claimNumber: createSanitizedString({
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9]*$/,
    message: "Claim number must contain only letters and numbers"
  })
});

export type FormData = z.infer<typeof formSchema>;
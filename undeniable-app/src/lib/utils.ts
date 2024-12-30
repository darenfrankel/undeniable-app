import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  /**
 * Merges Tailwind CSS classes with proper precedence
 * Combines multiple class values and handles conflicts using tailwind-merge
 * @param inputs - Array of class values or conditional class objects
 * @returns Merged class string with proper precedence
 */
  return twMerge(clsx(inputs));
}
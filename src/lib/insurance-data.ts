'use client';

import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { z } from 'zod';

// Define the schema for insurance company data
export const InsuranceCompanySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address").or(z.literal(' ')),
  templateId: z.string().optional(),
});

export type InsuranceCompany = z.infer<typeof InsuranceCompanySchema>;

// Function to load and parse insurance company data from CSV
interface CSVRow {
  name: string;
  email?: string;
}

// Function to load and parse insurance company data from CSV
export async function loadInsuranceCompanies(): Promise<InsuranceCompany[]> {
  try {
    // Fetch the CSV file from the public directory
    const response = await fetch('/data/insurance-companies.csv');
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }

    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse<CSVRow>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            // Validate each row against our schema
            const validatedData = results.data.map((row: CSVRow) => {
              try {
                return InsuranceCompanySchema.parse({
                  name: row.name,
                  email: row.email && row.email.trim() !== '' ? row.email.trim() : ' ',
                });
              } catch (error) {
                console.warn(`Skipping row due to validation error: ${error}`);
                return null;
              }
            }).filter((company): company is InsuranceCompany => company !== null);
            resolve(validatedData);
          } catch (error: unknown) {
            reject(new Error(`CSV validation error: ${error instanceof Error ? error.message : String(error)}`));
          }
        },
        error: (error: Error) => {
          reject(new Error(`CSV parsing error: ${error.message}`));
        }
      });
    });
  } catch (error: unknown) {
    console.error('Error loading insurance companies:', error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}

// Custom hook to manage insurance company data
export function useInsuranceCompanies() {
  const [companies, setCompanies] = useState<InsuranceCompany[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const data = await loadInsuranceCompanies();
        setCompanies(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load insurance companies');
        console.error('Error loading insurance companies:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCompanies();
  }, []);

  return { companies, error, isLoading };
}
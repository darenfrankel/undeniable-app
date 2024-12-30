// src/lib/email-generator.ts
import { FormData } from '@/types/form';
import { InsuranceCompany } from '@/lib/insurance-data';
import { generateEmailBody, generateSubjectLine } from './email-template';

type EmailTemplate = {
  to: string;
  subject: string;
  body: string;
};

/**
 * Generates an email based on form data using the standard template
 * @param formData Validated form data from user input
 * @param companies Array of insurance company data
 * @returns Generated email object with to, subject, and body fields
 */
export function generateEmail(
  formData: FormData, 
  companies: InsuranceCompany[]
): EmailTemplate {
  const company = companies.find(c => c.name === formData.insuranceCompany);
  
  if (!company) {
    throw new Error('Insurance company not found');
  }

  return {
    to: company.email,
    subject: generateSubjectLine(formData.claimNumber),
    body: generateEmailBody({
      name: formData.name,
      claimNumber: formData.claimNumber,
      stateOfResidence: formData.stateOfResidence,
      stateOfCare: formData.stateOfCare
    })
  };
}
import React, { useState, useMemo } from 'react';
import { AlertCircle, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FormData } from './form';
import { InsuranceCompany } from '@/lib/insurance-data';
import { generateEmailBody, generateSubjectLine } from '@/lib/email-template';
import { trackEvent } from '@/lib/analytics';

interface EmailPreviewProps {
  formData: Partial<FormData>;
  companies: InsuranceCompany[];
}

type CopyStates = {
  to: boolean;
  subject: boolean;
  body: boolean;
};

export function EmailPreview({ formData, companies }: EmailPreviewProps) {
  const [copyStates, setCopyStates] = useState<CopyStates>({
    to: false,
    subject: false,
    body: false,
  });

  const placeholderClasses = "text-red-500 font-medium";

  const emailData = useMemo(() => {
    const placeholders = {
      name: formData.name || '[NAME]',
      claimNumber: formData.claimNumber || '[CLAIM NUMBER]',
      stateOfResidence: formData.stateOfResidence || '[STATE OF RESIDENCE]',
      stateOfCare: formData.stateOfCare,
    };

    let toAddress = '';
    let error: string | undefined;

    if (formData.insuranceCompany) {
      if (formData.insuranceCompany === 'Other - not listed') {
        error = 'Email not found, please locate the contact email via your insurance company';
      } else {
        const company = companies.find(c => c.name === formData.insuranceCompany);
        if (!company) {
          error = 'Email not found, please locate the contact email via your insurance company';
        } else {
          toAddress = company.email;
        }
      }
    }

    return {
      to: toAddress,
      error,
      subject: generateSubjectLine(placeholders.claimNumber),
      body: generateEmailBody(placeholders)
    };
  }, [formData, companies]);

  const handleCopyText = async (text: string, field: keyof CopyStates) => {
    if (text.startsWith('[') && text.endsWith(']')) {
      alert('Cannot copy placeholder value. Please fill in the required information first.');
      return;
    }
    await navigator.clipboard.writeText(text);
    setCopyStates(prev => ({ ...prev, [field]: true }));

    trackEvent({
      action: 'copy_content',
      category: 'Email',
      label: field,
    });

    setTimeout(() => {
      setCopyStates(prev => ({ ...prev, [field]: false }));
    }, 1000);
  };

  const handleOpenEmail = () => {
    const { to, subject, body } = emailData;

    trackEvent({
      action: 'open_email_client',
      category: 'Email',
      label: 'mailto_link',
    });

    window.open(`mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100">
      <div className="p-6 space-y-6">
        <div className="border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-semibold text-primary mb-6">Appeal Email</h2>
          <p className="text-sm text-muted-foreground mt-6">
            This is a preview of your email to appeal your denied medical claim.
          </p>
          <p className="text-sm text-muted-foreground mt-6">
            Note: This app does NOT send this email on your behalf. When clicking the the "Open in Email Client" button below the app will attempt to copy the below email into your default email client (e.g. Gmail). If that does not work or you do not have one configured, please copy/paste each section independently.
          </p>
        </div>

        {emailData.error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">
                {emailData.error}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">To:</p>
              <div className="flex items-center gap-2">
                {copyStates.to && (
                  <span className="text-sm text-gray-600 animate-fade-out">
                    Copied!
                  </span>
                )}
                <button
                  onClick={() => handleCopyText(emailData.to, 'to')}
                  className="p-2 text-gray-500 hover:text-blue-600 rounded-md transition-colors"
                  aria-label="Copy email address"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className={cn(
              "text-sm break-all",
              emailData.to ? "text-gray-900" : placeholderClasses
            )}>
              {emailData.to || '[EMAIL ADDRESS]'}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">Subject:</p>
              <div className="flex items-center gap-2">
                {copyStates.subject && (
                  <span className="text-sm text-gray-600 animate-fade-out">
                    Copied!
                  </span>
                )}
                <button
                  onClick={() => handleCopyText(emailData.subject, 'subject')}
                  className="p-2 text-gray-500 hover:text-blue-600 rounded-md transition-colors"
                  aria-label="Copy subject"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-sm">
              {emailData.subject.split(/(\[.*?\])/).map((part, i) => (
                <span key={i} className={part.startsWith('[') ? placeholderClasses : 'text-gray-900'}>
                  {part}
                </span>
              ))}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">Message:</p>
              <div className="flex items-center gap-2">
                {copyStates.body && (
                  <span className="text-sm text-gray-600 animate-fade-out">
                    Copied!
                  </span>
                )}
                <button
                  onClick={() => handleCopyText(emailData.body, 'body')}
                  className="p-2 text-gray-500 hover:text-blue-600 rounded-md transition-colors"
                  aria-label="Copy message"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-sm">
              {emailData.body.split(/(\[.*?\])/).map((part, i) => (
                <span key={i} className={part.startsWith('[') ? placeholderClasses : 'text-gray-900'}>
                  {part}
                </span>
              ))}
            </pre>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={handleOpenEmail}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg
                     font-medium transition-colors hover:bg-blue-700 focus:outline-none 
                     focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Open in Email Client
          </button>
        </div>
      </div>
    </div>
  );
}
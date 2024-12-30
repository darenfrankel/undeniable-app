'use client';

import React, { useState, useMemo } from 'react';
import { useInsuranceCompanies } from '@/lib/insurance-data';
import { Loader2, AlertCircle } from 'lucide-react';
import { InsuranceForm, type FormData } from '@/components/insurance-form/form';
import { EmailPreview } from '@/components/insurance-form/preview';
import { ErrorBoundary } from '@/components/error-boundary';

// Memoized header component to prevent unnecessary re-renders
const Header = React.memo(() => (
  <div className="w-full max-w-[75%] mx-auto text-center py-12 px-4">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
      <span className="text-gray-900">Become </span>
      <span className="text-blue-600 font-bold">UNDENIABLE</span>
    </h1>
    <p className="text-lg md:text-xl text-gray-600 mb-6">
      Appeal denied healthcare claims with our quick, easy, free, and private* email template and generator.
    </p>
    <p className="text-sm md:text-base text-gray-600 mb-6">
      * This application completely runs in your browser - no information you enter is ever saved on our platform.
      If you are concerned about your privacy, feel free to copy the template below and paste it into your own email client.{" "}
      <a href="/about" className="text-blue-600 hover:text-blue-800 underline">
        Learn more here
      </a>
      .
    </p>
    <p className="text-xs md:text-sm text-gray-600">
      By using this tool you agree to our{" "}
      <a href="/terms" className="text-blue-600 hover:text-blue-800 underline">Terms of Use</a>
      .
    </p>
  </div>
));
Header.displayName = 'Header';

// Loading state component
const LoadingState = () => (
  <div className="flex min-h-screen items-center justify-center bg-background p-4">
    <div className="flex items-center space-x-2">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <p className="text-muted-foreground">Loading insurance companies...</p>
    </div>
  </div>
);

// Error state component
const ErrorState = ({ message }: { message: string }) => (
  <div className="flex min-h-screen items-center justify-center bg-background p-4">
    <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4">
      <div className="flex items-center space-x-2">
        <AlertCircle className="h-5 w-5 text-destructive" />
        <p className="text-destructive">{message}</p>
      </div>
    </div>
  </div>
);

// Main form content component
const FormContent = React.memo(({
  companies,
  formData,
  onFormChange
}: {
  companies: any[],
  formData: Partial<FormData>,
  onFormChange: (data: Partial<FormData>) => void
}) => (
  <div className="flex flex-col lg:flex-row min-h-screen">
    <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl ml-auto lg:mr-4">
        <div className="rounded-lg bg-card p-6 shadow-sm">
          <InsuranceForm
            companies={companies}
            onFormChange={onFormChange}
          />
        </div>
      </div>
    </div>
    <div className="w-full border-t border-border bg-muted p-4 lg:w-1/2 lg:border-l lg:border-t-0 lg:p-8">
      <div className="max-w-4xl mr-auto lg:ml-4">
        <div className="mb-4 lg:hidden" />
        <EmailPreview
          formData={formData}
          companies={companies}
        />
      </div>
    </div>
  </div>
));
FormContent.displayName = 'FormContent';

export default function ClaimForm() {
  // State management with proper cleanup
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const { companies, error: companiesError, isLoading } = useInsuranceCompanies();

  // Form change handler with debounce to prevent excessive state updates
  const handleFormChange = React.useCallback((data: Partial<FormData>) => {
    setFormData(data);
  }, []);

  // Render loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Render error state
  if (companiesError) {
    return <ErrorState message="Error loading insurance companies. Please try again later." />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-muted">
        <Header />
        <FormContent
          companies={companies}
          formData={formData}
          onFormChange={handleFormChange}
        />
      </div>
    </ErrorBoundary>
  );
}
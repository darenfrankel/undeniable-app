// src/components/insurance-form/form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormSelect } from '@/components/ui/form-select';
import { states } from '@/data/states';
import { InsuranceCompany } from '@/lib/insurance-data';
import { cn } from '@/lib/utils';
import { sanitizeInput } from '@/lib/sanitize';
import { useEffect } from 'react';

const formSchema = z.object({
  name: z.string().max(30),
  insuranceCompany: z.string().min(1),
  stateOfResidence: z.string().length(2),
  stateOfCare: z.string().length(2),
  claimNumber: z.string().max(30)
});

export type FormData = z.infer<typeof formSchema>;

interface InsuranceFormProps {
  companies: InsuranceCompany[];
  onFormChange: (data: Partial<FormData>) => void;
}

export function InsuranceForm({ companies, onFormChange }: InsuranceFormProps) {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  // Watch specific fields instead of all form values
  const name = watch('name');
  const insuranceCompany = watch('insuranceCompany');
  const stateOfResidence = watch('stateOfResidence');
  const stateOfCare = watch('stateOfCare');
  const claimNumber = watch('claimNumber');

  useEffect(() => {
    const currentValues = {
      name,
      insuranceCompany,
      stateOfResidence,
      stateOfCare,
      claimNumber
    };
    // Only call onFormChange if we have actual values
    if (Object.values(currentValues).some(value => value !== undefined)) {
      onFormChange(currentValues);
    }
  }, [name, insuranceCompany, stateOfResidence, stateOfCare, claimNumber, onFormChange]);

  return (
    <form className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary mb-6">Claim Information</h2>
      <p className="text-sm text-muted-foreground mt-6">
        Each of the below fields are optional. No information entered here is saved by us.
      </p>

      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-primary">
          Name
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          maxLength={30}
          placeholder="Enter your name (letters only)"
          className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground
                   placeholder:text-muted-foreground focus:outline-none focus:ring-2
                   focus:ring-ring focus:border-ring"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <FormSelect
          name="insuranceCompany"
          control={control}
          options={[
            ...companies.map((company) => ({
              value: company.name,
              label: company.name,
            })),
            { value: 'Other - not listed', label: 'Other - not listed' }
          ]}
          label="Insurance Company"
          error={errors.insuranceCompany?.message}
          showOther={true}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <FormSelect
            name="stateOfResidence"
            control={control}
            options={states.map(state => ({
              value: state.code,
              label: `${state.code} - ${state.name}`,
            }))}
            label="State of Residence"
            error={errors.stateOfResidence?.message}
          />
        </div>

        <div className="space-y-2">
          <FormSelect
            name="stateOfCare"
            control={control}
            options={states.map(state => ({
              value: state.code,
              label: `${state.code} - ${state.name}`,
            }))}
            label="State where Care was Received"
            error={errors.stateOfCare?.message}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="claimNumber" className="block text-sm font-medium text-primary">
          Claim Number
        </label>
        <input
          {...register("claimNumber")}
          type="text"
          id="claimNumber"
          maxLength={30}
          placeholder="Enter claim number (letters and numbers only)"
          className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground
                   placeholder:text-muted-foreground focus:outline-none focus:ring-2
                   focus:ring-ring focus:border-ring"
        />
        {errors.claimNumber && (
          <p className="mt-2 text-sm text-destructive">{errors.claimNumber.message}</p>
        )}
      </div>
    </form>
  );
}

'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Control, useController } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Check, ChevronDown, Search } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  control: Control<any>;
  options: Option[];
  label: string;
  error?: string;
  showOther?: boolean;
}

export function FormSelect({
  name,
  control,
  options,
  label,
  error,
  showOther = false
}: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
  });

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  // Filter options based on search
  const filteredOptions = React.useMemo(() => {
    return options.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()) &&
      option.value !== "Other - not listed"
    );
  }, [searchQuery, options]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        event.preventDefault();
        if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
          handleSelect(filteredOptions[activeIndex].value);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        break;
    }
  }, [isOpen, filteredOptions, activeIndex]);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const activeItem = listRef.current.children[activeIndex] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex]);

  const handleSelect = useCallback((value: string) => {
    field.onChange(value);
    setIsOpen(false);
    setSearchQuery('');
    setActiveIndex(-1);
  }, [field]);

  const selectedOption = options.find(option => option.value === field.value);

  const buttonId = `${name}-button`;
  const listboxId = `${name}-listbox`;

  return (
    <div className="space-y-2">
      <label htmlFor={buttonId} className="block text-sm font-medium text-primary">
        {label}
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          id={buttonId}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          className={cn(
            "w-full px-3 py-2 text-sm rounded-md border border-input bg-background",
            "flex items-center justify-between",
            "text-left",
            !field.value && "text-muted-foreground",
            error && "border-destructive",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
          )}
        >
          <span className="block truncate">
            {selectedOption ? selectedOption.label : "Select an option..."}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-card shadow-lg">
            <div className="p-2">
              <div className="flex items-center rounded-md border border-input bg-background px-3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  ref={searchRef}
                  type="text"
                  className="flex w-full bg-background py-2 pl-2 text-sm placeholder:text-muted-foreground focus:outline-none"
                  placeholder={`Search ${label.toLowerCase()}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div
              ref={listRef}
              id={listboxId}
              role="listbox"
              aria-label={label}
              tabIndex={-1}
              className="max-h-[200px] overflow-auto"
            >
              {filteredOptions.length > 0 ? (
                <div className="py-1">
                  {filteredOptions.map((option, index) => (
                    <div
                      key={option.value}
                      role="option"
                      aria-selected={field.value === option.value}
                      tabIndex={-1}
                      className={cn(
                        "flex cursor-pointer items-center justify-between px-3 py-2 text-sm",
                        "hover:bg-accent hover:text-accent-foreground",
                        field.value === option.value && "bg-accent text-accent-foreground",
                        activeIndex === index && "bg-accent text-accent-foreground"
                      )}
                      onClick={() => handleSelect(option.value)}
                    >
                      {option.label}
                      {field.value === option.value && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  No results found
                </div>
              )}

              {showOther && (
                <div className="border-t border-border">
                  <div
                    role="option"
                    aria-selected={field.value === "Other - not listed"}
                    tabIndex={-1}
                    className={cn(
                      "flex cursor-pointer items-center justify-between px-3 py-2 text-sm",
                      "hover:bg-accent hover:text-accent-foreground",
                      field.value === "Other - not listed" && "bg-accent text-accent-foreground"
                    )}
                    onClick={() => handleSelect("Other - not listed")}
                  >
                    Other - not listed
                    {field.value === "Other - not listed" && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {(error || fieldError) && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
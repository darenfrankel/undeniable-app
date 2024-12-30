// src/components/ui/email-modal.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { Copy } from 'lucide-react';

type EmailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  email: {
    to: string;
    subject: string;
    body: string;
  } | null;
};

type CopyState = {
  to: boolean;
  subject: boolean;
  body: boolean;
};

export function EmailModal({ isOpen, onClose, email }: EmailModalProps) {
    /**
   * EmailModal Component
   * Displays a modal with generated email content and provides copy/email client functionality
   * 
   * @prop isOpen - Controls modal visibility
   * @prop onClose - Callback function to close the modal
   * @prop email - Email data object containing to, subject, and body fields
   */
  const modalRef = useRef<HTMLDivElement>(null);
  const [copyStates, setCopyStates] = useState<CopyState>({
      /**
   * Tracks copy button states for different email fields
   * Uses boolean flags to show/hide "Copied!" feedback
   */
    to: false,
    subject: false,
    body: false,
  });

  useEffect(() => {
    /**
     * Handles keyboard events for modal closure
     * Adds and removes event listener for Escape key press
    */
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleCopyText = async (text: string, field: keyof CopyState) => {
      /**
   * Copies text to clipboard and shows feedback
   * @param text - Text content to copy
   * @param field - Field identifier for updating copy state
   */
    await navigator.clipboard.writeText(text);
    setCopyStates(prev => ({ ...prev, [field]: true }));
    setTimeout(() => {
      setCopyStates(prev => ({ ...prev, [field]: false }));
      /**
 * Copy Feedback State
 * Manages temporary feedback displays
 * Automatically clears after delay
 */
    }, 1000);
  };

  const handleOpenEmail = () => {
      /**
   * Opens default email client with pre-populated email
   * Constructs mailto URL with encoded email content
   */
    const mailtoUrl = `mailto:${email?.to}?subject=${encodeURIComponent(email?.subject || '')}&body=${encodeURIComponent(email?.body || '')}`;
    /**
 * Email Client URL Generation
 * Constructs mailto URL with encoded parameters
 * Handles proper escaping of special characters
 */
    window.open(mailtoUrl, '_blank');
  };

  if (!isOpen || !email) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl"
      >
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-blue-600">Generated Email</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-blue-600">To</p>
                <div className="flex items-center gap-2">
                  {copyStates.to && (
                    <span className="text-sm text-gray-600 animate-fade-out">
                      Copied to clipoard!
                    </span>
                  )}
                  <button 
                    onClick={() => handleCopyText(email.to, 'to')}
                    className="p-2 text-gray-600 hover:text-blue-600 rounded transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-900">{email.to}</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-blue-600">Subject</p>
                <div className="flex items-center gap-2">
                  {copyStates.subject && (
                    <span className="text-sm text-gray-600 animate-fade-out">
                      Copied to clipoard!
                    </span>
                  )}
                  <button 
                    onClick={() => handleCopyText(email.subject, 'subject')}
                    className="p-2 text-gray-600 hover:text-blue-600 rounded transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-900">{email.subject}</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-blue-600">Body</p>
                <div className="flex items-center gap-2">
                  {copyStates.body && (
                    <span className="text-sm text-gray-600 animate-fade-out">
                      Copied to clipoard!
                    </span>
                  )}
                  <button 
                    onClick={() => handleCopyText(email.body, 'body')}
                    className="p-2 text-gray-600 hover:text-blue-600 rounded transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <pre className="whitespace-pre-wrap text-gray-900 font-sans">{email.body}</pre>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={handleOpenEmail}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Open in Email Client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
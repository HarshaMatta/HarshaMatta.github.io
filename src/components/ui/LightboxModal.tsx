import React, { useEffect, useRef } from 'react';
import { X, ZoomIn } from 'lucide-react';

export interface LightboxMedia {
  src: string;
  alt: string;
  caption?: string;
}

interface LightboxModalProps {
  media: LightboxMedia | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ media, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!media) return;

    // Save previous active element to restore focus on close
    const previousActiveElement = document.activeElement as HTMLElement | null;

    // Focus close button on mount
    closeButtonRef.current?.focus();

    // Prevent body scroll while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Handle Escape key and keyboard focus trapping
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [media, onClose]);

  if (!media) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={media.caption || media.alt || 'Media Preview'}
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl max-h-[92vh] w-full flex flex-col items-center justify-center bg-surface border border-border-subtle rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="w-full flex items-center justify-between px-5 py-3.5 bg-surface-elevated border-b border-border-subtle">
          <div className="flex items-center space-x-2 text-xs font-mono text-secondary">
            <ZoomIn className="w-3.5 h-3.5 text-accent" />
            <span className="truncate max-w-[280px] sm:max-w-md">
              {media.caption || media.alt}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close image preview"
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface hover:bg-surface-hover border border-border-subtle text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Media Container */}
        <div className="w-full overflow-auto max-h-[75vh] flex items-center justify-center p-4 sm:p-6 bg-canvas/50">
          <img
            src={media.src}
            alt={media.alt}
            className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg shadow-sm"
          />
        </div>

        {/* Caption Bar */}
        {media.caption && (
          <div className="w-full px-5 py-3 bg-surface-elevated border-t border-border-subtle text-xs text-secondary font-sans text-center">
            {media.caption}
          </div>
        )}
      </div>
    </div>
  );
};

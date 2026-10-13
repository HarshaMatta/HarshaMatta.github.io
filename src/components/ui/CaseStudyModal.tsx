import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousElement = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previousElement?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] w-full flex flex-col bg-surface border border-border-subtle rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-surface-elevated">
          <div>
            <h3 className="font-serif text-xl font-bold text-primary">{title}</h3>
            {subtitle && <p className="text-xs font-mono text-accent">{subtitle}</p>}
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close Case Study"
            aria-expanded={isOpen}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface hover:bg-surface-hover border border-border-subtle text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 max-h-[75vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

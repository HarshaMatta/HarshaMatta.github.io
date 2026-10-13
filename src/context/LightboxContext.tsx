import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { LightboxMedia, LightboxContextValue } from '../types';

const LightboxContext = createContext<LightboxContextValue | undefined>(undefined);

export const LightboxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMedia, setActiveMedia] = useState<LightboxMedia | null>(null);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);

  const openLightbox = (media: LightboxMedia, trigger?: HTMLElement | null) => {
    setActiveMedia(media);
    if (trigger) {
      setTriggerElement(trigger);
    }
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setActiveMedia(null);
    if (triggerElement) {
      triggerElement.focus();
      setTriggerElement(null);
    }
  };

  return (
    <LightboxContext.Provider
      value={{
        isOpen,
        activeMedia,
        openLightbox,
        closeLightbox
      }}
    >
      {children}
    </LightboxContext.Provider>
  );
};

export const useLightbox = (): LightboxContextValue => {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider');
  }
  return context;
};

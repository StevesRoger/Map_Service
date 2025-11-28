'use client';

import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { translations, Language } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize language from localStorage after mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      if (saved && (saved === 'en' || saved === 'km')) {
        setLanguageState(saved as Language);
      }
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('language', language);
      // Update document lang attribute for accessibility
      document.documentElement.lang = language === 'km' ? 'km' : 'en';
    }
  }, [language, isInitialized]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState(prev => prev === 'en' ? 'km' : 'en');
  }, []);

  const value: LanguageContextType = useMemo(() => ({
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language],
  }), [language, setLanguage, toggleLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Helper function to translate transaction descriptions
export function translateTransactionDescription(description: string, language: Language | string): string {
  // Ensure language is valid, fallback to 'en' if not
  const validLanguage: Language = (language === 'en' || language === 'km') ? language as Language : 'en';
  
  try {
    // Safety check: ensure translations and wallet exist
    const langTranslations = translations[validLanguage];
    if (!langTranslations || !langTranslations.wallet || !langTranslations.wallet.transactionDescriptions) {
      return description;
    }
    
    const transactionDescriptions = langTranslations.wallet.transactionDescriptions;
    
    // Check if exact match exists
    if (transactionDescriptions[description as keyof typeof transactionDescriptions]) {
      return transactionDescriptions[description as keyof typeof transactionDescriptions];
    }
  } catch (error) {
    // If anything goes wrong, return the original description
    return description;
  }
  
  // Return original description if no translation found
  return description;
}
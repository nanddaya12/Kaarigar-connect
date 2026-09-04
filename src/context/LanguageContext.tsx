import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '../lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('EN');

  useEffect(() => {
    document.documentElement.dir = language === 'UR' ? 'rtl' : 'ltr';
    document.documentElement.lang = language === 'UR' ? 'ur' : 'en';
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['EN']?.[key] || key;
  };

  const isRtl = language === 'UR';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

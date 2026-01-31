import { createContext, useContext, useState, useEffect } from 'react';
import { en, ta } from './translations';

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ta' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key) => {
    const translations = language === 'en' ? en : ta;
    const keys = key.split('.');
    let value = translations;

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  if (!mounted) return null;

  return (
    <I18nContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};

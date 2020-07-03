import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { CountryCode } from 'libphonenumber-js';
import { TranslateOptions } from 'i18n-js';

import {
  getLanguageByDevice,
  translate,
  setLanguageToI18n,
  availableLanguages,
} from '../locale';

interface LanguageContextData {
  language: CountryCode;
  availableLanguages: { label: string; value: string }[];
  changeLanguage(lang: string): void;
  trans(key: string, options?: TranslateOptions): string;
}

const LanguageContext = createContext<LanguageContextData>(
  {} as LanguageContextData,
);

const STORAGE_KEY = '@Phonebook:language';

export const LanguageProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState<CountryCode>('en_US' as CountryCode);

  useEffect(() => {
    async function loadLanguage(): Promise<void> {
      const lang =
        (await AsyncStorage.getItem(STORAGE_KEY)) || getLanguageByDevice();

      setLanguageToI18n(lang);
      setLanguage(lang as CountryCode);
    }

    loadLanguage();
  }, []);

  const changeLanguage = useCallback(async (lang: string) => {
    setLanguageToI18n(lang);
    await AsyncStorage.setItem(STORAGE_KEY, lang);
    setLanguage(lang as CountryCode);
  }, []);

  return (
    <LanguageContext.Provider
      value={{ language, availableLanguages, changeLanguage, trans: translate }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLang(): LanguageContextData {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useAuth must be used within an LanguageContextData!');
  }

  return context;
}

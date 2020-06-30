import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { CountryCode } from 'libphonenumber-js';

interface LanguageContextData {
  language: CountryCode;
  changeLanguage(lang: string): void;
}

const LanguageContext = createContext<LanguageContextData>(
  {} as LanguageContextData,
);

const STORAGE_KEY = '@Phonebook:language';

export const LanguageProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState<CountryCode>('EN' as CountryCode);

  useEffect(() => {
    async function loadLanguage(): Promise<void> {
      const lang = await AsyncStorage.getItem(STORAGE_KEY);

      if (lang) {
        setLanguage(lang as CountryCode);
      }
    }

    loadLanguage();
  }, []);

  const changeLanguage = useCallback(async (lang: string) => {
    await AsyncStorage.setItem(STORAGE_KEY, lang);
    setLanguage(lang as CountryCode);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
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

import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { CountryCode } from 'libphonenumber-js';
import { TranslateOptions } from 'i18n-js';

import {
  translate,
  setLanguageToI18n,
  setCountryLocale,
  setDialCodeLocale,
  availableLanguages,
  getLocale,
  CountryData,
} from '../locale';

interface LocaleContextData {
  language: CountryCode;
  country: CountryData;
  dialCode: string;
  availableLanguages: { label: string; value: string }[];
  changeLanguage(lang: string): void;
  changeCountry(country: CountryData): void;
  changeDialCode(dial: string): void;
  trans(key: string, options?: TranslateOptions): string;
}

const LocaleContext = createContext<LocaleContextData>({} as LocaleContextData);

export const LocaleProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState<CountryCode>('en_US' as CountryCode);
  const [country, setCountry] = useState<CountryData>({} as CountryData);
  const [dialCode, setDialCode] = useState('');

  useEffect(() => {
    async function loadData(): Promise<void> {
      const {
        language: lang,
        country: coun,
        dialCode: dial,
      } = await getLocale();

      setLanguage(lang as CountryCode);
      setCountry(coun);
      setDialCode(dial);
    }

    loadData();
  }, []);

  const changeLanguage = useCallback((lang: string) => {
    setLanguageToI18n(lang);
    setLanguage(lang as CountryCode);
  }, []);

  const changeDialCode = useCallback((dial: string) => {
    setDialCode(dial);
    setDialCodeLocale(dial);
  }, []);

  const changeCountry = useCallback(
    async (data: CountryData) => {
      setCountry(data);
      setCountryLocale(data);
      await changeDialCode(data.dial[0]);
    },
    [changeDialCode],
  );

  return (
    <LocaleContext.Provider
      value={{
        language,
        country,
        dialCode,
        availableLanguages,
        changeLanguage,
        changeCountry,
        changeDialCode,
        trans: translate,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

export function useLocale(): LocaleContextData {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('useAuth must be used within an LocaleContextData!');
  }

  return context;
}

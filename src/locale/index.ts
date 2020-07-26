import AsyncStorage from '@react-native-community/async-storage';
import I18n, { TranslateOptions } from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import { CountryCode } from 'libphonenumber-js';
import en from './en-US';
import pt from './pt-BR';
import countries, { defaultCountry } from './countries';

export const LANG_STORAGE_KEY = '@Phonebook:language';
export const COUNTRY_STORAGE_KEY = '@Phonebook:country';

export interface CountryData {
  label: string;
  name: string;
  value: CountryCode;
  dial: string[];
  defaultLanguage: string;
  languages: string[];
}

export const availableLanguages = [
  {
    label: 'Português',
    value: 'pt_BR',
  },
  {
    label: 'Inglês',
    value: 'en_US',
  },
];

const normalizeTranslate: { [key: string]: string } = {
  en_US: 'en_US',
  pt_BR: 'pt_BR',
  en: 'en_US',
  pt_US: 'pt_BR',
};

const getLanguageByDevice = (): string => {
  const { languageTag } = RNLocalize.getLocales()[0];

  return languageTag.replace('-', '_');
};

const getCountryByDevice = (): CountryData => {
  const { countryCode } = RNLocalize.getLocales()[0];

  return countries.find(a => a.value === countryCode) || defaultCountry;
};

export const setCountryLocale = async (country: CountryData): Promise<void> => {
  await AsyncStorage.setItem(COUNTRY_STORAGE_KEY, JSON.stringify(country));
};

// Idiomas que o I18N irá dar suporte
I18n.translations = {
  en_US: en,
  pt_BR: pt,
};

I18n.defaultLocale = 'en_US';

// Função responsável por verificar se o idioma atual do divice está sendo suportado, caso não ele irá setar como 'en_US'
export const setLanguageToI18n = async (language: string): Promise<void> => {
  const translateNormalize = normalizeTranslate[language];

  // eslint-disable-next-line no-prototype-builtins
  const iHaveThisLanguage = I18n.translations.hasOwnProperty(
    translateNormalize,
  );

  if (iHaveThisLanguage) {
    I18n.locale = translateNormalize;
    await AsyncStorage.setItem(LANG_STORAGE_KEY, translateNormalize);
  } else {
    I18n.locale = 'en_US';
    await AsyncStorage.setItem(LANG_STORAGE_KEY, 'en_US');
  }
};

export async function getLocale(): Promise<{
  country: CountryData;
  language: string;
}> {
  const [langStorage, countryStorage] = await AsyncStorage.multiGet([
    LANG_STORAGE_KEY,
    COUNTRY_STORAGE_KEY,
  ]);

  const country = countryStorage[1]
    ? (JSON.parse(countryStorage[1]) as CountryData)
    : getCountryByDevice();

  const data = {
    language: langStorage[1] || getLanguageByDevice(),
    country,
  };

  return data;
}

export const startI18nLaguage = async (): Promise<string> => {
  const { language } = await getLocale();

  setLanguageToI18n(language);

  return language;
};

export const translate = (key: string, options?: TranslateOptions): string =>
  I18n.t(key, options);

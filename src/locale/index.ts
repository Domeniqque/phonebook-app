import AsyncStorage from '@react-native-community/async-storage';
import { Platform, NativeModules } from 'react-native';
import I18n, { TranslateOptions } from 'i18n-js';

import { CountryCode } from 'libphonenumber-js';
import en from './en-US';
import pt from './pt-BR';
import countries from './countries';

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

// Função que irá nos auxiliar a normalizar as traduções que serão recebidas pela função getLanguageByDevice
// Isso é necessário pois no android e no iOS o retorno do mesmo idioma pode ser diferente
// Exemplo: no iOS podemos receber pt_US e no android pt_BR para o idioma português Brasil.
const normalizeTranslate: { [key: string]: string } = {
  en_US: 'en_US',
  pt_BR: 'pt_BR',
  en: 'en_US',
  pt_US: 'pt_BR',
};

// Função responsável por adquirir o idioma utilizado no device
const getLanguageByDevice = (): string => {
  return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;
};

const getCountryByLanguageDevice = (): CountryData | undefined => {
  const lang = normalizeTranslate[getLanguageByDevice()];

  const countryKey = lang.split('_')[1] as CountryCode;

  return countries.find(a => a.value === countryKey);
};

export const setCountryLocale = async (country: CountryData): Promise<void> => {
  await AsyncStorage.setItem(COUNTRY_STORAGE_KEY, JSON.stringify(country));
};

// Idiomas que o I18N irá dar suporte
I18n.translations = {
  en_US: en,
  pt_BR: pt,
};

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
    I18n.defaultLocale = 'en_US';
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

  const countryStored = countryStorage[1]
    ? (JSON.parse(countryStorage[1]) as CountryData)
    : null;

  const country = (countryStored ||
    getCountryByLanguageDevice()) as CountryData;

  const data = {
    language: langStorage[1] || getLanguageByDevice(),
    country,
  };

  return data;
}

export const startI18nLaguage = async (): Promise<void> => {
  const { language } = await getLocale();
  setLanguageToI18n(language);
};

export const translate = (key: string, options?: TranslateOptions): string =>
  I18n.t(key, options);

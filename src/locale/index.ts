import { Platform, NativeModules } from 'react-native';
import I18n, { TranslateOptions } from 'i18n-js';

import en from './en-US';
import pt from './pt-BR';

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
export const getLanguageByDevice = (): string => {
  return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;
};

// Idiomas que o I18N irá dar suporte
I18n.translations = {
  en_US: en,
  pt_BR: pt,
};

// Função responsável por verificar se o idioma atual do divice está sendo suportado, caso não ele irá setar como 'en_US'
export const setLanguageToI18n = (language: string): void => {
  const translateNormalize = normalizeTranslate[language];

  // eslint-disable-next-line no-prototype-builtins
  const iHaveThisLanguage = I18n.translations.hasOwnProperty(
    translateNormalize,
  );

  iHaveThisLanguage
    ? (I18n.locale = translateNormalize)
    : (I18n.defaultLocale = 'en_US');
};

setLanguageToI18n('en_US');

export const translate = (key: string, options?: TranslateOptions): string =>
  I18n.t(key, options);

import { CountryCode } from 'libphonenumber-js';

import exampleLocales from '../locale/examples.mobile';
import getNumberInstance from './getNumberInstance';

export default function getLocalePhonePlaceholder(
  countryCode: CountryCode,
): string {
  try {
    const phoneExample = exampleLocales[countryCode];
    const phoneExampleInstance = getNumberInstance(phoneExample, countryCode);

    return phoneExampleInstance?.formatNational() || '';
  } catch (err) {
    return '';
  }
}

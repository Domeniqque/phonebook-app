import { CountryCode } from 'libphonenumber-js';

import trim from './trimPhone';
import getNumberInstance from './getNumberInstance';

interface PhoneData {
  nationalValue: string;
  countryCode: string;
  iterableValue: number;
}

export default function getPhoneURI({
  nationalValue,
  countryCode,
  iterableValue,
}: PhoneData): string {
  if (nationalValue && countryCode) {
    const instance = getNumberInstance(
      nationalValue,
      countryCode as CountryCode,
    );

    const linkUri = instance?.getType()
      ? instance.getURI()
      : `tel:${trim(nationalValue)}`;

    return linkUri;
  }

  return `tel:${String(iterableValue)}`;
}

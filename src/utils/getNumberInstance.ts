import { AsYouType, CountryCode, PhoneNumber } from 'libphonenumber-js/max';

export default function getNumberInstance(
  number: string,
  countryCode: CountryCode,
): PhoneNumber | undefined {
  const numberVerifier = new AsYouType(countryCode);
  numberVerifier.input(number);

  return numberVerifier.getNumber();
}

import { PhoneNumber } from 'libphonenumber-js';

interface PhoneParsed {
  areaCode: string;
  number: number;
}

function trim(number: string): string {
  return number.replace(/(\s|-|\+|\(|\))/g, '');
}

export function parsePhone(phoneNumber: PhoneNumber | string): PhoneParsed {
  const fullNumber =
    (phoneNumber as PhoneNumber)?.formatNational() ?? phoneNumber;

  let number = fullNumber || '';
  let areaCode = '';

  // If number is formated with prefix like: (69) 99999-9999
  if (fullNumber.search(/\)/) !== -1) {
    const [code, splitedNumber] = fullNumber.split(')');
    number = splitedNumber;
    areaCode = trim(code);
  }

  number = trim(number);

  return {
    number: Number(number),
    areaCode,
  };
}

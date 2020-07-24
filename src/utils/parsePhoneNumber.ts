import { PhoneNumber } from 'libphonenumber-js/max';

import trim from './trimPhone';

interface PhoneParsed {
  areaCode: string;
  number: number;
}

export function parsePhone(phoneNumber: PhoneNumber | string): PhoneParsed {
  const fullNumber =
    (phoneNumber as PhoneNumber)?.formatNational() ?? phoneNumber;
  const rawNumber = fullNumber.replace('-', ' ') || '';

  let number = rawNumber;
  let areaCode = '';

  // If number is formated with prefix ()- like: (69) 99999-9999
  if (rawNumber.search(/\)/) !== -1) {
    const [code, splitedNumber] = rawNumber.split(')');
    number = trim(splitedNumber);
    areaCode = trim(code);
  } else {
    const [code, ...rest] = rawNumber.split(' ');

    // If number is formated with prefix like: 69 99999 9999
    if (rest.length > 0) {
      areaCode = trim(code);
      number = trim(rest.join(' '));
    }
  }

  return {
    number: Number(number),
    areaCode,
  };
}

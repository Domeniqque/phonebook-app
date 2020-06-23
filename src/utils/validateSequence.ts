import { PhoneNumberInstance } from '../components/PhoneInput';
import { parsePhone } from './parsePhoneNumber';

interface SequenceData {
  firstNumber: PhoneNumberInstance;
  lastNumber: PhoneNumberInstance;
}

interface Response {
  isValid: boolean;
  firstNumber: number;
  lastNumber: number;
  areaCode: string;
  distanceBetween: number;
}

const maxSequenceSize = 100000;

export default function validateSequence(data: SequenceData): Response {
  if (!data.firstNumber?.isPossible() || !data.lastNumber?.isPossible()) {
    return {
      isValid: false,
      firstNumber: 0,
      lastNumber: 0,
      distanceBetween: 0,
      areaCode: '',
    };
  }

  const firstPhone = parsePhone(data.firstNumber);
  const lastPhone = parsePhone(data.lastNumber);

  const distanceBetween = lastPhone.number - firstPhone.number + 1;

  const isValid = distanceBetween > 1 && distanceBetween < maxSequenceSize;

  return {
    isValid,
    firstNumber: firstPhone.number,
    lastNumber: lastPhone.number,
    distanceBetween,
    areaCode: firstPhone.areaCode || lastPhone.areaCode,
  };
}

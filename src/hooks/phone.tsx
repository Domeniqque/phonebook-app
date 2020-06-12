import React, { createContext, useState, useContext, useCallback } from 'react';

import maskedPhoneParser from '../utils/maskedPhoneParser';
import formatPhoneWithoutPrefix from '../utils/formatPhoneWithoutPrefix';
import clearMaskedPhone from '../utils/clearMaskedNumber';

export interface PhoneNumber {
  key: string;
  value: string;
  state: 'new' | 'received' | 'missed' | 'dont_exists';
  active: boolean;
}

interface PhoneContextData {
  phones: PhoneNumber[];
  createNumbers(startSequence: string, times: string): void;
  getLastPhonePreview(startSequence: string, times: string): string;
}

const PhoneContext = createContext<PhoneContextData>({} as PhoneContextData);

export const PhoneProvider: React.FC = ({ children }) => {
  const [phones, setPhones] = useState<PhoneNumber[]>([] as PhoneNumber[]);

  const getLastPhonePreview = useCallback(
    (phoneNumber: string, times: string) => {
      const { areaCode, sulfixNumber } = maskedPhoneParser(phoneNumber);

      const number = sulfixNumber + Number(times) - 1;

      const formatedNumber = formatPhoneWithoutPrefix(number);

      return `${areaCode} ${formatedNumber}`;
    },
    [],
  );

  const createNumbers = useCallback((startSequence: string, times: string) => {
    const sequence: PhoneNumber[] = [];
    const { areaCode, sulfixNumber: firstNumber } = maskedPhoneParser(
      startSequence,
    );

    for (let index = 0; index < Number(times); index++) {
      const createdNumber = formatPhoneWithoutPrefix(firstNumber + index);
      const newNumber = `${areaCode} ${createdNumber}`;

      sequence.push({
        key: clearMaskedPhone(newNumber),
        value: newNumber,
        state: 'new',
        active: true,
      });
    }

    setPhones(state => [...state, ...sequence]);
  }, []);

  return (
    <PhoneContext.Provider
      value={{ phones, createNumbers, getLastPhonePreview }}
    >
      {children}
    </PhoneContext.Provider>
  );
};

export function usePhone(): PhoneContextData {
  const context = useContext(PhoneContext);

  if (!context) {
    throw new Error('useAuth must be used within an PhoneContext!');
  }

  return context;
}

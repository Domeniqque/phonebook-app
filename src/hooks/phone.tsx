import React, { createContext, useContext, useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { PhoneNumberInstance } from '../components/PhoneInput';
import validateSequence from '../utils/validateSequence';
import getNumberInstance from '../utils/getNumberInstance';

export enum PhoneStatus {
  New,
  Received,
  Missed,
  DontExists,
}

export interface PhoneNumber {
  id: string;
  nationalValue: string;
  iterableValue: number;
  country: string;
  status: PhoneStatus;
  active: boolean;
  updated_at: Date;
}

interface SequenceData {
  firstNumber: PhoneNumberInstance;
  lastNumber: PhoneNumberInstance;
}

interface PhoneContextData {
  countryCode: string;
  phones: PhoneNumber[];
  addSequence(data: SequenceData): boolean;
}

const PhoneContext = createContext<PhoneContextData>({} as PhoneContextData);

export const PhoneProvider: React.FC = ({ children }) => {
  const countryCode = 'BR';

  const [phones, setPhones] = useState<PhoneNumber[]>([] as PhoneNumber[]);

  const addSequence = useCallback((data: SequenceData): boolean => {
    const {
      isValid,
      firstNumber,
      distanceBetween,
      areaCode,
    } = validateSequence(data);

    if (!isValid) {
      Alert.alert('Oops!', 'Verifique seus números');
      return false;
    }

    const sequence: PhoneNumber[] = [];

    for (let index = 0; index < distanceBetween; index++) {
      const iterableValue = firstNumber + index;
      const fullNumber = `${areaCode}${iterableValue}`;
      const instance = getNumberInstance(fullNumber, countryCode);

      if (instance?.isPossible()) {
        const phoneNumber = {
          id: '',
          nationalValue: instance.formatNational(),
          iterableValue,
          country: countryCode,
          status: PhoneStatus.New,
          active: true,
          updated_at: new Date(),
        };

        console.log(phoneNumber);

        sequence.push(phoneNumber);
      }
    }

    setPhones(state => [...state, ...sequence]);
    // TODO: inserir no banco de dados

    return true;
  }, []);

  return (
    <PhoneContext.Provider value={{ countryCode, phones, addSequence }}>
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

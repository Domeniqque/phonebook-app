import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { Alert } from 'react-native';
import { AsYouType } from 'libphonenumber-js';

import { PhoneNumberInstance } from '../components/PhoneInput';
import { validateSequence, numberIsValid } from '../utils/validateNumber';

export enum PhoneStatus {
  New,
  Received,
  Missed,
  DontExists,
}

export interface PhoneNumber {
  key: string;
  value: string;
  status: PhoneStatus;
  active: boolean;
  updated_at: Date;
}

interface SequenceData {
  firstNumber: PhoneNumberInstance;
  lastNumber: PhoneNumberInstance;
}

interface PhoneContextData {
  phones: PhoneNumber[];
  addSequence(data: SequenceData): boolean;
}

const PhoneContext = createContext<PhoneContextData>({} as PhoneContextData);

export const PhoneProvider: React.FC = ({ children }) => {
  const phones = useMemo(() => {
    return [];
  }, []);

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

    const sequence = [];

    for (let index = 0; index < distanceBetween; index++) {
      const number = firstNumber + index;
      const nextNumber = `${areaCode}${number}`;

      if (numberIsValid(nextNumber, 'BR')) {
        // TODO: criar objeto
        sequence.push(nextNumber);
      }
    }

    // TODO: inserir no banco de dados

    return true;
  }, []);

  return (
    <PhoneContext.Provider value={{ phones, addSequence }}>
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

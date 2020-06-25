import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { Alert } from 'react-native';
import uuid from '../utils/uuid';

import { PhoneNumberInstance } from '../components/PhoneInput';
import validateSequence from '../utils/validateSequence';
import getNumberInstance from '../utils/getNumberInstance';
import getRealm from '../services/realm';

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
  countryCode: string;
  status: PhoneStatus;
  active: boolean;
  updated_at: Date;
}

interface SequenceData {
  firstNumber: PhoneNumberInstance;
  lastNumber: PhoneNumberInstance;
}

export type PhoneResults = Realm.Results<PhoneNumber & Realm.Object>;
export type PhoneResult = (PhoneNumber & Realm.Object) | undefined;

interface PhoneContextData {
  countryCode: string;
  phones: PhoneResults;
  addSequence(data: SequenceData): Promise<boolean>;
  find(id: string): Promise<PhoneResult>;
}

const PhoneContext = createContext<PhoneContextData>({} as PhoneContextData);

export const PhoneProvider: React.FC = ({ children }) => {
  const countryCode = 'BR';

  const [phones, setPhones] = useState<PhoneResults>({} as PhoneResults);

  useEffect(() => {
    async function loadPhones(): Promise<void> {
      const realm = await getRealm();
      const data = realm
        .objects<PhoneNumber>('Phones')
        .filtered('active = 1')
        .sorted('iterableValue');

      setPhones(data);
    }

    loadPhones();
  }, []);

  const find = useCallback(async (id: string): Promise<PhoneResult> => {
    const realm = await getRealm();
    return realm.objectForPrimaryKey<PhoneNumber>('Phones', id);
  }, []);

  const addSequence = useCallback(async (data: SequenceData): Promise<
    boolean
  > => {
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

    const realm = await getRealm();

    realm.write(() => {
      for (let index = 0; index < distanceBetween; index++) {
        const iterableValue = firstNumber + index;
        const fullNumber = `${areaCode}${iterableValue}`;
        const instance = getNumberInstance(fullNumber, countryCode);

        if (instance?.isPossible()) {
          const phoneNumber = {
            id: uuid(),
            nationalValue: instance.formatNational(),
            iterableValue,
            countryCode,
            status: PhoneStatus.New,
            active: true,
            updated_at: new Date(),
          };

          realm.create('Phones', phoneNumber);
        }
      }
    });

    return true;
  }, []);

  return (
    <PhoneContext.Provider value={{ countryCode, phones, addSequence, find }}>
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

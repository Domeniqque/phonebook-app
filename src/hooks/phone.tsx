import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { AsyncStorage } from 'react-native';

import maskedPhoneParser from '../utils/maskedPhoneParser';
import formatPhoneWithoutPrefix from '../utils/formatPhoneWithoutPrefix';
import clearMaskedPhone from '../utils/clearMaskedNumber';

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

interface HashPhoneList {
  [key: string]: PhoneNumber;
}

interface PhoneContextData {
  phones: PhoneNumber[];
  createNumbers(startSequence: string, times: string): void;
  getLastPhonePreview(startSequence: string, times: string): string;
  changePhoneState(phoneKey: string, status: PhoneStatus): void;
}

const PhoneContext = createContext<PhoneContextData>({} as PhoneContextData);

export const PhoneProvider: React.FC = ({ children }) => {
  const [phoneHashList, setPhoneHashList] = useState<HashPhoneList>(
    {} as HashPhoneList,
  );

  const phones = useMemo(() => {
    return Object.values(phoneHashList).filter(
      p => p.status === PhoneStatus.New,
    );
  }, [phoneHashList]);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const phoneList = await AsyncStorage.getItem('@Phones');

      if (phoneList) {
        setPhoneHashList(JSON.parse(phoneList));
      }
    }
    loadStorageData();
  }, []);

  const getLastPhonePreview = useCallback(
    (phoneNumber: string, times: string) => {
      const { areaCode, sulfixNumber } = maskedPhoneParser(phoneNumber);

      const number = sulfixNumber + Number(times) - 1;

      const formatedNumber = formatPhoneWithoutPrefix(number);

      return `${areaCode} ${formatedNumber}`;
    },
    [],
  );

  const phoneExists = useCallback(key => phoneHashList[key], [phoneHashList]);

  const createNumbers = useCallback(
    (startSequence: string, times: string) => {
      const sequence: HashPhoneList = {};
      const { areaCode, sulfixNumber: firstNumber } = maskedPhoneParser(
        startSequence,
      );

      for (let index = 0; index < Number(times); index++) {
        const createdNumber = formatPhoneWithoutPrefix(firstNumber + index);
        const newNumber = `${areaCode} ${createdNumber}`;

        const key = clearMaskedPhone(newNumber);

        if (!phoneExists(key)) {
          sequence[key] = {
            key: clearMaskedPhone(newNumber),
            value: newNumber,
            status: PhoneStatus.New,
            active: true,
            updated_at: new Date(),
          };
        }
      }

      setPhoneHashList(state => ({ ...state, ...sequence }));
    },
    [phoneExists],
  );

  const changePhoneState = useCallback(
    (phoneKey: string, status: PhoneStatus) => {
      const phone = phoneExists(phoneKey);

      if (phone) {
        phone.status = status as PhoneStatus;
        phone.updated_at = new Date();

        setPhoneHashList(state => ({ ...state, [phone.key]: phone }));
      }
    },
    [phoneExists],
  );

  return (
    <PhoneContext.Provider
      value={{ phones, createNumbers, getLastPhonePreview, changePhoneState }}
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

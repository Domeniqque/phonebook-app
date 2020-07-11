import React, { createContext, useContext, useCallback } from 'react';
import crashlytics from '@react-native-firebase/crashlytics';

import uuid from '../utils/uuid';
import { PhoneNumberInstance } from '../components/PhoneInput';
import parseAndValidateSequence from '../utils/validateSequence';
import getNumberInstance from '../utils/getNumberInstance';
import getRealm from '../services/realm';
import { useAlert } from './alert';
import { useLocale } from './locale';

export enum PhoneStatus {
  New,
  Received,
  Missed,
  NotExist,
  Removed,
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
  callOnSuccess?(): void;
}

export type PhoneResults = Realm.Results<PhoneNumber & Realm.Object>;
export type PhoneResult = (PhoneNumber & Realm.Object) | undefined;

interface PhoneContextData {
  findByStatus(status: PhoneStatus): Promise<PhoneResults>;
  addSequence(data: SequenceData): Promise<void>;
  findById(id: string): Promise<PhoneResult>;
  setStatus(id: string, status: PhoneStatus): Promise<void>;
  destroy(id: string): Promise<void>;
}

const PhoneContext = createContext<PhoneContextData>({} as PhoneContextData);

export const PhoneProvider: React.FC = ({ children }) => {
  const { alert } = useAlert();
  const { country, trans } = useLocale();

  const findByStatus = useCallback(async (status: PhoneStatus) => {
    crashlytics().log(`Usando findByStatus ${status}`);
    const realm = await getRealm();

    const sortSql =
      status === PhoneStatus.New
        ? 'SORT(nationalValue ASC)'
        : 'SORT(updated_at DESC, nationalValue ASC)';

    const data = realm
      .objects<PhoneNumber>('Phones')
      .filtered(`active = 1 AND status = ${status} ${sortSql}`);

    return data;
  }, []);

  const findById = useCallback(async (id: string) => {
    crashlytics().log('Usando findById');

    const realm = await getRealm();
    return realm.objectForPrimaryKey<PhoneNumber>('Phones', id);
  }, []);

  const addSequence = useCallback(
    async (data: SequenceData): Promise<void> => {
      crashlytics().log('Usando método addSequencce');

      const {
        isValid,
        firstNumber,
        distanceBetween,
        areaCode,
      } = parseAndValidateSequence(data);

      if (!isValid) {
        alert({
          title: trans('phones.create.validation.isInvalidTitle'),
          text: trans('phones.create.validation.isInvalidText'),
          confirmText: 'OK',
        });
        return;
      }

      crashlytics().setAttribute(
        'data',
        JSON.stringify({
          isValid,
          firstNumber,
          distanceBetween,
          areaCode,
          originalData: data,
        }),
      );

      const realm = await getRealm();

      const createPhoneNumbers = (): void => {
        realm.write(() => {
          for (let index = 0; index < distanceBetween; index++) {
            const iterableValue = firstNumber + index;

            const fullNumber = `${areaCode}${iterableValue}`;
            const instance = getNumberInstance(fullNumber, country.value);

            if (instance?.isPossible()) {
              const nationalValue = instance.formatNational();

              const phoneExists =
                realm
                  .objects<PhoneNumber>('Phones')
                  .filtered(`nationalValue = "${nationalValue}"`).length >= 1;

              if (!phoneExists) {
                const phoneNumber = {
                  id: uuid(),
                  nationalValue,
                  iterableValue,
                  countryCode: country.value,
                  status: PhoneStatus.New,
                  active: true,
                  updated_at: new Date(),
                };

                realm.create('Phones', phoneNumber);
              }
            }
          }
        });

        if (data?.callOnSuccess) data.callOnSuccess();
      };

      if (distanceBetween > 300) {
        alert({
          title: trans('phones.create.validation.veryLargeTitle', {
            distanceBetween,
          }),
          text: trans('phones.create.validation.veryLargeQuestion'),
          confirmText: trans('phones.create.validation.veryLargeOk'),
          cancelText: trans('phones.create.validation.veryLargeCancel'),
          onConfirm: () => {
            createPhoneNumbers();
          },
        });
      } else {
        createPhoneNumbers();
      }
    },
    [alert, trans, country],
  );

  const setStatus = useCallback(async (id: string, status: PhoneStatus) => {
    const realm = await getRealm();
    const updated_at = new Date();

    realm.write(() => {
      realm.create(
        'Phones',
        { id, status, updated_at },
        Realm.UpdateMode.Modified,
      );
    });
  }, []);

  const destroy = useCallback(async (id: string) => {
    const realm = await getRealm();

    realm.write(() => {
      const phone = realm
        .objects<PhoneNumber>('Phones')
        .filtered(`id = "${id}"`);

      if (phone) realm.delete(phone);
    });
  }, []);

  return (
    <PhoneContext.Provider
      value={{
        findByStatus,
        addSequence,
        findById,
        setStatus,
        destroy,
      }}
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

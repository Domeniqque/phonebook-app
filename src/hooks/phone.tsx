import React, { createContext, useContext, useCallback } from 'react';
import uuid from '../utils/uuid';

import { PhoneNumberInstance } from '../components/PhoneInput';
import validateSequence from '../utils/validateSequence';
import getNumberInstance from '../utils/getNumberInstance';
import getRealm from '../services/realm';
import { useAlert } from './alert';

export enum PhoneStatus {
  New,
  Received,
  Missed,
  DontExists,
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
  countryCode: string;
  findByStatus(status: PhoneStatus): Promise<PhoneResults>;
  addSequence(data: SequenceData): Promise<void>;
  findById(id: string): Promise<PhoneResult>;
  setStatus(id: string, status: PhoneStatus): Promise<void>;
  destroy(id: string): Promise<void>;
}

const PhoneContext = createContext<PhoneContextData>({} as PhoneContextData);

export const PhoneProvider: React.FC = ({ children }) => {
  const countryCode = 'BR';
  const { alert } = useAlert();

  const findByStatus = useCallback(async (status: PhoneStatus) => {
    const realm = await getRealm();

    const data = realm
      .objects<PhoneNumber>('Phones')
      .filtered(`active = 1 AND status = ${status}`)
      .sorted('nationalValue');

    return data;
  }, []);

  const findById = useCallback(async (id: string) => {
    const realm = await getRealm();
    return realm.objectForPrimaryKey<PhoneNumber>('Phones', id);
  }, []);

  const addSequence = useCallback(
    async (data: SequenceData): Promise<void> => {
      const {
        isValid,
        firstNumber,
        distanceBetween,
        areaCode,
      } = validateSequence(data);

      if (!isValid) {
        alert({
          title: 'Verifique seus números',
          text: 'Não é possível criar uma sequência com os números informados',
          confirmText: 'Ok',
        });
        return;
      }

      const realm = await getRealm();

      const createPhoneNumbers = (): void => {
        realm.write(() => {
          for (let index = 0; index < distanceBetween; index++) {
            const iterableValue = firstNumber + index;

            const fullNumber = `${areaCode}${iterableValue}`;
            const instance = getNumberInstance(fullNumber, countryCode);

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
                  countryCode,
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

      if (distanceBetween > 100) {
        alert({
          title: `Sua sequência possui \n ${distanceBetween} números`,
          text: 'Deseja criar mesmo assim?',
          confirmText: 'Sim, cadastrar',
          cancelText: 'Não',
          onConfirm: () => {
            createPhoneNumbers();
          },
        });
      } else {
        createPhoneNumbers();
      }
    },
    [alert],
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
        countryCode,
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

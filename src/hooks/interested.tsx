import React, { createContext, useCallback, useContext, useMemo } from 'react';
import crashlytics from '@react-native-firebase/crashlytics';

import { InterestedProps } from '../schemas/InterestedSchema';
import { PhoneProps } from '../schemas/PhoneSchema';
import { PhoneNumberInstance } from '../components/PhoneInput';
import getRealm from '../services/realm';
import uuid from '../utils/uuid';
import { PhoneStatus } from './phone';
import { useLocale } from './locale';

interface InterestedFormData {
  name?: string;
  address?: string;
  phoneNumber: PhoneNumberInstance;
  lifeStage?: string;
  gender?: string;
}

export type InterestedListResult = Realm.Results<
  InterestedProps & Realm.Object
>;

export type InterestedResult = (InterestedProps & Realm.Object) | undefined;

interface InterestedContextData {
  addInterested(data: InterestedFormData): Promise<void>;
  getAll(): Promise<InterestedListResult>;
  findById(id: string): Promise<InterestedResult>;
  addInterestedPhone(
    phone: PhoneNumberInstance,
    interestedId: string,
    realm?: Realm,
  ): Promise<void>;
  genderTypes: { label: string; value: string }[];
  lifeStageTypes: { label: string; value: string }[];
}

const InterestedContext = createContext<InterestedContextData>(
  {} as InterestedContextData,
);

export const InterestedProvider: React.FC = ({ children }) => {
  const { trans } = useLocale();

  const findById = useCallback(async (id: string) => {
    crashlytics().log('Usando findById de interessados');

    const realm = await getRealm();

    return realm.objectForPrimaryKey<InterestedProps>('Interested', id);
  }, []);

  const addInterestedPhone = useCallback(
    async (
      phoneNumber: PhoneNumberInstance,
      interestedId: string,
      realmInstance?: Realm,
    ) => {
      const create = (realm: Realm): void => {
        if (phoneNumber) {
          const nationalFormat = phoneNumber.formatNational();

          const equivalentPhones = realm
            .objects<PhoneProps>('Phones')
            .filtered(`nationalValue = "${nationalFormat}"`);

          if (
            equivalentPhones.length > 0 &&
            !equivalentPhones[0].interested_id
          ) {
            const phone = equivalentPhones[0];

            phone.interested_id = interestedId;
            phone.status = PhoneStatus.Received;
            phone.updated_at = new Date();
          } else {
            const phoneNumberData = {
              id: uuid(),
              nationalValue: nationalFormat,
              iterableValue: 0,
              countryCode: phoneNumber.country,
              status: PhoneStatus.Received,
              active: false,
              updated_at: new Date(),
              interested_id: interestedId,
            };

            realm.create<PhoneProps>('Phones', phoneNumberData);
          }
        }
      };

      if (realmInstance) {
        create(realmInstance);
      } else {
        const realm = await getRealm();

        realm.write(() => {
          create(realm);
        });
      }
    },
    [],
  );

  const addInterested = useCallback(
    async (data: InterestedFormData): Promise<void> => {
      crashlytics().log(`Cadastrando interessados`);

      const realm = await getRealm();

      realm.write(() => {
        const interested = realm.create<InterestedProps>('Interested', {
          id: uuid(),
          name: data.name ?? '',
          address: data.address ?? '',
          gender: data.gender ?? '',
          lifeStage: data.lifeStage ?? '',
          created_at: new Date(),
        });

        addInterestedPhone(data.phoneNumber, interested.id, realm);
      });
    },
    [addInterestedPhone],
  );

  const getAll = useCallback(async () => {
    const realm = await getRealm();

    return realm
      .objects<InterestedProps>('Interested')
      .filtered('active = 1')
      .sorted('name');
  }, []);

  const genderTypes = useMemo(
    () => [
      { label: trans('gender.M') as string, value: 'M' },
      { label: trans('gender.F') as string, value: 'F' },
    ],
    [trans],
  );

  const lifeStageTypes = useMemo(
    () => [
      { label: trans('lifeStages.child') as string, value: 'child' },
      { label: trans('lifeStages.young') as string, value: 'young' },
      { label: trans('lifeStages.adult') as string, value: 'adult' },
      { label: trans('lifeStages.elderly') as string, value: 'elderly' },
    ],
    [trans],
  );

  return (
    <InterestedContext.Provider
      value={{
        addInterested,
        getAll,
        findById,
        addInterestedPhone,
        genderTypes,
        lifeStageTypes,
      }}
    >
      {children}
    </InterestedContext.Provider>
  );
};

export function useInterested(): InterestedContextData {
  const context = useContext(InterestedContext);

  if (!context) {
    throw new Error('useAuth must be used within an PhoneContext!');
  }

  return context;
}

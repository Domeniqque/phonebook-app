import React, { createContext, useCallback, useContext } from 'react';

import { InterestedProps } from '../schemas/InterestedSchema';
import { PhoneProps } from '../schemas/PhoneSchema';
import { PhoneNumberInstance } from '../components/PhoneInput';
import getRealm from '../services/realm';
import uuid from '../utils/uuid';
import { PhoneStatus } from './phone';

interface InterestedFormData {
  name: string;
  address: string;
  phoneNumber: PhoneNumberInstance;
  lifeStage: string;
  gender: string;
}

interface InterestedContextData {
  addInterested(data: InterestedFormData): Promise<void>;
}

const InterestedContext = createContext<InterestedContextData>(
  {} as InterestedContextData,
);

export const InterestedProvider: React.FC = ({ children }) => {
  const addInterested = useCallback(async (data: InterestedFormData): Promise<
    void
  > => {
    const realm = await getRealm();

    const { phoneNumber, name, address, gender, lifeStage } = data;

    realm.write(() => {
      const interested = realm.create<InterestedProps>('Interested', {
        id: uuid(),
        name,
        address,
        gender,
        lifeStage,
        created_at: new Date(),
      });

      if (phoneNumber) {
        const nationalFormat = phoneNumber.formatNational();

        const equivalentPhones = realm
          .objects<PhoneProps>('Phones')
          .filtered(`nationalValue = "${nationalFormat}"`);

        if (equivalentPhones.length >= 1) {
          const phone = equivalentPhones[0];

          phone.interested_id = interested.id;
        } else {
          const phoneNumberData = {
            id: uuid(),
            nationalValue: nationalFormat,
            iterableValue: 0,
            countryCode: phoneNumber.country,
            status: PhoneStatus.Received,
            active: false,
            updated_at: new Date(),
            interested_id: interested.id,
          };

          realm.create<PhoneProps>('Phones', phoneNumberData);
        }
      }
    });
  }, []);

  return (
    <InterestedContext.Provider value={{ addInterested }}>
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

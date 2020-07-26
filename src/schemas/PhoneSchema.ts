import { PhoneStatus } from '../hooks/phone';

export interface PhoneProps {
  id: string;
  nationalValue: string;
  iterableValue: number;
  countryCode: string;
  status: PhoneStatus;
  active: boolean;
  updated_at: Date;
  interested_id?: string;
}

export default class PhoneSchema {
  static schema = {
    name: 'Phones',
    primaryKey: 'id',
    properties: {
      id: 'string',
      iterableValue: 'int',
      countryCode: 'string',
      nationalValue: { type: 'string', indexed: true },
      status: { type: 'int', indexed: true },
      active: { type: 'bool', indexed: true },
      updated_at: { type: 'date', indexed: true },
      interested_id: { type: 'string', indexed: true, optional: true },
    },
  };
}

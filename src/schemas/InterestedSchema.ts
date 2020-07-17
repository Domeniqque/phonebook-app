import { NoteProps } from './NoteSchema';
import { PhoneProps } from './PhoneSchema';

export interface InterestedProps {
  id: string;
  name: string;
  address: string;
  lifeStage: string;
  gender: string;
  favorite: boolean;
  phones: PhoneProps[];
  notes: NoteProps[];
  active: boolean;
  created_at: Date;
}

export default class InterestedSchema {
  static schema = {
    name: 'Interested',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: { type: 'string', indexed: true },
      address: 'string',
      lifeStage: 'string',
      notes: 'Note[]',
      gender: 'string',
      favorite: { type: 'bool', default: false },
      active: { type: 'bool', indexed: true, default: true },
      created_at: { type: 'date', indexed: true },
    },
  };
}

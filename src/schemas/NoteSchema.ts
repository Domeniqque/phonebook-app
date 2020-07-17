import { InterestedProps } from './InterestedSchema';

export interface NoteProps {
<<<<<<< HEAD
  id: string;
  text: string;
  pinned: boolean;
  date: Date;
  interested?: InterestedProps;
=======
  text: string;
  pinned: boolean;
  created_at: Date;
  interested: InterestedProps;
>>>>>>> cadastro de interessados
}

export default class NoteSchema {
  static schema = {
    name: 'Note',
<<<<<<< HEAD
    primaryKey: 'id',
    properties: {
      id: 'string',
      text: 'string',
      pinned: 'bool',
      date: { type: 'date', indexed: true },
=======
    properties: {
      text: 'string',
      pinned: 'bool',
      created_at: { type: 'date', indexed: true },
>>>>>>> cadastro de interessados
      interested: {
        type: 'linkingObjects',
        objectType: 'Interested',
        property: 'notes',
      },
    },
  };
}

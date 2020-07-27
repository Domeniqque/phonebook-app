import { InterestedProps } from './InterestedSchema';

export interface NoteProps {
  id: string;
  text: string;
  pinned: boolean;
  date: Date;
  interested?: InterestedProps;
}

export default class NoteSchema {
  static schema = {
    name: 'Note',
    primaryKey: 'id',
    properties: {
      id: 'string',
      text: 'string',
      pinned: 'bool',
      date: { type: 'date', indexed: true },
      interested: {
        type: 'linkingObjects',
        objectType: 'Interested',
        property: 'notes',
      },
    },
  };
}

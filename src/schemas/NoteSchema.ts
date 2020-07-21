import { InterestedProps } from './InterestedSchema';

export interface NoteProps {
  text: string;
  pinned: boolean;
  date: Date;
  interested?: InterestedProps;
}

export default class NoteSchema {
  static schema = {
    name: 'Note',
    properties: {
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

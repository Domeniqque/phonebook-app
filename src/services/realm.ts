import Realm from 'realm';

import PhoneSchema from '../schemas/PhoneSchema';
import InterestedSchema from '../schemas/InterestedSchema';
import NoteSchema from '../schemas/NoteSchema';

export default function getRealm(): ProgressPromise {
  return Realm.open({
    schema: [PhoneSchema, InterestedSchema, NoteSchema],
    schemaVersion: 1,
  });
}

/*
  Phones
    - interested_id

  Interested
    - Phones[]
    - Notes[]

  Note
    - interested owner
*/

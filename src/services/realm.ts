import Realm from 'realm';

import PhoneSchema from '../schemas/PhoneSchema';
import InterestedSchema from '../schemas/InterestedSchema';
import NoteSchema from '../schemas/NoteSchema';

const getRealm = async (): Promise<Realm> => {
  return Realm.open({
    schema: [PhoneSchema, InterestedSchema, NoteSchema],
    schemaVersion: 1,
  });
};

export default getRealm;

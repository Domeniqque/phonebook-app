import Realm from 'realm';

import PhoneSchema from '../schemas/PhoneSchema';

export default function getRealm(): ProgressPromise {
  return Realm.open({
    schema: [PhoneSchema],
  });
}

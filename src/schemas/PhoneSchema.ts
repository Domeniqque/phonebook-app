export default class PhoneSchema {
  static schema = {
    name: 'Phones',
    primaryKey: 'id',
    properties: {
      id: 'string',
      nationalValue: { type: 'string', indexed: true },
      iterableValue: 'int',
      countryCode: 'string',
      status: 'int',
      active: 'bool',
      updated_at: 'date',
    },
  };
}

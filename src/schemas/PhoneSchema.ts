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
    },
  };
}

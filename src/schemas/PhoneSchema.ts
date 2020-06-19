export default class PhoneSchema {
  static schema = {
    name: 'Phones',
    primaryKey: 'id',
    properties: {
      id: 'string',
      areaCode: 'string',
      localNumber: 'string',
      fullNumber: { type: 'string', indexed: true },
      status: 'string',
      active: 'bool',
    },
  };
}

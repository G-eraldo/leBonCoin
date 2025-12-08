import type { Schema, Struct } from '@strapi/strapi';

export interface UtilityAddress extends Struct.ComponentSchema {
  collectionName: 'components_utility_addresses';
  info: {
    displayName: 'Address';
    icon: 'attachment';
  };
  attributes: {
    address_line_2: Schema.Attribute.String;
    city: Schema.Attribute.String;
    country: Schema.Attribute.String;
    street_address: Schema.Attribute.String;
    zip_code: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'utility.address': UtilityAddress;
    }
  }
}

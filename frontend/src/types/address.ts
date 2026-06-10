export interface Country {
  id: string;
  countryName: string;
}

export interface Address {
  id: string;
  unitNumber?: string;
  streetNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region?: string;
  postalCode?: string;
  country: Country;
}

export interface UserAddress extends Address {
  isDefault: boolean;
}

export interface CreateAddressDTO {
  unitNumber?: string;
  streetNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region?: string;
  postalCode?: string;
  countryId: string;
  isDefault?: boolean;
}

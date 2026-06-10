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

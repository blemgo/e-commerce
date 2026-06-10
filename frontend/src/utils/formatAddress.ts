import type { UserAddress } from '@types';

export const formatAddressLine1 = (address: UserAddress): string =>
  [address.addressLine1, address.addressLine2, address.unitNumber]
    .filter(Boolean)
    .join(', ');

export const formatAddressLine2 = (address: UserAddress): string =>
  [[address.postalCode, address.city].filter(Boolean).join(' '), address.country.countryName]
    .filter(Boolean)
    .join(', ');

export const formatAddressSummary = (address: UserAddress): string =>
  `${formatAddressLine1(address)}, ${formatAddressLine2(address)}`;

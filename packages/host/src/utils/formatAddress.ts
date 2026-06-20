import type { Address } from '@types';

export const formatAddressLine1 = (address: Address): string =>
  [address.addressLine1, address.addressLine2, address.unitNumber]
    .filter(Boolean)
    .join(', ');

export const formatAddressLine2 = (address: Address): string =>
  [[address.postalCode, address.city].filter(Boolean).join(' '), address.country.countryName]
    .filter(Boolean)
    .join(', ');

export const formatAddressSummary = (address: Address): string =>
  `${formatAddressLine1(address)}, ${formatAddressLine2(address)}`;

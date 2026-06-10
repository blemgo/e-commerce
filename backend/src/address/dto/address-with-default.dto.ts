import { Address } from '../entities/address.entity';

export type AddressWithDefault = Address & { isDefault: boolean };

export const Role = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

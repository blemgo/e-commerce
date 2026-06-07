import type { ReactNode } from 'react';
import type { User } from '@types';

export interface UserContextValue {
  user: User | null;
  accessToken: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

export interface UserProviderProps {
  children: ReactNode;
}

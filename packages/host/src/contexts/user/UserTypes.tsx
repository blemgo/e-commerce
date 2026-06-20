import type { ReactNode } from 'react';
import type { AuthUser } from '@shared/types';

export interface UserContextValue {
  user: AuthUser | null;
  isInitializing: boolean;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
}

export interface UserProviderProps {
  children: ReactNode;
}

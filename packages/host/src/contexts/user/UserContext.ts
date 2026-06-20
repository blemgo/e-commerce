import { createContext } from 'react';
import type { UserContextValue } from './UserTypes';

export const UserContext = createContext<UserContextValue | null>(null);

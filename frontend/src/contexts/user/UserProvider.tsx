import { useState } from 'react';
import { LoadingScreen } from '@components/LoadingScreen';
import { UserContext } from './UserContext';
import { useInitAuth } from './useInitAuth';
import api from '@api/api';
import type { AuthUser } from '@types';
import type { UserProviderProps } from './UserTypes';

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const { isInitializing } = useInitAuth(setUser);

  const logout = () => {
    api.auth().logout().catch(() => {});
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, isInitializing, setUser, logout }}>
      {isInitializing ? <LoadingScreen /> : children}
    </UserContext.Provider>
  );
};

export { UserProvider };

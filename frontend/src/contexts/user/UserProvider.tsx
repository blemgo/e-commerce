import { useState } from 'react';
import { UserContext } from './UserContext';
import { useInitAuth } from './useInitAuth';
import type { User } from '@types';
import type { UserProviderProps } from './UserTypes';

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { isInitializing } = useInitAuth(setUser, setAccessToken);

  const logout = () => {
    setUser(null);
    setAccessToken(null);
  };

  return (
    <UserContext.Provider value={{ user, accessToken, isInitializing, setUser, setAccessToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };

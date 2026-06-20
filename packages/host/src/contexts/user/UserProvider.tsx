import { useEffect, useState } from 'react';
import { LoadingScreen } from '@components/LoadingScreen';
import { UserContext } from './UserContext';
import { useInitAuth } from './useInitAuth';
import api from '@api/api';
import { setOnUnauthenticated } from '@api/interceptors/authInterceptor';
import type { AuthUser } from '@types';
import type { UserProviderProps } from './UserTypes';

const UserProvider: React.FC<UserProviderProps> = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const { isInitializing } = useInitAuth(setUser);

  useEffect(() => {
    setOnUnauthenticated(() => setUser(null));
  }, []);

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

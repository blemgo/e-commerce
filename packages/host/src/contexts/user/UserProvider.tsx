import { useEffect, useState } from 'react';
import { LoadingScreen } from '@shared/components/LoadingScreen';
import { UserContext } from './UserContext';
import { useInitAuth } from './useInitAuth';
import api from '@shared/api/api';
import { setOnUnauthenticated } from '@shared/api/interceptors/authInterceptor';
import { appRouter } from '@/router/router';
import type { AuthUser } from '@shared/types';
import type { UserProviderProps } from './UserTypes';

const UserProvider: React.FC<UserProviderProps> = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const { isInitializing } = useInitAuth(setUser);

  useEffect(() => {
    setOnUnauthenticated(() => {
      setUser(null);
      appRouter.navigate('/login');
    });
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

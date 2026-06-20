import { useContext } from 'react';
import { UserContext } from './UserContext';
import type { UserContextValue } from './UserTypes';

const useUserContext = (): UserContextValue => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
};

export { useUserContext };

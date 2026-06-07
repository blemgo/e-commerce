import { useEffect, useState } from 'react';
import api from '@api/api';
import type { User } from '@types';

const useInitAuth = (
  setUser: (user: User | null) => void,
  setAccessToken: (token: string | null) => void,
): { isInitializing: boolean } => {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const { user, accessToken } = await api.auth().refresh();
        setUser(user);
        setAccessToken(accessToken);
      } catch {
        // no valid session — user stays null
      } finally {
        setIsInitializing(false);
      }
    };

    init();
  }, []);

  return { isInitializing };
};

export { useInitAuth };

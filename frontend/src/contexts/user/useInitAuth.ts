import { useEffect, useRef, useState } from 'react';
import api from '@api/api';
import type { RefreshResponse, User } from '@types';

const useInitAuth = (
  setUser: (user: User | null) => void,
  setAccessToken: (token: string | null) => void,
): { isInitializing: boolean } => {
  const [isInitializing, setIsInitializing] = useState(true);
  const refreshPromise = useRef<Promise<RefreshResponse> | null>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      if (!refreshPromise.current) {
        refreshPromise.current = api.auth().refresh();
      }

      try {
        const { user, accessToken } = await refreshPromise.current;

        if (!cancelled) {
          setUser(user);
          setAccessToken(accessToken);
        }
      } catch {
        // no valid session — user stays null
      } finally {
        refreshPromise.current = null;
        if (!cancelled) setIsInitializing(false);
      }
    };

    init();

    return () => { cancelled = true; };
  }, []);

  return { isInitializing };
};

export { useInitAuth };

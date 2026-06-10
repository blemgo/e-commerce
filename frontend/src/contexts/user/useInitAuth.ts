import { useEffect, useRef, useState } from 'react';
import api from '@api/api';
import type { AuthUser } from '@types';

const useInitAuth = (
  setUser: (user: AuthUser | null) => void,
): { isInitializing: boolean } => {
  const [isInitializing, setIsInitializing] = useState(true);
  const refreshPromise = useRef<Promise<AuthUser> | null>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      // Prevent multiple calls to refresh 
      if (!refreshPromise.current) {
        refreshPromise.current = api.auth().refresh();
      }

      try {
        const user = await refreshPromise.current;

        if (!cancelled) {
          setUser(user);
        }
      } catch {
        // no valid session user stays null
      } finally {
        refreshPromise.current = null;
        if (!cancelled) {
          setIsInitializing(false);
        }
      }
    };

    init();

    return () => { cancelled = true; };
  }, []);

  return { isInitializing };
};

export { useInitAuth };

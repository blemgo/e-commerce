import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '@api/api';
import type { UserProfile } from '@types';

export interface UseGetProfileReturn {
  profile: UserProfile | null;
  loading: boolean;
}

const useGetProfile = (): UseGetProfileReturn => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProfile = async () => {
      setLoading(true);

      try {
        const data = await api.users().getProfile(controller.signal);
        setProfile(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          toast.error('Failed to load profile.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => controller.abort();
  }, []);

  return { profile, loading };
};

export { useGetProfile };

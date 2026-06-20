import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '@shared/api/api';
import type { Country } from '@shared/types';

export interface UseGetCountriesReturn {
  countries: Country[];
  loading: boolean;
}

const useGetCountries = (): UseGetCountriesReturn => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCountries = async () => {
      setLoading(true);

      try {
        const data = await api.countries().getCountries(controller.signal);
        setCountries(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          toast.error('Failed to load countries.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCountries();

    return () => controller.abort();
  }, []);

  return { countries, loading };
};

export { useGetCountries };

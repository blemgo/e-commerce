import { isAxiosError } from 'axios';

const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (!isAxiosError(error)) {
    return fallback;
  }

  const status = error.response?.status;

  if (status === undefined || status >= 500) {
    return fallback;
  }

  const message = error.response.data?.message;

  if (Array.isArray(message)) {
    return message[0] ?? fallback;
  }

  return typeof message === 'string' ? message : fallback;
};

export { getApiErrorMessage };

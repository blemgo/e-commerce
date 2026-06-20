import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let pendingQueue: Array<{ resolve: () => void; reject: (err: unknown) => void }> = [];
let onUnauthenticated: (() => void) | null = null;

const flushQueue = (error?: unknown) => {
  pendingQueue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve()));
  pendingQueue = [];
};

const redirectToLogin = () => {
  onUnauthenticated?.();
};

export const setOnUnauthenticated = (cb: () => void) => {
  onUnauthenticated = cb;
};

export const setupAuthInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const original = error.config as RetryableConfig;

      if (error.response?.status !== 401) {
        return Promise.reject(error);
      }

      if (original.url === '/auth/refresh') {
        return Promise.reject(error);
      }

      if (original._retry) {
        redirectToLogin();
        
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({
            resolve: () => resolve(instance(original)),
            reject,
          });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        await instance.post('/auth/refresh');

        flushQueue();

        return instance(original);
      } catch (refreshError) {
        flushQueue(refreshError);

        if (axios.isAxiosError(refreshError) && refreshError.response?.status === 401) {
          redirectToLogin();
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    },
  );
};

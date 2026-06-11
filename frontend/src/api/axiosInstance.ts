import axios from 'axios';
import { setupAuthInterceptor } from './interceptors/authInterceptor';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  withCredentials: true,
});

setupAuthInterceptor(axiosInstance);

export default axiosInstance;

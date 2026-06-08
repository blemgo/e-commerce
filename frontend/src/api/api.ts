import type { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';
import type { LocalRegisterDTO, LocalLoginDTO, AuthUser } from '@types';

const getData = <T>(result: AxiosResponse<T>): T => result.data;
const postData = <T>(result: AxiosResponse<T>): T => result.data;
const patchData = <T>(result: AxiosResponse<T>): T => result.data;

const auth = () => ({
  localRegister: async (localRegisterDTO: LocalRegisterDTO): Promise<AuthUser> =>
    await axiosInstance.post<AuthUser>('/auth/local-register', localRegisterDTO).then(postData),
  localLogin: async (localLoginDTO: LocalLoginDTO): Promise<AuthUser> =>
    await axiosInstance.post<AuthUser>('/auth/local-login', localLoginDTO).then(postData),
  refresh: async (): Promise<AuthUser> =>
    await axiosInstance.post<AuthUser>('/auth/refresh').then(postData),
  logout: async (): Promise<void> =>
    await axiosInstance.post('/auth/logout').then(() => undefined),
  googleLogin: () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  },
});

export default { auth };

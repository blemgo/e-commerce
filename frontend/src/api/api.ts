import type { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';
import type { User, LocalRegisterDTO, LocalLoginDTO } from '@types';

const getData = <T>(result: AxiosResponse<T>): T => result.data;
const postData = <T>(result: AxiosResponse<T>): T => result.data;
const patchData = <T>(result: AxiosResponse<T>): T => result.data;

const auth = () => ({
  localRegister: async (localRegisterDTO: LocalRegisterDTO): Promise<User> =>
    await axiosInstance.post<User>('/auth/local-register', localRegisterDTO).then(postData),
  localLogin: async (localLoginDTO: LocalLoginDTO): Promise<User> =>
    await axiosInstance.post<User>('/auth/local-login', localLoginDTO).then(postData),
});

export default { auth };

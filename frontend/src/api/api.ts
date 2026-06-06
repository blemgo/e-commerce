import type { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';
import type { User, LocalRegisterDTO } from '@types';

const getData = <T>(result: AxiosResponse<T>): T => result.data;
const postData = <T>(result: AxiosResponse<T>): T => result.data;
const patchData = <T>(result: AxiosResponse<T>): T => result.data;

const auth = () => ({
  localRegister: (dto: LocalRegisterDTO): Promise<User> =>
    axiosInstance.post<User>('/auth/local-register', dto).then(postData),
});

export default { auth };

import type { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';
import type {
  AuthUser,
  Cart,
  CategoryNode,
  ChangePasswordDTO,
  CheckoutDTO,
  Country,
  CreateAddressDTO,
  LocalLoginDTO,
  LocalRegisterDTO,
  Order,
  Paginated,
  Product,
  UpdateAddressDTO,
  UpdateProfileDTO,
  UserAddress,
  UserProfile,
} from '@types';

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

const users = () => ({
  getProfile: async (signal?: AbortSignal): Promise<UserProfile> =>
    await axiosInstance.get<UserProfile>('/users/me', { signal }).then(getData),
  updateProfile: async (updateProfileDTO: UpdateProfileDTO): Promise<UserProfile> =>
    await axiosInstance.patch<UserProfile>('/users/me', updateProfileDTO).then(patchData),
  changePassword: async (changePasswordDTO: ChangePasswordDTO): Promise<void> =>
    await axiosInstance
      .patch<void>('/users/me/password', changePasswordDTO)
      .then(patchData),
});

const categories = () => ({
  getCategoryTree: async (signal?: AbortSignal): Promise<CategoryNode[]> =>
    await axiosInstance.get<CategoryNode[]>('/categories', { signal }).then(getData),
});

const products = () => ({
  getProducts: async (params?: object, signal?: AbortSignal): Promise<Paginated<Product>> =>
    await axiosInstance
      .get<Paginated<Product>>('/products', { params, signal })
      .then(getData),
  getProduct: async (id: string, signal?: AbortSignal): Promise<Product> =>
    await axiosInstance.get<Product>(`/products/${id}`, { signal }).then(getData),
});

const cart = () => ({
  getCart: async (): Promise<Cart> =>
    await axiosInstance.get<Cart>('/cart').then(getData),
  setItemQuantity: async (productId: string, quantity: number): Promise<Cart> =>
    await axiosInstance.patch<Cart>(`/cart/items/${productId}`, { quantity }).then(patchData),
});

const orders = () => ({
  getOrders: async (signal?: AbortSignal): Promise<Order[]> =>
    await axiosInstance.get<Order[]>('/orders', { signal }).then(getData),
  getOrder: async (id: string, signal?: AbortSignal): Promise<Order> =>
    await axiosInstance.get<Order>(`/orders/${id}`, { signal }).then(getData),
  checkout: async (checkoutDTO: CheckoutDTO): Promise<Order> =>
    await axiosInstance.post<Order>('/orders/checkout', checkoutDTO).then(postData),
});

const addresses = () => ({
  getAddresses: async (signal?: AbortSignal): Promise<UserAddress[]> =>
    await axiosInstance.get<UserAddress[]>('/addresses', { signal }).then(getData),
  createAddress: async (createAddressDTO: CreateAddressDTO): Promise<UserAddress[]> =>
    await axiosInstance.post<UserAddress[]>('/addresses', createAddressDTO).then(postData),
  setDefaultAddress: async (addressId: string): Promise<UserAddress[]> =>
    await axiosInstance.patch<UserAddress[]>(`/addresses/${addressId}/default`).then(patchData),
  updateAddress: async (
    addressId: string,
    updateAddressDTO: UpdateAddressDTO,
  ): Promise<UserAddress[]> =>
    await axiosInstance
      .patch<UserAddress[]>(`/addresses/${addressId}`, updateAddressDTO)
      .then(patchData),
  deleteAddress: async (addressId: string): Promise<UserAddress[]> =>
    await axiosInstance.delete<UserAddress[]>(`/addresses/${addressId}`).then(getData),
});

const countries = () => ({
  getCountries: async (signal?: AbortSignal): Promise<Country[]> =>
    await axiosInstance.get<Country[]>('/countries', { signal }).then(getData),
});

export default { auth, users, categories, products, cart, orders, addresses, countries };

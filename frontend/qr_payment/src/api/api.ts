import axios, { AxiosRequestConfig } from "axios";
import { GetMerchandiseRes, Payment, ProductInfo, User } from "./types";

const getAPI = async <T>(
  path: string,
  config?: AxiosRequestConfig<any>
): Promise<T> => {
  const response = await axios.get<T>(`http://127.0.0.1:8080/${path}`, config);
  return response.data;
};

const postAPI = async <T>(
  path: string,
  data?: any,
  config?: AxiosRequestConfig<any>
): Promise<T> => {
  const response = await axios.post<T>(
    `http://127.0.0.1:8080/${path}`,
    data,
    config
  );
  return response.data;
};

export const getInfoFromJANAPI = async (code: string): Promise<ProductInfo> => {
  return getAPI<ProductInfo>(`get-info-from-jan?code=${code}`);
};

export const getMerchandises = async (
  code: string
): Promise<GetMerchandiseRes> => {
  return getAPI<GetMerchandiseRes>(`merchandises?code=${code}`);
};

export const getPayments = async (
  user_id?: string
): Promise<Payment[] | undefined> => {
  return getAPI<Payment[]>("payments", {
    params: { user_id: user_id },
  });
};

export const getUsers = async (
  userId?: string
): Promise<User[] | undefined> => {
  return getAPI<User[]>("users", {
    params: { user_id: userId },
  });
};

export const postUser = async (name: string): Promise<User[] | undefined> => {
  return postAPI<User[]>("/users", {
    name: name,
  });
};

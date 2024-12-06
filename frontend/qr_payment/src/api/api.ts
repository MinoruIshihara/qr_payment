import axios, { AxiosRequestConfig } from "axios";
import { GetMerchandiseRes, Payment, ProductInfo, User } from "./types";

const apiAxios = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/`,
});

const getAPI = async <T>(
  path: string,
  config?: AxiosRequestConfig<any>
): Promise<T> => {
  try {
    const response = await apiAxios.get<T>(`${path}`, config);
    return response.data;
  } catch {
    console.log("サーバーエラー");
    throw new Error("Backend Error");
  }
};

const postAPI = async <T>(
  path: string,
  data?: any,
  config?: AxiosRequestConfig<any>
): Promise<T> => {
  try {
    const response = await apiAxios.post<T>(`${path}`, data, config);
    return response.data;
  } catch {
    console.log("サーバーエラー");
    throw new Error("Backend Error");
  }
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

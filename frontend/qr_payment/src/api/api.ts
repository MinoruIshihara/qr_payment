import axios, { AxiosRequestConfig } from "axios";
import {
  GetMerchandiseRes,
  Payment,
  PaymentForm,
  ProductInfo,
  User,
} from "./types";

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
  return getAPI<ProductInfo>("get-info-from-jan", {
    params: { code: code },
  });
};

export const getMerchandises = async (
  code?: string
): Promise<GetMerchandiseRes> => {
  return getAPI<GetMerchandiseRes>("merchandises", {
    params: { jan_code: code },
  });
};

export const getPayments = async (user_id?: string): Promise<Payment[]> => {
  return getAPI<Payment[]>("payments", {
    params: { user_id: user_id },
  });
};

export const postPayments = async (payment: PaymentForm): Promise<Payment> => {
  return postAPI<Payment>("check", payment);
};

export const getUsers = async (userId?: string): Promise<User[]> => {
  return getAPI<User[]>("users", {
    params: { user_id: userId },
  });
};

export const postUser = async (name: string): Promise<User[]> => {
  return postAPI<User[]>("/users", {
    name: name,
  });
};

import axios from "axios";

export type User = {
  CreatedAt: string;
  DeletedAt: string;
  ID: number;
  id: string;
  UpdatedAt: string;
  name: string;
};

export const getUsers = async (
  userId?: string
): Promise<User[] | undefined> => {
  try {
    const response = await axios.get<User[]>("http://127.0.0.1:8080/users", {
      params: { user_id: userId },
    });
    return response.data;
  } catch (error) {
    console.error("ユーザー情報取得エラー:", error);
    return;
  }
};

export const postUser = async (name: string): Promise<User[] | undefined> => {
  try {
    const response = await axios.post<User[]>("http://127.0.0.1:8080/users", {
      name: name,
    });
    return response.data;
  } catch (error) {
    console.error("ユーザー情報取得エラー:", error);
    return;
  }
};

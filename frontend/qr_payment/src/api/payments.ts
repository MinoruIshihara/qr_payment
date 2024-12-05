import axios from "axios";

export type Payment = {
  CreatedAt: string;
  DeletedAt: string;
  ID: number;
  UpdatedAt: string;
  merchandise: string;
  user_id: string;
};

export const getPayments = async (
  user_id?: string
): Promise<Payment[] | undefined> => {
  try {
    const response = await axios.get<Payment[]>(
      "http://127.0.0.1:8080/payments",
      {
        params: { user_id: user_id },
      }
    );
    return response.data;
  } catch (error) {
    console.error("支払い履歴取得エラー:", error);
    return;
  }
};
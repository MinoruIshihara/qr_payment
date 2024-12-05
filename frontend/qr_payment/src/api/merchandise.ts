import axios from "axios";

export type GetMerchandiseRes = {
  CreatedAt: string;
  DeletedAt: string;
  ID: number;
  UpdatedAt: string;
  jan_code: string;
  name: string;
  price: string;
}[];

export const getMerchandises = async (
  jan_code?: string
): Promise<GetMerchandiseRes | undefined> => {
  try {
    const response = await axios.get<GetMerchandiseRes>(
      "http://127.0.0.1:8080/merchandises",
      {
        params: { jan_code: jan_code },
      }
    );
    return response.data;
  } catch (error) {
    console.error("商品一覧取得エラー:", error);
    return;
  }
};

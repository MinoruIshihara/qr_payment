import axios from "axios";

export interface ProductInfo {
  codeNumber: string;
  itemName: string;
  itemModel: string;
  brandName: string;
  makerName: string;
  makerNameKana: string;
  ProductDetails: { [key: string]: any }; // 商品詳細をmapで定義
  codeType: string;
  itemUrl: string;
  itemImageUrl: string;
}

export const getInfoFromJAN = async (code: string): Promise<ProductInfo> => {
  const response = await axios.get<ProductInfo>(
    `http://127.0.0.1:8080/get-info-from-jan?code=${code}`
  );
  return response.data;
};

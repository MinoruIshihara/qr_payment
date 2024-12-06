export type Merchandise = {
  jan_code: string;
  name: string;
  price: string;
};

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

export type GetMerchandiseRes = {
  CreatedAt: string;
  DeletedAt: string;
  ID: number;
  UpdatedAt: string;
  jan_code: string;
  name: string;
  price: string;
}[];

export type Payment = {
  user: User;
  merchandise: Merchandise;
  datetime: string;
};

export type User = {
  CreatedAt: string;
  DeletedAt: string;
  ID: number;
  UpdatedAt: string;
  Name: string;
};

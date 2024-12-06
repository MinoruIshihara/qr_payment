import React, { useState, useEffect } from "react";
import axios from "axios";
import { GetMerchandiseRes } from "api/types";

export const Merchandises = () => {
  const [selectedProducts, setSelectedProducts] = useState(
    [] as GetMerchandiseRes
  );

  useEffect(() => {
    const fetchMerchandises = async () => {
      try {
        const response = await axios.get<GetMerchandiseRes>(
          "http://127.0.0.1:8080/merchandises"
        );
        setSelectedProducts(response.data);
      } catch (error) {
        console.error("支払い履歴取得エラー:", error);
      }
    };
    fetchMerchandises();
  }, []);

  return (
    <div>
      <h2>商品一覧</h2>
      <ul>
        {selectedProducts.map((product, index) => (
          <li key={index}>
            JAN {product.jan_code}, {product.name} ¥{product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { GetMerchandiseRes } from "api/types";
import { getMerchandises } from "api/api";

export const Merchandises = () => {
  const [selectedProducts, setSelectedProducts] = useState(
    [] as GetMerchandiseRes
  );

  useEffect(() => {
    const merchandises = getMerchandises();
    merchandises.then((res) => {
      setSelectedProducts(res);
    });
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

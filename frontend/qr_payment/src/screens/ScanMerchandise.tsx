import { getMerchandises, getUsers } from "api/api";
import { GetMerchandiseRes } from "api/types";
import React, { useState } from "react";
import BarcodeReader from "react-barcode-reader";
import { useNavigate } from "react-router-dom";

export const ScanMerchandise = () => {
  const initialMerchandise: GetMerchandiseRes = [];
  const [selectedProducts, setSelectedProducts] = useState(initialMerchandise);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleScanBarcode = (data: string) => {
    if (data.startsWith("USER")) {
      const user_id = data.substring(4).toLowerCase();
      const userRes = getUsers(user_id);
      userRes.then((res) => {
        if (res && res.length === 1) {
          console.log(res[0]);
          navigate("/check", {
            state: {
              selectedProducts: selectedProducts.map((product) => ({
                jan_code: product.jan_code,
                name: product.name,
                price: product.price,
              })),
              user: res[0],
            },
          });
        } else {
          console.log("登録されていないユーザーです");
        }
      });
    }
    const response = getMerchandises(data);
    response.then((res) => {
      if (res!.length === 0) {
        console.log("商品が登録されていません");
        return;
      }
      const merchandise = res![0];
      setSelectedProducts([...selectedProducts, merchandise]);
    });
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <div>
      <h2>商品スキャン</h2>
      <BarcodeReader onError={handleError} onScan={handleScanBarcode} />

      <h4>選択された商品:</h4>
      <ul>
        {selectedProducts.map((product, index) => (
          <li key={index}>
            {product.name}: ¥{product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

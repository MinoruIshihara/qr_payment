import React, { useState, useEffect } from "react";
import BarcodeReader from "react-barcode-reader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getInfoFromJANAPI } from "api/api";
import { Merchandise } from "api/types";

export const RegisterMerchandise = () => {
  const initialMerchandise: Merchandise[] = [];
  const [selectedProducts, setSelectedProducts] = useState(initialMerchandise);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleScanBarcode = (data: string) => {
    // バーコードデータ(JANコード)を処理
    const response = getInfoFromJANAPI(data);
    response.then((res) => {
      setSelectedProducts([
        ...selectedProducts,
        { jan_code: data, name: res.itemName, price: "" },
      ]);
    });
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  const handleRegister = () => {
    // /result に遷移する処理
    selectedProducts.forEach((value, index) => {
      console.log(`${index}: ${value.name} ¥${value.price}`);
    });
    navigate("/result", { state: { selectedProducts: selectedProducts } });
  };

  const handleClearMerchandise = () => {
    setSelectedProducts([]);
  };

  const handleChangePrise = (index: number, value: string) => {
    setSelectedProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = { ...updatedProducts[index], price: value };
      return updatedProducts;
    });
  };
  return (
    <div>
      <h2>商品登録</h2>
      <BarcodeReader onError={handleError} onScan={handleScanBarcode} />

      <h4>選択された商品:</h4>
      <ul>
        {selectedProducts.map((product, index) => (
          <li key={index}>
            {product.name}
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2" // Tailwind CSSでスタイルを適用
              value={product.price}
              onChange={(e) => {
                handleChangePrise(index, e.target.value);
              }}
            />
          </li>
        ))}
      </ul>
      <button onClick={handleRegister}>確認画面へ</button>
      <button onClick={handleClearMerchandise}>商品クリア</button>
    </div>
  );
};

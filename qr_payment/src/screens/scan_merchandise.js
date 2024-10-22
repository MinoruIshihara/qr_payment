import React, { useState, useEffect } from "react";
import BarcodeReader from "react-barcode-reader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ScanMerchandise = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleScanBarcode = (data) => {
    // バーコードデータ(JANコード)を処理
    setSelectedProducts([...selectedProducts, { merchandise: data }]);
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleProceedToCheck = () => {
    // /check に遷移する処理
    navigate("/check", { state: { selectedProducts: selectedProducts } });
  };

  useEffect(() => {
    // 必要に応じて、ユーザーの支払い履歴を取得
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8080/user/payments");
        // 支払い履歴を表示
        console.log(response.data);
      } catch (error) {
        console.error("支払い履歴取得エラー:", error);
      }
    };
  });

  return (
    <div>
      <h1>QRコード会計システム</h1>

      <h2>商品スキャン</h2>
      <BarcodeReader onError={handleError} onScan={handleScanBarcode} />

      <h2>選択された商品</h2>
      <ul>
        {selectedProducts.map((product, index) => (
          <li key={index}>{product.merchandise}</li>
        ))}
      </ul>
      <button onClick={handleProceedToCheck}>会計に進む</button>
    </div>
  );
};

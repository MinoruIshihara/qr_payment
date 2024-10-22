import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import BarcodeReader from "react-barcode-reader";
import axios from "axios";

export const Check = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [userId, setUserId] = useState(null);

  const handleScanBarcode = (data) => {
    // バーコードデータ(JANコード)を処理
    setSelectedProducts([...selectedProducts, { merchandise: data }]);
  };

  const handleScanQrCode = (data) => {
    // ユーザーQRコードデータ(user_id)を処理
    setUserId(data);
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handlePayment = async () => {
    try {
      await Promise.all(
        selectedProducts.map((product) =>
          axios.post("http://127.0.0.1:8000/check", {
            user_id: userId,
            merchandise: product.merchandise,
          })
        )
      );
      // 支払い成功時の処理 (例: 商品リストをクリア)
      setSelectedProducts([]);
    } catch (error) {
      console.error("支払いエラー:", error);
      // エラー処理 (例: エラーメッセージを表示)
    }
  };

  return (
    <div>
      <h2>ユーザーQRコードスキャン</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScanQrCode}
        style={{ width: "100%" }}
      />

      <h2>選択された商品</h2>
      <ul>
        {selectedProducts.map((product, index) => (
          <li key={index}>{product.merchandise}</li>
        ))}
      </ul>

      <button
        onClick={handlePayment}
        disabled={!userId || selectedProducts.length === 0}
      >
        支払う
      </button>
    </div>
  );
};

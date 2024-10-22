import React, { useState, useRef, useCallback } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import { useLocation } from "react-router-dom";

export const Check = () => {
  const location = useLocation();
  const initialSelectedProducts = location.state?.selectedProducts || []; // Optional chaining を使用
  const [selectedProducts, setSelectedProducts] = useState(
    initialSelectedProducts
  ); // useState を使用して定義
  const [userId, setUserId] = useState(null);
  const isQRCodeScanned = useRef(false);

  const handleScanQrCode = useCallback((result, error) => {
    if (!!result && !isQRCodeScanned.current) {
      isQRCodeScanned.current = true;
      setUserId(result.text);
      console.log(result.text);
      handlePayment();
      setSelectedProducts([]);
      console.log(selectedProducts);
    }
  });

  const handleError = (err) => {
    console.error(err);
  };

  const handlePayment = async () => {
    try {
      await Promise.all(
        selectedProducts.map((product) =>
          axios.post("http://127.0.0.1:8080/check", {
            user_id: userId,
            merchandise: product.merchandise,
          })
        )
      );
      // 支払い成功時の処理 (例: 商品リストをクリア)
    } catch (error) {
      console.error("支払いエラー:", error);
      // エラー処理 (例: エラーメッセージを表示)
    }
  };

  return (
    <div>
      <div style={{ width: "50%", margin: "0 auto" }}>
        <QrReader
          delay={100}
          onError={handleError}
          onResult={handleScanQrCode}
          style={{ width: "100%" }}
        />
      </div>
      <h2>選択された商品</h2> {/* 商品リストを表示 */}
      <ul>
        {selectedProducts.map((product, index) => (
          <li key={index}>{product.merchandise}</li>
        ))}
      </ul>
    </div>
  );
};

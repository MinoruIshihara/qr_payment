import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Merchandise } from "api/types";

export const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialSelectedProducts = location.state
    ?.selectedProducts as Merchandise[]; // Optional chaining を使用
  const [selectedProducts, setSelectedProducts] = useState(
    initialSelectedProducts
  ); // useState を使用して定義

  const handleRegister = async () => {
    try {
      await Promise.all(
        selectedProducts.map((product) =>
          axios.post("http://127.0.0.1:8080/register-merchandise", product)
        )
      );
      navigate("/");
    } catch (error) {
      console.error("登録エラー:", error);
    }
  };

  return (
    <div>
      <h2>選択された商品</h2> {/* 商品リストを表示 */}
      <ul>
        {selectedProducts.map((product, index) => (
          <li key={index}>
            JAN: {product.jan_code} {product.name} ¥{product.price}
          </li>
        ))}
      </ul>
      <button onClick={handleRegister}>登録する</button>
    </div>
  );
};

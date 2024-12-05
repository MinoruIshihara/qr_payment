import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Merchandise } from "./RegisterMerchandise";

export const Check = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartInfo = location.state as {
    selectedProducts: Merchandise[];
    user_id: string;
  }; // Optional chaining を使用

  const handlePayment = async () => {
    try {
      await Promise.all(
        cartInfo.selectedProducts.map((product) =>
          axios.post("http://127.0.0.1:8080/check", {
            user_id: cartInfo.user_id,
            merchandise: product.jan_code,
            datetime: new Date(),
          })
        )
      );
      // 支払い成功時の処理 (例: 商品リストをクリア)
      navigate("/payments", { state: { user_id: cartInfo.user_id } });
    } catch (error) {
      console.error("支払いエラー:", error);
      // エラー処理 (例: エラーメッセージを表示)
    }
  };

  return (
    <div>
      <h2>選択された商品</h2> {/* 商品リストを表示 */}
      <ul>
        {cartInfo.selectedProducts.map((product, index) => (
          <li key={index}>{product.jan_code}</li>
        ))}
      </ul>
      <p>ユーザー: {cartInfo.user_id}</p>
      <button onClick={handlePayment}>支払い完了</button>
    </div>
  );
};

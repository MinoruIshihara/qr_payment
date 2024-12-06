import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Merchandise, User } from "api/types";
import { postPayments } from "api/api";

export const Check = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartInfo = location.state as {
    selectedProducts: Merchandise[];
    user: User;
  };

  const handleCancel = () => {
    navigate("/scan-merchandise");
  };

  const handlePayment = async () => {
    await Promise.all(
      cartInfo.selectedProducts.map((product) =>
        postPayments({
          user_id: cartInfo.user.ID,
          jan_code: product.jan_code,
          datetime: new Date(),
        })
      )
    );
    navigate("/payments", { state: { user_id: cartInfo.user.ID } });
  };

  return (
    <div>
      <h2>選択された商品</h2> {/* 商品リストを表示 */}
      <ul>
        {cartInfo.selectedProducts.map((product, index) => (
          <li key={index}>
            {product.name} {product.price}
          </li>
        ))}
      </ul>
      <p>ユーザー: {cartInfo.user.Name}</p>
      <button onClick={handlePayment}>支払い完了</button>
      <button onClick={handleCancel}>キャンセル</button>
    </div>
  );
};

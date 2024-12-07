import { useLocation, useNavigate } from "react-router-dom";
import { Merchandise, User } from "api/types";
import { postPayments } from "api/api";
import { useEffect, useRef, useState } from "react";

export const Check = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState([] as Merchandise[]);
  const [user, setUser] = useState({
    UpdatedAt: "",
    DeletedAt: "",
    ID: "",
    Name: "",
  } as User);

  useEffect(() => {
    setSelectedProducts(location.state.selectedProducts);
    setUser(location.state.user);
    // 常にこのコンポーネントにフォーカスを強制的に当てる
    const intervalId = setInterval(() => {
      inputRef.current!.focus();
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const clear = () => {
    setSelectedProducts([]);
    setUser({
      UpdatedAt: "",
      DeletedAt: "",
      ID: "",
      Name: "",
    } as User);
  };

  const handleCancel = () => {
    clear();
    navigate("/scan-merchandise", { replace: true });
  };

  const handlePayment = async () => {
    await Promise.all(
      selectedProducts.map((product) =>
        postPayments({
          user_id: user.ID,
          jan_code: product.jan_code,
          datetime: new Date(),
        })
      )
    );
    navigate("/payments", { state: { user_id: user.ID }, replace: true });
  };
  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.code;
    if (key === "Enter") {
      handlePayment();
    }
    if (key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div tabIndex={0} onKeyDown={keyDownHandler} ref={inputRef}>
      <h2>選択された商品</h2> {/* 商品リストを表示 */}
      <ul>
        {selectedProducts.map((product, index) => (
          <li key={index}>
            {product.name} {product.price}
          </li>
        ))}
      </ul>
      <p>ユーザー: {user.Name}</p>
      <button onClick={handlePayment}>支払い完了</button>
      <button onClick={handleCancel}>キャンセル</button>
    </div>
  );
};

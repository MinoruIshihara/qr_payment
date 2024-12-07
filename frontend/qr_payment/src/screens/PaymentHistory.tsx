import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPayments } from "api/api";
import { Payment } from "api/types";

export const PaymentHistory = () => {
  const [payments, setPayments] = useState([] as Payment[]);
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = location.state.user_id;

  useEffect(() => {
    const paymentsRes = getPayments(user_id);
    paymentsRes.then((res) => {
      if (res) {
        setPayments(res);
      }
    });

    // 5秒後にトップページに遷移
    const timer = setTimeout(() => {
      navigate("/scan-merchandise");
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h2>購入履歴</h2>
      <ul>
        {payments.map((payment, index) => (
          <li key={index}>
            {payment.datetime}: {payment.merchandise.name} ¥
            {payment.merchandise.price}
          </li>
        ))}
      </ul>
      <h2>合計金額</h2>
      <p>
        {payments.reduce(
          (sum, payment) => sum + parseInt(payment.merchandise.price),
          0
        )}
      </p>
    </div>
  );
};

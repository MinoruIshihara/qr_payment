import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { getPayments, Payment } from "api/payments";

export const PaymentHistory = () => {
  const [payments, setPayments] = useState([] as Payment[]);
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = location.state.user_id;
  console.log(user_id);

  useEffect(() => {
    const paymentsRes = getPayments(user_id);
    paymentsRes.then((res) => {
      if (res) {
        setPayments(res);
      }
    });

    // 5秒後にトップページに遷移
    const timer = setTimeout(() => {
      navigate("/");
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
    </div>
  );
};

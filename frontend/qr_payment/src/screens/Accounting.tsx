import React, { useState, useEffect, useRef } from "react";
import { getPayments } from "api/api";
import { Payment } from "api/types";
import { CSVLink, CSVDownload } from "react-csv";

export const Accounting = () => {
  const [payments, setPayments] = useState([] as Payment[]);
  const anchorRef = useRef();

  useEffect(() => {
    const paymentsRes = getPayments();
    paymentsRes.then((res) => {
      if (res) {
        setPayments(res);
      }
    });
  }, []);

  return (
    <div>
      <h2>購入履歴</h2>
      <ul>
        {payments.map((payment, index) => (
          <li key={index}>
            {payment.user.Name} {payment.user.ID} {payment.datetime}:{" "}
            {payment.merchandise.name} ¥{payment.merchandise.price}
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
      <button
        onClick={() => {
          anchorRef.current!.link.click();
        }}
      >
        CSVダウンロード
      </button>
      <CSVLink
        data={payments.map((p) => {
          return {
            userID: p.user.ID,
            userName: p.user.Name,
            jan: p.merchandise.jan_code,
            name: p.merchandise.name,
            price: p.merchandise.price,
            datetime: p.datetime,
          };
        })}
        headers={[
          { label: "ユーザーID", key: "userID" },
          { label: "ユーザー名", key: "userName" },
          { label: "JANコード", key: "jan" },
          { label: "商品名", key: "name" },
          { label: "価格", key: "price" },
          { label: "購入日時", key: "datetime" },
        ]}
        filename={"account.csv"}
        ref={anchorRef}
      />
    </div>
  );
};

import React from "react";
import { LinkButton } from "./components/LinkButton";

export const Portal = () => {
  return (
    <>
      <h2>トップ</h2>
      <ol>
        <li>
          <LinkButton href="/scan-merchandise">商品購入</LinkButton>
        </li>

        <li>
          <LinkButton href="/register-merchandise">商品登録</LinkButton>
        </li>
        <li>
          <LinkButton href="/merchandises">商品一覧</LinkButton>
        </li>
        <li>
          <LinkButton href="/accounting">購入履歴</LinkButton>
        </li>
      </ol>
      <p>サーバーURL: {process.env.REACT_APP_BACKEND_URL}</p>
    </>
  );
};

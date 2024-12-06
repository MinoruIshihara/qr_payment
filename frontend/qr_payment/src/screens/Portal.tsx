import React from "react";
import { LinkButton } from "./components/LinkButton";

export const Portal = () => {
  return (
    <>
      <h2>トップ</h2>
      <ol>
        <li>
          <LinkButton href="/scan-merchandise">商品購入ページ</LinkButton>
        </li>

        <li>
          <LinkButton href="/register-merchandise">商品登録ページ</LinkButton>
        </li>
        <li>
          <LinkButton href="/merchandises">商品一覧ページ</LinkButton>
        </li>
      </ol>
      <p>サーバーURL: {process.env.REACT_APP_BACKEND_URL}</p>
    </>
  );
};

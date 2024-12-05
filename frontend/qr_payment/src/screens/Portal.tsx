import React from "react";
import { LinkButton } from "./components/LinkButton";

export const Portal = () => {
  return (
    <>
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
    </>
  );
};

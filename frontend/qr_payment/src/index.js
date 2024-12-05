import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals.js";

import { ScanMerchandise } from "./screens/ScanMerchandise.tsx";
import { RegisterMerchandise } from "./screens/RegisterMerchandise.tsx";
import { Check } from "./screens/Check.tsx";
import { Portal } from "./screens/Portal.tsx";
import { Result } from "./screens/Result.tsx";
import { Merchandises } from "./screens/Merchandises.tsx";
import { Users } from "./screens/Users.tsx";
import { PaymentHistory } from "./screens/PaymentHistory.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Portal />,
  },
  { path: "/users", element: <Users /> },
  {
    path: "/scan-merchandise",
    element: <ScanMerchandise />,
  },
  {
    path: "/register-merchandise",
    element: <RegisterMerchandise />,
  },
  {
    path: "/merchandises",
    element: <Merchandises />,
  },
  {
    path: "/check",
    element: <Check />,
  },
  {
    path: "/result",
    element: <Result />,
  },
  {
    path: "/payments",
    element: <PaymentHistory />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

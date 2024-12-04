import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { ScanMerchandise } from "./screens/scan_merchandise.js";
import { Check } from "./screens/check.js";
import { Portal } from "./screens/Portal.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Portal />,
  },
  {
    path: "/scan-merchandise",
    element: <ScanMerchandise />,
  },
  {
    path: "/check",
    element: <Check />,
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

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layouts from "./Layouts/Layouts";
import Main from "./page/Main/Main";
import Cart from "./page/Cart/Cart";
import ProductDetail from "./page/ProductDetail/ProductDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layouts />,
        children: [
            {
                path: "/main",
                element: <Main />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "productDetail/:id",
                element: <ProductDetail />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layouts from "./Layouts/Layouts";
import Main from "./page/Main/Main";
import Cart from "./page/Cart/Cart";
import ProductDetail from "./page/ProductDetail/ProductDetail";
import { Provider } from "react-redux";
import store from "./redux/store";
import ThanksOrder from "./page/order/ThanksOrder";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layouts />,
        children: [
            {
                path: "/",
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
            {
                path: "/order",
                element: <ThanksOrder />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

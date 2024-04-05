import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Main from "./page/Main/Main";
import Cart from "./page/Cart/Cart";
import ThanksOrder from "./page/Order/ThanksOrder";
import ProductDetail from "./page/ProductDetail/ProductDetail";
import { Provider } from "react-redux";
import store from "./redux/store";
import Purchases from "./page/Purchases/Purchases";
import Cloth from "./page/Cloth/Cloth";
import ClothDetail from "./page/ClothDetail/ClothDetail";
import Login from "./page/Auth/Login/Login";
import Register from "./page/Auth/Register/Register";

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
                path: "/cloth",
                element: <Cloth />,
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
                path: "productChothDetail/:id",
                element: <ClothDetail />,
            },
            {
                path: "/order",
                element: <ThanksOrder />,
            },
            {
                path: "/purchases",
                element: <Purchases />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

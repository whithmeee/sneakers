import React from "react";
import ReactDOM from "react-dom/client";
import Layouts from "./Layouts/Layouts";
import Main from "./page/Main/Main";
import Cloth from "./page/Cloth/Cloth";
import Cart from "./page/Cart/Cart";
import ProductDetail from "./page/ProductDetail/ProductDetail";
import ClothDetail from "./page/ClothDetail/ClothDetail";
import ThanksOrder from "./page/Order/ThanksOrder";
import Purchases from "./page/Purchases/Purchases";
import Login from "./page/Auth/Login/Login";
import Register from "./page/Auth/Register/Register";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./redux/store";
import "./index.css";

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

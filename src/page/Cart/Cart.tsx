import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import CartProducts from "./CartProducts";
import {
  addToCart,
  clearCart,
  decrementToCart,
  removeToCart,
  setCart,
} from "../../redux/cart.slice";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";
import axios from "axios";
import Empty from "../../components/empty/Empty";

import Form from "../../components/form/Form";
import { Inputs } from "../../interface/form.interface";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  size: number;
  count: number;
  type: string;
}

const Cart = () => {
  const items = useSelector((s: RootState) => s.cart.cart);
  const userID = useSelector((s: RootState) => s.user.profile?.id);
  const [loading, setLoading] = useState(true);

  console.log(items);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      const parsedItems: CartProduct[] = JSON.parse(storedCartItems);
      dispatch(setCart(parsedItems));

      if (items.length === 0) {
        dispatch(setCart(parsedItems));
      }
    }

    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(items));
    }
  }, [items]);

  const totalPrice = items.reduce((acc, item) => {
    return (acc += item.count * item.price);
  }, 0);

  const handleRemoveToCart = (id: number) => {
    dispatch(removeToCart(id));
    localStorage.removeItem("cartItems");
  };

  const handleIncrementCount = (id: number) => {
    dispatch(addToCart({ id: id }));
  };

  const handleDecrementCount = (id: number) => {
    dispatch(decrementToCart({ id: id }));
  };

  const handleSubmitOrder = async (data: Inputs) => {
    const formData = {
      ...data,
      userID: userID,
      items,
      totalPrice: totalPrice,
    };

    try {
      const respone = await axios.post(
        "https://b20e349e3a741b9b.mokky.dev/orders",
        formData
      );

      if (respone.status === 201) {
        dispatch(clearCart());
        navigate("/order");
      } else {
        alert("Ошибка");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2 className={styles["cart-main-title"]}>Корзина</h2>
      {items.length > 0 ? (
        <div className={styles["cart"]}>
          <Form handleSubmitOrder={handleSubmitOrder} />
          <CartProducts
            items={items}
            totalPrice={totalPrice}
            handleRemoveToCart={handleRemoveToCart}
            handleIncrementCount={handleIncrementCount}
            handleDecrementCount={handleDecrementCount}
          />
        </div>
      ) : (
        <>
          <Empty />
        </>
      )}
    </div>
  );
};

export default Cart;

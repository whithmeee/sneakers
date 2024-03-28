import { AppDispatch, RootState } from "../../redux/store";
import styles from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { removeToCart } from "../../redux/cart.slice";
import { useNavigate } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { FormEvent, useState } from "react";
import axios from "axios";
import Empty from "../../components/empty/Empty";

export interface CartProduct {
    id: number;
    title: string;
    price: number;
    image: string;
}

const Cart = () => {
    const items = useSelector((s: RootState) => s.cart.cart);
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const navigate = useNavigate();
    const totalPrice = items.reduce((acc, item) => {
        return (acc += item.price);
    }, 0);

    const handleRemoveToCart = (id: number) => {
        dispatch(removeToCart(id));
    };

    if (items.length === 0) {
        navigate("/");
    }

    const handleSubmitOrder = async (event: FormEvent) => {
        event.preventDefault();
        const formData = {
            email: email,
            name: name,
            phone: phone,
            city: city,
            item: items.map((item) => ({
                id: item.id,
                title: item.title,
                image: item.image,
                price: item.price,
            })),
            totalPrice: totalPrice,
        };

        try {
            const respone = await axios.post(
                "https://b20e349e3a741b9b.mokky.dev/orders",
                {
                    formData,
                }
            );

            if (respone.status) {
                navigate("/order");
            } else {
                alert("Ошибка");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {items.length > 0 ? (
                <div className={styles["cart"]}>
                    <form
                        onSubmit={handleSubmitOrder}
                        className={styles["cart-form"]}
                    >
                        <h3>Оформите заказ</h3>
                        <div className={styles["form-email"]}>
                            <label>Email</label>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                type="text"
                            />
                        </div>

                        <div className={styles["form-name"]}>
                            <label>ФИО</label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="ФИО"
                                type="text"
                            />
                        </div>

                        <div className={styles["form-phone"]}>
                            <label>Телефон</label>
                            <Input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Телефон"
                                type="text"
                            />
                        </div>

                        <div>
                            <label>ГОРОД</label>
                            <Input
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Город"
                                type="text"
                            />
                        </div>

                        <div className={styles["button-form"]}>
                            <Button
                                appearance="big"
                                children="Оформить заказ"
                            />
                        </div>
                    </form>

                    <div className={styles["cart-item"]}>
                        <div className={styles["cart-info"]}>
                            <p className={styles["info-title"]}>
                                В корзине {items.length} товаров
                            </p>

                            <div className={styles["info-pay"]}>
                                <p className={styles["info-price"]}>
                                    <span>Стоимость товаров:</span>
                                    <span>{totalPrice} ₽</span>
                                </p>
                                <p className={styles["info-devilery"]}>
                                    <span>Доставка:</span>
                                    <span>0 </span>
                                </p>
                                <p className={styles["info-result"]}>
                                    <span>Итог:</span>
                                    <span>{totalPrice} ₽</span>
                                </p>
                            </div>
                        </div>

                        {items.map((item) => (
                            <div
                                key={item.id}
                                className={styles["cart-content"]}
                            >
                                {<img src={item.image} alt={item.title} />}
                                <div className={styles["cart-title"]}>
                                    <p className={styles["cart-price"]}>
                                        {item.price} ₽
                                    </p>
                                    <span>
                                        {item.title.length > 35
                                            ? `${item.title.slice(0, 26)}`
                                            : item.title}
                                    </span>
                                </div>

                                <div
                                    onClick={() => handleRemoveToCart(item.id)}
                                    className={styles["cart-close"]}
                                >
                                    <IoCloseOutline />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <Empty />
            )}
        </div>
    );
};

export default Cart;

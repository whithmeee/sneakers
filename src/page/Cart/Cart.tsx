import { AppDispatch, RootState } from "../../redux/store";
import styles from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import CartProducts from "./CartProducts";
import {
    addToCart,
    clearCart,
    decrementToCart,
    removeToCart,
} from "../../redux/cart.slice";
import { useNavigate } from "react-router-dom";
import {
    ChangeEvent,
    FormEvent,
    SyntheticEvent,
    useEffect,
    useState,
} from "react";
import axios from "axios";
import Empty from "../../components/empty/Empty";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

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
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [nameDirty, setNameDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [phoneDirty, setPhoneDirty] = useState(false);
    const [cityDirty, setCityDirty] = useState(false);
    const [errorName, setErrorName] = useState("ФИО не может быть пустым");
    const [errorEmail, setErrorEmail] = useState("Email не может быть пустым");
    const [errorPhone, setErrorPhone] = useState(
        "Телеофн не может быть пустым"
    );
    const [errorCity, setErrorCity] = useState("Город не может быть пустым");

    const [formValid, setFormValid] = useState(false);

    const totalPrice = items.reduce((acc, item) => {
        return (acc += item.count * item.price);
    }, 0);

    const handleRemoveToCart = (id: number) => {
        dispatch(removeToCart(id));
    };

    const handleIncrementCount = (id: number) => {
        dispatch(addToCart({ id: id }));
    };

    const handleDecrementCount = (id: number) => {
        dispatch(decrementToCart({ id: id }));
    };

    const handleBlurSumbit = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        switch (target.name) {
            case "name":
                setNameDirty(true);
                break;
            case "email":
                setEmailDirty(true);
                break;
            case "phone":
                setPhoneDirty(true);
                break;
            case "city":
                setCityDirty(true);
                break;
        }
    };

    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const EMAIL_REGEXP =
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        if (!EMAIL_REGEXP.test(String(e.target.value).toLowerCase())) {
            setErrorEmail("Неверный email");
        } else {
            setErrorEmail("");
        }
    };

    const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (e.target.value === "") {
            setErrorName("ФИО не может быть пустым");
        } else {
            setErrorName("");
        }
    };

    const phoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
        const PHONE_REGEXP =
            /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

        if (!PHONE_REGEXP.test(String(e.target.value))) {
            setErrorPhone("Неверный телефон");
        } else {
            setErrorPhone("");
        }
    };

    const cityHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
        if (e.target.value === "") {
            setErrorCity("Город не может быть пустым");
        } else {
            setErrorCity("");
        }
    };

    const handleSubmitOrder = async (event: FormEvent) => {
        event.preventDefault();
        const formData = {
            userId: userID,
            email: email,
            name: name,
            phone: phone,
            city: city,
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

    useEffect(() => {
        if (errorName || errorEmail || errorPhone || errorCity) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [errorName, errorEmail, errorPhone, errorCity]);

    return (
        <div>
            <h2 className={styles["cart-main-title"]}>Корзина</h2>
            {items.length > 0 ? (
                <div className={styles["cart"]}>
                    <form
                        onSubmit={handleSubmitOrder}
                        className={styles["cart-form"]}
                    >
                        <h3>Оформите заказ</h3>
                        <div className={styles["form-email"]}>
                            <label>Email</label>
                            {emailDirty && errorEmail && (
                                <span style={{ color: "red" }}>
                                    {errorEmail}
                                </span>
                            )}
                            <Input
                                onBlur={(e) => handleBlurSumbit(e)}
                                value={email}
                                onChange={emailHandler}
                                placeholder="Email"
                                type="text"
                                name="email"
                            />
                        </div>

                        <div className={styles["form-name"]}>
                            <label>ФИО</label>
                            {nameDirty && errorName && (
                                <div style={{ color: "red" }}>{errorName}</div>
                            )}
                            <Input
                                value={name}
                                onBlur={(e) => handleBlurSumbit(e)}
                                onChange={nameHandler}
                                placeholder="ФИО"
                                type="text"
                                name="name"
                            />
                        </div>

                        <div className={styles["form-phone"]}>
                            <label>Телефон</label>
                            {phoneDirty && errorPhone && (
                                <div
                                    style={{
                                        color: "red",
                                    }}
                                >
                                    {errorPhone}
                                </div>
                            )}
                            <Input
                                value={phone}
                                onBlur={(e) => handleBlurSumbit(e)}
                                onChange={phoneHandler}
                                placeholder="Телефон"
                                type="text"
                                name="phone"
                            />
                        </div>

                        <div className={styles["form-city"]}>
                            <label>ГОРОД</label>
                            {cityDirty && errorCity && (
                                <div style={{ color: "red" }}>{errorCity}</div>
                            )}
                            <Input
                                value={city}
                                onBlur={(e) => handleBlurSumbit(e)}
                                onChange={cityHandler}
                                placeholder="Город"
                                type="text"
                                name="city"
                            />
                        </div>

                        <div className={styles["button-form"]}>
                            <Button
                                disabled={!formValid}
                                appearance="big"
                                children="Оформить заказ"
                            />
                        </div>
                    </form>
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

import { useEffect, useState } from "react";
import styles from "./Purchases.module.css";
import axios from "axios";
import { CartProduct } from "../Cart/Cart";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Nopurchases from "./Nopurchases";
import Loader from "../../components/loader/Loader";

const Purchases = () => {
    const [cartPurchase, setCartPurchase] = useState<CartProduct[]>([]);
    const userID = useSelector((s: RootState) => s.user.profile?.id);
    const [loading, setLoading] = useState(true);

    const handleCartPurchase = async () => {
        try {
            const { data } = await axios.get(
                `https://b20e349e3a741b9b.mokky.dev/orders?id=${userID}`
            );
            if (Array.isArray(data) && data.length > 0) {
                const items = data.map((order) => order.items).flat();
                setCartPurchase(items);
            } else {
                console.log("Неверный формат данных или данные отсутствуют");
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        handleCartPurchase();
    }, []);
    return (
        <div className={styles["purchases"]}>
            <h2>Мои покупки</h2>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {cartPurchase.length > 0 ? (
                        <div className={styles["purchases-items"]}>
                            <div className={styles["purchases-item"]}>
                                {cartPurchase.map((cart) => (
                                    <div
                                        className={
                                            styles["purchases-item-content"]
                                        }
                                        key={cart.id}
                                    >
                                        <div
                                            className={styles["purchases-img"]}
                                        >
                                            <img src={cart.image} alt="" />
                                        </div>
                                        <div>
                                            <div
                                                className={
                                                    styles["purchases-content"]
                                                }
                                            >
                                                <h5>{cart.title}</h5>
                                                <p
                                                    className={
                                                        styles[
                                                            "purchases-count"
                                                        ]
                                                    }
                                                >
                                                    Кол-во: {cart.count}
                                                </p>
                                                <p
                                                    className={
                                                        styles[
                                                            "purchases-count"
                                                        ]
                                                    }
                                                >
                                                    Размер: {cart.size}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <Nopurchases />
                    )}
                </>
            )}
        </div>
    );
};

export default Purchases;

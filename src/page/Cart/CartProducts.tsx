import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import styles from "./Cart.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { CartProduct } from "./Cart";

interface CartProductProps {
    items: CartProduct[];
    totalPrice: number;
    handleRemoveToCart: (id: number) => void;
    handleDecrementCount: (id: number) => void;
    handleIncrementCount: (id: number) => void;
}

const CartProducts = ({
    items,
    totalPrice,
    handleIncrementCount,
    handleDecrementCount,
    handleRemoveToCart,
}: CartProductProps) => {
    console.log(items);

    return (
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
                <div key={item.id} className={styles["cart-content"]}>
                    {<img src={item.image} alt={item.title} />}
                    <div className={styles["cart-title"]}>
                        <p className={styles["cart-price"]}>{item.price} ₽</p>
                        <p className={styles["cart-size"]}>
                            Размер: {item.size}
                        </p>
                        <span>
                            {item.title.length > 35
                                ? `${item.title.slice(0, 26)}`
                                : item.title}
                        </span>

                        <div className={styles["cart-count"]}>
                            <button>
                                <CiCirclePlus
                                    onClick={() =>
                                        handleIncrementCount(item.id)
                                    }
                                />
                            </button>
                            <span>{item.count}</span>
                            <button>
                                <CiCircleMinus
                                    onClick={() =>
                                        handleDecrementCount(item.id)
                                    }
                                />
                            </button>
                        </div>
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
    );
};

export default CartProducts;

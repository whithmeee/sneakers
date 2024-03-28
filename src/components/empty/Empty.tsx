import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";
import styles from "./Empty.module.css";

const Empty = () => {
    return (
        <div className={styles["empty"]}>
            <h2>Корзина пуста</h2>

            <p>
                Чтобы облегчить покупку войдите в личный кабинет. Вдруг у вас
                есть крутой список избранных товаров или что-то завалялось в
                корзине. А за новинками — в каталог.
            </p>

            <div className={styles["empty-buttons"]}>
                <Link to={"/"}>
                    <Button children={"Войти"} />
                </Link>
                <Link to={"/"}>
                    <Button appearance="small" children={"В каталог"} />
                </Link>
            </div>
        </div>
    );
};

export default Empty;

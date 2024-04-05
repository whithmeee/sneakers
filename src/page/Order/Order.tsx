import styles from "./Order.module.css";
import orderImg from "../../../public/order.jpg";
import Button from "../../components/UI/Button/Button";
import { Link } from "react-router-dom";

const Order = () => {
    return (
        <div className={styles["order"]}>
            <h2>Ваш заказ успешно оформлен!</h2>
            <img src={orderImg} alt="order-img" />

            <Link to={"/"}>
                <Button children="На главную" />
            </Link>
        </div>
    );
};

export default Order;

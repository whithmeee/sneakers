import styles from "./ThanksOrder.module.css";
import orderImg from "../../../public/order.jpg";
import Button from "../../components/UI/Button/Button";
import { Link } from "react-router-dom";

const ThanksOrder = () => {
    return (
        <div className={styles["order"]}>
            <h2>Спасибо, ваш заказ был успешно оформлен!</h2>
            <img src={orderImg} alt="order-img" />

            <Link to={"/"}>
                <Button children="На главную" />
            </Link>
        </div>
    );
};

export default ThanksOrder;

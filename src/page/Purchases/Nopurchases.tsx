import { Link } from "react-router-dom";
import imgNoPurchases from "../../../public/byu.png";
import styles from "./Purchases.module.css";
import Button from "../../components/UI/Button/Button";

const Nopurchases = () => {
    return (
        <div className={styles["nopurchases"]}>
            <h3>Упс! У вас нет ни одной покупки.</h3>

            <img src={imgNoPurchases} alt="#" />
            <Link to={"/"}>
                <Button children="В каталог" />
            </Link>
        </div>
    );
};

export default Nopurchases;

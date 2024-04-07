import { Link } from "react-router-dom";
import styles from "./Logged.module.css";
import Button from "../UI/Button/Button";

const Logged = () => {
    return (
        <div className={styles["logged"]}>
            <h1>Вы не авторизовались на сайте</h1>

            <p>Для просмотра истории покупок вам необходимо авторизоваться.</p>
            <div className={styles["logged-links"]}>
                <Link to="/login">
                    <Button children="Войти" />
                </Link>

                <Link to="/register">
                    <Button children="Зарегистрироваться" />
                </Link>
            </div>
        </div>
    );
};

export default Logged;

import styles from "./Login.module.css";
import login from "../../../../public/login.png";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className={styles["login"]}>
            <div className={styles["login-content"]}>
                <div className={styles["login-img"]}>
                    <img src={login} alt="login" />
                </div>
                <form className={styles["login-form"]}>
                    <div>
                        <label htmlFor="">Ваш Email</label>
                        <Input placeholder="Email" />
                    </div>

                    <div>
                        <label htmlFor="">Ваш Пароль</label>
                        <Input placeholder="Password" />
                    </div>

                    <div className={styles["form-buttom"]}>
                        <span>Нет аккаунта?</span>
                        <Link to={"/register"}>Зарегестрироваться</Link>

                        <Button appearance="big" children={"Войти"} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

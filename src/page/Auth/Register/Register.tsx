import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import register from "../../../../public/register.png";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";

const Register = () => {
    return (
        <div className={styles["register"]}>
            <div className={styles["register-content"]}>
                <div className={styles["register-img"]}>
                    <img src={register} alt="register" />
                </div>
                <form className={styles["register-form"]}>
                    <div>
                        <label htmlFor="">Ваше Имя</label>
                        <Input placeholder="Имя" />
                    </div>
                    <div>
                        <label htmlFor="">Ваш Email</label>
                        <Input placeholder="Email" />
                    </div>

                    <div>
                        <label htmlFor="">Ваш Пароль</label>
                        <Input placeholder="Пароль" />
                    </div>

                    <div className={styles["register-buttom"]}>
                        <span>Есть аккаунт?</span>
                        <Link to={"/login"}>Войти</Link>

                        <Button
                            appearance="big"
                            children={"Зарегистрироваться"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;

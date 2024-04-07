import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import register from "../../../../public/register.png";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import axios from "axios";
import { FormEvent } from "react";

interface RegisterForm {
    name: {
        value: string;
    };
    email: {
        value: string;
    };
    password: {
        value: string;
    };
}

const Register = () => {
    const navigate = useNavigate();
    const handleSumbitRegister = async (event: FormEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & RegisterForm;
        const { name, email, password } = target;

        await sendSumnitFormRegister(name.value, email.value, password.value);
    };

    const sendSumnitFormRegister = async (
        name: string,
        email: string,
        password: string
    ) => {
        const { data } = await axios.post(
            "https://b20e349e3a741b9b.mokky.dev/register",
            {
                name: name,
                email: email,
                password: password,
            }
        );
        const accessToken = data.data.token;
        localStorage.setItem("token", accessToken);
        navigate("/login");
    };

    return (
        <div className={styles["register"]}>
            <div className={styles["register-content"]}>
                <div className={styles["register-img"]}>
                    <img src={register} alt="register" />
                </div>
                <form
                    onSubmit={handleSumbitRegister}
                    className={styles["register-form"]}
                >
                    <div>
                        <label htmlFor="name">Ваше Имя</label>
                        <Input placeholder="Имя" name="name" />
                    </div>
                    <div>
                        <label htmlFor="">Ваш Email</label>
                        <Input placeholder="Email" name="email" />
                    </div>

                    <div>
                        <label htmlFor="">Ваш Пароль</label>
                        <Input placeholder="Пароль" name="password" />
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

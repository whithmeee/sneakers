import styles from "./Login.module.css";
import loginImg from "../../../../public/login.png";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { clearLoginError, login } from "../../../redux/user.slice";

interface LoginForm {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
}

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { token, loginErrorMessage } = useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    const handleFormLogin = async (event: FormEvent) => {
        event.preventDefault();
        dispatch(clearLoginError());
        const target = event.target as typeof event.target & LoginForm;
        const { email, password } = target;
        await sendLoginForm(email.value, password.value);
    };

    const sendLoginForm = async (email: string, password: string) => {
        dispatch(login({ email, password }));
    };

    return (
        <div className={styles["login"]}>
            <div className={styles["login-content"]}>
                <div className={styles["login-img"]}>
                    <Link to={"/"}>
                        <Button children={"Вернуться в магазин"} />
                    </Link>
                    <img src={loginImg} alt="login" />
                </div>

                <form
                    onSubmit={handleFormLogin}
                    className={styles["login-form"]}
                >
                    {loginErrorMessage && (
                        <div style={{ color: "red", fontSize: "20px" }}>
                            {loginErrorMessage}
                        </div>
                    )}
                    <div>
                        <label htmlFor="">Ваш Email</label>
                        <Input placeholder="Email" name="email" type="text" />
                    </div>

                    <div>
                        <label htmlFor="">Ваш Пароль</label>
                        <Input
                            placeholder="Password"
                            name="password"
                            type="password"
                        />
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

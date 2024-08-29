import styles from "./Login.module.css";
import loginImg from "../../../../public/login.png";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { login } from "../../../redux/user.slice";
import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { register, formState, handleSubmit } = useForm<LoginForm>({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleFormLogin = ({ email, password }: LoginForm) => {
    sendLoginForm(email, password);
  };

  const sendLoginForm = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  const errorEmail = formState.errors["email"]?.message;
  const errorPassword = formState.errors["password"]?.message;

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
          onSubmit={handleSubmit(handleFormLogin)}
          className={styles["login-form"]}
        >
          <div>
            <label htmlFor="">Ваш Email</label>
            <Input
              type="text"
              placeholder="Email"
              {...register("email", {
                required: "Поле обязательное",
                pattern: {
                  value: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
                  message: "Неверный email",
                },
              })}
            />
            {errorEmail && <p className={styles["error"]}>{errorEmail}</p>}
          </div>

          <div>
            <label htmlFor="">Ваш Пароль</label>
            <Input
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "Поля обязательное",
              })}
            />
            {errorPassword && (
              <p className={styles["error"]}>{errorPassword}</p>
            )}
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

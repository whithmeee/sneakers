import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "../../../../public/register.png";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import axios from "axios";

import { useForm } from "react-hook-form";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();

  const { register, formState, handleSubmit } = useForm<RegisterForm>({
    mode: "onChange",
  });
  const handleSumbitRegister = ({ name, email, password }: RegisterForm) => {
    console.log(name, email, password);
    sendSumnitFormRegister(name, email, password);
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

  const errorName = formState.errors["name"]?.message;
  const errorEmail = formState.errors["email"]?.message;
  const errorPassword = formState.errors["password"]?.message;

  return (
    <div className={styles["register"]}>
      <div className={styles["register-content"]}>
        <div className={styles["register-img"]}>
          <Link to={"/"}>
            <Button children={"Вернуться в магазин"} />
          </Link>
          <img src={registerImg} alt="register-img" />
        </div>
        <form
          onSubmit={handleSubmit(handleSumbitRegister)}
          className={styles["register-form"]}
        >
          <div>
            <label htmlFor="">Ваше Имя</label>
            <Input
              type="text"
              placeholder="Имя"
              {...register("name", {
                required: "Поле обязательное",
              })}
            />

            {errorName && <p className={styles["error"]}>{errorName}</p>}
          </div>
          <div>
            <label htmlFor="">Ваш Email</label>
            <Input
              type="email"
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
              type="password"
              placeholder="Пароль"
              {...register("password", {
                required: "Поле обязательное",
              })}
            />

            {errorPassword && (
              <p className={styles["error"]}>{errorPassword}</p>
            )}
          </div>

          <div className={styles["register-buttom"]}>
            <span>Есть аккаунт?</span>
            <Link to={"/login"}>Войти</Link>

            <Button appearance="big" children={"Зарегистрироваться"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

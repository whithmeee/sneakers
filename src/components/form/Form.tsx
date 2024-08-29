import { FC } from "react";
import styles from "./Form.module.css";
import Button from "../UI/Button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "../../interface/form.interface";

interface IForm {
  handleSubmitOrder: (data: Inputs) => void;
}

const Form: FC<IForm> = ({ handleSubmitOrder }) => {
  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleSubmitOrder(data);
  };
  const errorEmail = formState.errors["email"]?.message;
  const errorName = formState.errors["name"]?.message;
  const errorCity = formState.errors["city"]?.message;
  const errorAdress = formState.errors["address"]?.message;
  const errorSurname = formState.errors["surname"]?.message;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["cart-form"]}>
      <h3 className={styles["form-title"]}>Оформите заказ</h3>

      <div className={styles["form-surname"]}>
        <label htmlFor="surname">Фамилия</label>
        <input
          type="text"
          placeholder="Фамилия"
          {...register("surname", {
            required: "Поле обязательное",
          })}
        />
        {errorSurname && <p className={styles["error"]}>{errorSurname}</p>}
      </div>

      <div className={styles["form-name"]}>
        <label htmlFor="Имя">Имя</label>
        <input
          type="text"
          placeholder="Имя"
          {...register("name", {
            required: "Поле обязательное",
          })}
        />
        {errorName && <p className={styles["error"]}>{errorName}</p>}
      </div>

      <div className={styles["form-email"]}>
        <label htmlFor="Email">Email</label>
        <input
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

      <div className={styles["form-sity"]}>
        <label htmlFor="Город">Город</label>
        <input
          type="text"
          placeholder="Город"
          {...register("city", {
            required: "Поле обязательное",
          })}
        />

        <p>{errorCity && <p className={styles["error"]}>{errorCity}</p>}</p>
      </div>

      <div className={styles["form-sity"]}>
        <label htmlFor="Адрес">Адрес</label>
        <input
          type="text"
          placeholder="Адрес"
          {...register("address", {
            required: "Поле обязательное",
          })}
        />

        {errorAdress && <p className={styles["error"]}>{errorAdress}</p>}
      </div>

      <span className={styles["button"]}>
        <Button>Оформить заказ</Button>
      </span>
    </form>
  );
};

export default Form;

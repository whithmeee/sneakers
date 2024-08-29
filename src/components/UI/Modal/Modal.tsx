import { Link } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./Modal.module.css";
import { IoCloseSharp } from "react-icons/io5";

interface Modal {
  isOpen: boolean;
  children: React.ReactNode;
  closeModal: (close: boolean) => void;
}

const Modal = ({ isOpen, closeModal, children }: Modal) => {
  return (
    <div
      onClick={() => closeModal(false)}
      className={`${styles.modal} ${isOpen ? styles.active : ""}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles["modal-content"]}
      >
        <IoCloseSharp onClick={() => closeModal(false)} />
        <p className={styles["modal-desc"]}>Товар добавлен в корзину!</p>
        <p className={styles["modal-item"]}>{children}</p>

        <Link to={`/cart`}>
          <Button>Перейти в корзину</Button>
        </Link>
      </div>
    </div>
  );
};

export default Modal;

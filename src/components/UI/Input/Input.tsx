import type { Input } from "../../../interface/input.interface";
import styles from "./Input.module.css";

const Input = ({ ...props }: Input) => {
  return <input className={styles["input"]} type="text" {...props} />;
};

export default Input;

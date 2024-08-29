import React from "react";
import type { Input } from "../../../interface/input.interface";
import styles from "./Input.module.css";

const Input = React.forwardRef<HTMLInputElement, Input>((props, ref) => {
  return <input className={styles["input"]} ref={ref} {...props} />;
});

export default Input;

import { ButtonProps } from "../../../interface/button.interface";
import cn from "classnames";
import styles from "./Button.module.css";

const Button = ({ appearance, children }: ButtonProps) => {
    return (
        <button
            className={cn(styles["button"], {
                [styles["big"]]: appearance === "big",
                [styles["small"]]: appearance === "small",
            })}
        >
            {children}
        </button>
    );
};

export default Button;

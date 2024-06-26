import { ButtonProps } from "../../../interface/button.interface";
import cn from "classnames";
import styles from "./Button.module.css";

const Button = ({ appearance = "small", children, ...props }: ButtonProps) => {
    return (
        <button
            {...props}
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

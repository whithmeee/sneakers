import { NavLink, Outlet } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import styles from "./Layouts.module.css";
import cn from "classnames";
import Button from "../components/UI/Button/Button";

const Layouts = () => {
    return (
        <div className={styles["layouts"]}>
            <div className={styles["layouts-content"]}>
                <div className={styles["profile"]}>
                    <img
                        src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png"
                        alt=""
                    />
                    <p>Костя</p>
                    <span>shpinev13@mail.ru</span>
                </div>
                <div className={styles["links-menu"]}>
                    <NavLink
                        className={({ isActive }) =>
                            cn(styles["links"], {
                                [styles["active"]]: isActive === true,
                            })
                        }
                        to={"/main"}
                    >
                        Обувь
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            cn(styles["links"], {
                                [styles["active"]]: isActive === true,
                            })
                        }
                        to={"/cart"}
                    >
                        Корзина
                    </NavLink>
                </div>

                <div className={styles["exit"]}>
                    <Button>
                        <IoExitOutline
                            style={{ width: "30px", height: "30px" }}
                        />
                        Выйти
                    </Button>
                </div>
            </div>

            <div className={styles["content"]}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layouts;

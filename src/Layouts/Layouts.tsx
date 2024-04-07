import { Link, NavLink, Outlet } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import styles from "./Layouts.module.css";
import cn from "classnames";
import Button from "../components/UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { logout, getProfile } from "../redux/user.slice";
import { useEffect } from "react";

const Layouts = () => {
    const items = useSelector((s: RootState) => s.cart.cart);
    const token = useSelector((s: RootState) => s.user.token);
    const profileUser = useSelector((s: RootState) => s.user.profile);

    const dispatch = useDispatch<AppDispatch>();

    const exitAccount = () => {
        dispatch(logout());
        window.location.reload();
    };

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);
    return (
        <div className={styles["layouts"]}>
            <div className={styles["layouts-content"]}>
                {token ? (
                    <div key={profileUser?.id} className={styles["profile"]}>
                        <img
                            src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png"
                            alt=""
                        />
                        <p>{profileUser?.name}</p>
                        <span>{profileUser?.email}</span>
                    </div>
                ) : null}

                <div className={styles["links-menu"]}>
                    <NavLink
                        className={({ isActive }) =>
                            cn(styles["links"], {
                                [styles["active"]]: isActive === true,
                            })
                        }
                        to={"/purchases"}
                    >
                        Мои покупки
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            cn(styles["links"], {
                                [styles["active"]]: isActive === true,
                            })
                        }
                        to={"/cloth"}
                    >
                        Одежда
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            cn(styles["links"], {
                                [styles["active"]]: isActive === true,
                            })
                        }
                        to={"/"}
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
                        <span className={styles["items-count"]}>
                            {items.length}
                        </span>
                    </NavLink>
                </div>

                <div className={styles["exit"]}>
                    {token ? (
                        <Button onClick={exitAccount}>
                            <IoExitOutline
                                style={{ width: "30px", height: "30px" }}
                            />
                            Выйти
                        </Button>
                    ) : (
                        <Link to={"/login"}>
                            <Button>
                                <IoExitOutline
                                    style={{ width: "30px", height: "30px" }}
                                />
                                Войти
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            <div className={styles["content"]}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layouts;

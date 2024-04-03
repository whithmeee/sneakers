import { Link } from "react-router-dom";
import styles from "./Cloth.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader/Loader";

export interface Cloth {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    size: string[];
}

const Cloth = () => {
    const [productsCloth, setProductsCloth] = useState<Cloth[]>([]);

    const getClothProducts = async () => {
        try {
            const { data } = await axios.get(
                "https://b20e349e3a741b9b.mokky.dev/cloth"
            );
            setProductsCloth(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getClothProducts();
    }, []);
    return (
        <div className={styles["cloth"]}>
            <h2>Одежда</h2>

            <div className={styles["cloth-items"]}>
                <div className={styles["cloth-item"]}>
                    {productsCloth.length > 0 ? (
                        productsCloth.map((cloth) => (
                            <Link
                                className={styles["cloth-links"]}
                                to={`/productChothDetail/${cloth.id}`}
                            >
                                <div className={styles["cloth-img"]}>
                                    <img src={cloth.image} alt="" />
                                </div>
                                <div>
                                    <div className={styles["cloth-content"]}>
                                        <h5>{cloth.title}</h5>
                                        <div className={styles["cloth-price"]}>
                                            <p>{cloth.price} ₽</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cloth;

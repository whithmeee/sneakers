import { useEffect, useState } from "react";
import { ProductProps } from "../../interface/product.interface";
import axios from "axios";

import styles from "./Main.module.css";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";

export interface ApiResponse {
    items: ProductProps[];
}

const Main = () => {
    const [products, setProducts] = useState<ProductProps[]>([]);

    const getProducts = async () => {
        try {
            const { data } = await axios.get(
                "https://b20e349e3a741b9b.mokky.dev/items"
            );

            console.log(data);
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className={styles["items-content"]}>
            <div className={styles["items"]}>
                <div className={styles["item"]}>
                    {products.length > 0 ? (
                        products.map((product: ProductProps) => (
                            <Link
                                className={styles["links"]}
                                to={`/productDetail/${product.id}`}
                            >
                                <div className={styles["item-img"]}>
                                    <img src={product.images[0]} alt="" />
                                </div>
                                <div key={product.id}>
                                    <div className={styles["item-content"]}>
                                        <h5>{product.title}</h5>
                                        <div className={styles["item-price"]}>
                                            <p>{product.price} ₽</p>
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

export default Main;

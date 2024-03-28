import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import Button from "../../components/UI/Button/Button";
import styles from "./ProductDetail.module.css";
import ProductAccardion from "./ProductAccardion";

export interface ProductDetail {
    id: number;
    title: string;
    desctiption: string;
    images: string[];
    price: string;
    size: number[];
    color: string;
    country: string;
    floor: string;
    compound: string[];
}

const ProductDetail = () => {
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState<ProductDetail | null>(
        null
    );

    const [activeImage, setActiveImage] = useState(0);

    console.log(activeImage);

    const getProductDetail = async () => {
        try {
            const { data } = await axios.get<ProductDetail>(
                `https://b20e349e3a741b9b.mokky.dev/items/${id}`
            );
            setProductDetail(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickActiveImage = (index: number) => {
        if (index === activeImage) setActiveImage(0);
        else setActiveImage(index);
    };

    useEffect(() => {
        getProductDetail();
    }, [id]);

    if (!productDetail) {
        return <Loader />;
    }

    return (
        <div className={styles["product-detail"]}>
            <div className={styles["main-img"]}>
                <img src={productDetail.images[activeImage]} alt="" />
                <div className={styles["product-images"]}>
                    {productDetail.images.map((img, index) => (
                        <img
                            key={index}
                            onClick={() => handleClickActiveImage(index)}
                            src={img}
                            alt=""
                        />
                    ))}
                </div>
            </div>
            <div className={styles["product-content"]}>
                <h2>{productDetail.title}</h2>

                <div className={styles["product-size"]}>
                    <select className={styles["select"]}>
                        <option value="">Размер: </option>
                        {productDetail.size.map((sizes) => (
                            <option key={sizes}>{sizes}</option>
                        ))}
                    </select>
                </div>
                <p>Цена: {productDetail.price} ₽</p>

                <Button appearance="small" children={"В корзину"} />

                <ProductAccardion productDetail={productDetail} />
            </div>
        </div>
    );
};

export default ProductDetail;

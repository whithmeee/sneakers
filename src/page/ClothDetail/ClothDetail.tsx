import { useEffect, useState } from "react";
import Button from "../../components/UI/Button/Button";
import styles from "./ClothDetail.module.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ProductAccardion from "../ProductDetail/ProductAccardion";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart.slice";
import Modal from "../../components/UI/Modal/Modal";

interface ClothDetail {
    id: number;
    title: string;
    image: string;
    size: string[];
    price: number;
    color: string;
    country: string;
    compound: string[];
    description: string;
    floor: string;
}

const ClothDetail = () => {
    const [clothDetail, setClothDetail] = useState<ClothDetail | null>(null);

    const [activeSize, setActiveSize] = useState<number | null>(null);

    const size = activeSize !== null ? clothDetail?.size[activeSize] : null;

    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const { id } = useParams();

    const getClothDetail = async () => {
        try {
            const { data } = await axios.get<ClothDetail>(
                `https://b20e349e3a741b9b.mokky.dev/cloth/${id}`
            );
            setClothDetail(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getClothDetail();
    }, [id]);

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: clothDetail?.id,
                title: clothDetail?.title,
                image: clothDetail?.image,
                size: size,
                price: clothDetail?.price,
            })
        );
        setIsOpen(true);
    };

    const handleActiveSize = (index: number) => {
        setActiveSize(index);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    return (
        <>
            {clothDetail && (
                <div className={styles["cloth-detail"]}>
                    <div className={styles["cloth-main-img"]}>
                        <Link to={"/cloth"}>
                            <Button children={"Вернуться назад"} />
                        </Link>
                        <img src={clothDetail.image} alt="" />
                    </div>
                    <div className={styles["cloth-content"]}>
                        <h2>{clothDetail.title}</h2>

                        <div className={styles["cloth-size"]}>
                            Размеры
                            <ul>
                                {clothDetail.size.map((size, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() =>
                                                handleActiveSize(index)
                                            }
                                            className={
                                                styles[
                                                    `${
                                                        activeSize === index
                                                            ? "active"
                                                            : ""
                                                    }`
                                                ]
                                            }
                                        >
                                            {size}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p className={styles["cloth-price"]}>
                            {clothDetail.price} ₽
                        </p>

                        <Button
                            onClick={handleAddToCart}
                            appearance="small"
                            children={"В корзину"}
                        />

                        {clothDetail && (
                            <ProductAccardion
                                id={clothDetail.id}
                                name={clothDetail.title}
                                color={clothDetail.color}
                                country={clothDetail.country}
                                desctiption={clothDetail.description}
                                compound={clothDetail.compound}
                                floor={clothDetail.floor}
                            />
                        )}
                    </div>
                </div>
            )}

            <Modal
                isOpen={isOpen}
                closeModal={closeModal}
                children={`${clothDetail?.title}`}
            />
        </>
    );
};

export default ClothDetail;

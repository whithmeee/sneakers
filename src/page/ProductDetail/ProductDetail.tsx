import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import Button from "../../components/UI/Button/Button";
import styles from "./ProductDetail.module.css";
import ProductAccardion from "./ProductAccardion";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart.slice";
import { AppDispatch } from "../../redux/store";
import Modal from "../../components/UI/Modal/Modal";
import Recommend from "../../components/recommend/Recommend";

export interface ProductDetail {
  id: number;
  title: string;
  desctiption: string;
  images: string[];
  price: number;
  size: number[];
  color: string;
  country: string;
  floor: string;
  compound: string[];
  type: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  );

  const [isOpen, setIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const [activeSize, setActiveSize] = useState<number | null>(null);

  const handleActiveSize = (index: number) => {
    setActiveSize(index);
  };

  const size = activeSize !== null ? productDetail?.size[activeSize] : null;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: productDetail?.id,
        title: productDetail?.title,
        image: productDetail?.images[0],
        size: size,
        price: productDetail?.price,
        type: productDetail?.type,
      })
    );
    setIsOpen(true);
  };

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

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles["product-detail"]}>
        <div className={styles["main-img"]}>
          <Link to={"/"}>
            <Button children={"В каталог"} />
          </Link>
          <img src={productDetail.images[activeImage]} alt="" />
          <div className={styles["product-images"]}>
            {productDetail.images?.map((img, index) => (
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
            Размеры
            <ul>
              {productDetail.size.map((size, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleActiveSize(index)}
                    className={
                      styles[`${activeSize === index ? "active" : ""}`]
                    }
                  >
                    {size}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <p className={styles["product-price"]}>
            Цена: {productDetail.price} ₽
          </p>

          <Button
            onClick={handleAddToCart}
            appearance="small"
            children={"В корзину"}
          />

          <ProductAccardion
            id={productDetail.id}
            name={productDetail.title}
            country={productDetail.country}
            compound={productDetail.compound}
            color={productDetail.color}
            desctiption={productDetail?.desctiption}
            floor={productDetail.floor}
          />
        </div>
      </div>

      <Modal
        children={`${productDetail.title}`}
        isOpen={isOpen}
        closeModal={closeModal}
      />

      <Recommend
        fetchUrl="https://b20e349e3a741b9b.mokky.dev/items"
        currentProductId={productDetail.id}
      />
    </>
  );
};

export default ProductDetail;

import { ProductProps } from "../../interface/product.interface";

import styles from "./Main.module.css";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import { useFetch } from "../../hooks/useFetch";
import { useSearch } from "../../hooks/useSearch";

export interface ApiResponse {
  items: ProductProps[];
}

const Main = () => {
  const { search, handleSearch } = useSearch();

  const { data } = useFetch(
    `https://b20e349e3a741b9b.mokky.dev/items?title=*${search}`
  );

  return (
    <div className={styles["items-content"]}>
      <div className={styles["items-title"]}>
        <h2>Обувь</h2>
        <Input onChange={handleSearch} placeholder="Поиск..." />
      </div>

      <div className={styles["items-sort"]}></div>
      <div className={styles["items"]}>
        <div className={styles["item"]}>
          {data?.length > 0 ? (
            data?.map((product: ProductProps) => (
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

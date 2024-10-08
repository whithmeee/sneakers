import { Link } from "react-router-dom";
import styles from "./Cloth.module.css";

import Loader from "../../components/loader/Loader";
import { useFetch } from "../../hooks/useFetch";
import Input from "../../components/UI/Input/Input";
import { useSearch } from "../../hooks/useSearch";
import BasicPagination from "../../components/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setPageCurrent } from "../../redux/pagination.slice";

export interface Cloth {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  size: string[];
}

const Cloth = () => {
  const { search, handleSearch } = useSearch();
  const dispatch = useDispatch();
  const currentPage = useSelector((s: RootState) => s.paginate.pageCurrent);

  const { data } = useFetch(
    `https://b20e349e3a741b9b.mokky.dev/cloth?title=*${search}&page=${currentPage}&limit=${4}`
  );

  const totalPage = data.meta?.total_pages;

  console.log(data);

  const handleNextPage = (value: number) => {
    dispatch(setPageCurrent(value));
  };
  return (
    <>
      <div className={styles["cloth"]}>
        <div className={styles["cloth-title"]}>
          <h2>Одежда</h2>
          <Input type="text" onChange={handleSearch} placeholder="Поиск..." />
        </div>

        <div className={styles["cloth-items"]}>
          <div className={styles["cloth-item"]}>
            {data.items?.length > 0 ? (
              data.items?.map((cloth: Cloth) => (
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

      <BasicPagination
        currentPage={currentPage}
        onChangePage={handleNextPage}
        totalPage={totalPage}
      />
    </>
  );
};

export default Cloth;

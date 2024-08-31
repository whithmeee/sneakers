import styles from "./Recommend.module.css";

import { Link } from "react-router-dom";
import useProductRecommendations from "../../hooks/useRecommend";

interface IRecommend {
  title: string;
  id: number;
  type: string;
  images: string[];
}

interface RecommendProps {
  currentProductId: number;
  fetchUrl: string;
}

const Recommend = ({ currentProductId, fetchUrl }: RecommendProps) => {
  const { recommendedProducts } = useProductRecommendations(
    fetchUrl,
    currentProductId
  );

  return (
    <div className={styles["recommend"]}>
      <h2>Похожие товары</h2>
      <div className={styles["recommend-product"]}>
        {recommendedProducts.map((item: IRecommend) => (
          <Link key={item.id} to={`/productDetail/${item.id}`}>
            <div className={styles["product"]}>
              <img src={item.images[0]} alt={item.title} />
              <p>{item.title.slice(0, item.title.length - 12)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recommend;

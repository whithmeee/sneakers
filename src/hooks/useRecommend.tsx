import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";

interface IRecommend {
  title: string;
  id: number;
  type: string;
  images: string[];
}

const useProductRecommendations = (url: string, currentProductId: number) => {
  const { data, loading } = useFetch(url);
  const [recommendedProducts, setRecommendedProducts] = useState<IRecommend[]>(
    []
  );

  useEffect(() => {
    if (data && data.length > 0) {
      const filteredProducts = data.filter(
        (item: IRecommend) => item.id !== currentProductId
      );
      const randomProducts = filteredProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      setRecommendedProducts(randomProducts);
    }
  }, [data, currentProductId]);

  return { recommendedProducts, loading };
};

export default useProductRecommendations;

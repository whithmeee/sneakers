import axios from "axios";
import { useEffect, useState } from "react";
import { ProductProps } from "../interface/product.interface";
import { Cloth } from "../page/Cloth/Cloth";

export const useFetch = (
  url: string,
  userID?: number,
  currentPage?: number
) => {
  const [data, setData] = useState<ProductProps[] | Cloth[] | any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios(url);
      setData(response.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFetch();
  }, [url, userID, currentPage]);

  return { data, loading, error };
};

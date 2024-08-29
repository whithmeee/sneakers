import styles from "./Purchases.module.css";
import { CartProduct } from "../Cart/Cart";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Nopurchases from "./Nopurchases";
import Loader from "../../components/loader/Loader";
import { useFetch } from "../../hooks/useFetch";

const Purchases = () => {
  const userID = useSelector((s: RootState) => s.user.profile?.id);
  const { data, loading } = useFetch(
    `https://b20e349e3a741b9b.mokky.dev/orders?userID=${userID}`
  );

  if (loading) {
    return <Loader />;
  }

  const orders = data || [];
  const allItems = orders.flatMap((order: any) => order.items);

  return (
    <div className={styles["purchases"]}>
      <h2>Мои покупки</h2>

      {allItems.length > 0 ? (
        <div className={styles["purchases-items"]}>
          <div className={styles["purchases-item"]}>
            {allItems.map((cart: CartProduct) => (
              <div className={styles["purchases-item-content"]} key={cart.id}>
                <div className={styles["purchases-img"]}>
                  <img src={cart.image} alt="" />
                </div>
                <div>
                  <div className={styles["purchases-content"]}>
                    <h5>{cart.title}</h5>
                    <p className={styles["purchases-count"]}>
                      Кол-во: {cart.count}
                    </p>
                    <p className={styles["purchases-count"]}>
                      Размер: {cart.size}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Nopurchases />
      )}
    </div>
  );
};
export default Purchases;

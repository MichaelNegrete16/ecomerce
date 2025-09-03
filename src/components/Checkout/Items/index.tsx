import React from "react";
import styles from "./Items.module.css";
import useAppSelector from "@/redux/useAppSelector";
import { selectCartItems } from "@/redux/slices/cart/cart.selector";

const IndexContainer = () => {
  const items = useAppSelector(selectCartItems);
  return (
    <div className={styles.items}>
      {items.map((item) => {
        return (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemImage}>
              {item.product.image ? (
                <img src={item.product.image} alt={item.product.title} />
              ) : (
                <div className={styles.imagePlaceholder}>Sin imagen</div>
              )}
            </div>

            <div className={styles.itemDetails}>
              <h4>{item.product.title}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IndexContainer;

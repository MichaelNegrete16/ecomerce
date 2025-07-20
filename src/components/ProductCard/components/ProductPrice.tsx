import React from "react";
import styles from "../ProductCard.module.css";
import { formatPrice } from "@/utils/FromatPrice";

interface ProductPriceProps {
  price: string;
  originalPrice?: string;
  discount?: string;
  currency?: string;
}

const ProductPrice: React.FC<ProductPriceProps> = ({
  price,
  originalPrice,
  discount,
  currency = "$",
}) => {
  return (
    <div className={styles["product-price-container"]}>
      <div className={styles["product-price"]}>
        <span className={styles["product-price-current"]}>
          {formatPrice(parseFloat(price))}
        </span>
        {originalPrice && originalPrice > price && (
          <span className={styles["product-price-original"]}>
            {formatPrice(parseFloat(originalPrice))}
          </span>
        )}
      </div>
      {discount && (
        <span className={styles["product-discount"]}>-{discount}%</span>
      )}
    </div>
  );
};

export default ProductPrice;

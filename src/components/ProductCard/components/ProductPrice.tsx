import React from "react";
import styles from "../ProductCard.module.css";

interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  discount?: number;
  currency?: string;
}

const ProductPrice: React.FC<ProductPriceProps> = ({
  price,
  originalPrice,
  discount,
  currency = "$",
}) => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className={styles["product-price-container"]}>
      <div className={styles["product-price"]}>
        <span className={styles["product-price-current"]}>
          {formatPrice(price)}
        </span>
        {originalPrice && originalPrice > price && (
          <span className={styles["product-price-original"]}>
            {formatPrice(originalPrice)}
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

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
  const iva = (parseFloat(price) * 19) / 100;
  const ITMS = (parseFloat(price) * 10) / 100;
  const totalProducto = parseFloat(price) + iva + ITMS;

  return (
    <div className={styles["product-price-container"]}>
      <div className={styles["product-price"]}>
        <span className={styles["product-price-current"]}>
          {formatPrice(totalProducto)}
        </span>
      </div>

      {discount && (
        <span className={styles["product-discount"]}>-{discount}%</span>
      )}
    </div>
  );
};

export default ProductPrice;

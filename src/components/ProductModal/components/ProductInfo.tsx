import React from "react";
import styles from "../ProductModal.module.css";
import StarIcon from "@/components/ProductCard/components/icons/StarIcon";
import { formatPrice } from "@/utils/FromatPrice";

interface ProductInfoProps {
  product: {
    badge?: string;
    discount?: string;
    category: string;
    title: string;
    rating: { rate: number; count: number };
    price: string;
    originalPrice?: string;
    inStock: boolean;
    description: string;
    stock: number;
  };
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const iva = (parseFloat(product.price) * 19) / 100;
  const ITMS = (parseFloat(product.price) * 10) / 100;
  const totalProducto = parseFloat(product.price) + iva + ITMS;
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon key={`star-${rating}-${index}`} filled={index < fullStars} />
    ));
  };

  const renderBadge = (badge: string, discount?: string) => {
    const badgeClass = styles["product-badge-modal"];
    const badgeTypeClass = styles[`badge-${badge}`];
    const text =
      badge === "sale" && discount ? `${discount}% OFF` : badge.toUpperCase();

    return <span className={`${badgeClass} ${badgeTypeClass}`}>{text}</span>;
  };

  console.log(totalProducto, "product.originalPrice", iva, "iva");

  return (
    <div className={styles["product-info"]}>
      {/* Badges */}
      {product.badge && (
        <div className={styles["product-badges"]}>
          {renderBadge(product.badge, product.discount)}
        </div>
      )}

      <div className={styles["product-category-modal"]}>{product.category}</div>

      <h1 className={styles["product-title-modal"]}>{product.title}</h1>

      {/* Rating */}
      <div className={styles["product-rating-modal"]}>
        <div className={styles["rating-stars-modal"]}>
          {renderStars(product.rating.rate)}
        </div>
        <span className={styles["rating-text-modal"]}>
          {product.rating.rate.toFixed(1)} ({product.rating.count} reseñas)
        </span>
      </div>

      {/* Iva */}
      <div style={{ fontSize: "14px", color: "#666" }}>
        Iva: {formatPrice(iva)}
      </div>
      <div style={{ fontSize: "14px", color: "#666" }}>
        ITMS: {formatPrice(ITMS)}
      </div>

      {/* Price */}
      <div className={styles["product-price-modal"]}>
        <span className={styles["current-price-modal"]}>
          {formatPrice(totalProducto)}
        </span>
        {product.discount && (
          <span className={styles["discount-badge-modal"]}>
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Stock Info */}
      <div
        className={`${styles["stock-info"]} ${
          product.inStock ? styles["stock-available"] : styles["stock-out"]
        }`}
      >
        {product.inStock ? "✓ En stock" : "✗ Agotado"}
      </div>
      {/*Stock*/}
      <p className={styles["product-description-modal"]}>
        Cantidad: {product.stock}
      </p>

      {/* Description */}
      <p className={styles["product-description-modal"]}>
        {product.description}
      </p>
    </div>
  );
};

export default ProductInfo;

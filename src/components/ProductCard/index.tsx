import React from "react";
import styles from "./ProductCard.module.css";
import ProductImage from "./components/ProductImage";
import ProductRating from "./components/ProductRating";
import ProductPrice from "./components/ProductPrice";
import ProductActions from "./components/ProductActions";
import { ProductCardProps } from "./types";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  onToggleFavorite,
  isFavorite = false,
  showActions = true,
  className = "",
}) => {
  return (
    <div className={`${styles["product-card"]} ${className}`}>
      <ProductImage
        src={product.image}
        alt={product.title}
        badge={product.badge}
        discount={product.discount}
      />

      <div className={styles["product-content"]}>
        <div className={styles["product-category"]}>{product.category}</div>

        <h3 className={styles["product-title"]}>{product.title}</h3>

        <p className={styles["product-description"]}>{product.description}</p>

        <ProductRating rating={product.rating} />

        <ProductPrice
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
        />

        <ProductActions
          product={product}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
          showActions={showActions}
        />
      </div>
    </div>
  );
};

export default ProductCard;

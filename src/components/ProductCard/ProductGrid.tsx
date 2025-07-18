import React from "react";
import styles from "./ProductCard.module.css";
import ProductCard from "./index";
import { ProductGridProps } from "./types";

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title = "Productos",
  subtitle = "Descubre nuestra selección de productos",
  onAddToCart,
  onViewDetails,
  onToggleFavorite,
  favoriteProducts = [],
  loading = false,
  emptyMessage = "No hay productos disponibles",
}) => {
  if (loading) {
    return (
      <div className={styles["products-container"]}>
        <div className={styles["products-header"]}>
          <h2 className={styles["products-title"]}>{title}</h2>
          <p className={styles["products-subtitle"]}>{subtitle}</p>
        </div>
        <div className={styles["products-grid"]}>
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={`skeleton-${index}-loading`}
              className={styles["product-card"]}
            >
              <div className={styles["product-image-container"]}>
                <div className={styles["product-image-placeholder"]}>
                  <span>Cargando...</span>
                </div>
              </div>
              <div className={styles["product-content"]}>
                <div className={styles["product-category"]}>Cargando...</div>
                <h3 className={styles["product-title"]}>
                  Cargando producto...
                </h3>
                <p className={styles["product-description"]}>
                  Descripción del producto...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles["products-container"]}>
        <div className={styles["products-header"]}>
          <h2 className={styles["products-title"]}>{title}</h2>
          <p className={styles["products-subtitle"]}>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["products-container"]}>
      <div className={styles["products-header"]}>
        <h2 className={styles["products-title"]}>{title}</h2>
        <p className={styles["products-subtitle"]}>{subtitle}</p>
      </div>

      <div className={styles["products-grid"]}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onViewDetails={onViewDetails}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favoriteProducts.includes(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

import React from "react";
import styles from "../ProductCard.module.css";
import CartPlusIcon from "./icons/CartPlusIcon";
import EyeIcon from "./icons/EyeIcon";
import { Product } from "../types";

interface ProductActionsProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  showActions?: boolean;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  showActions = true,
}) => {
  if (!showActions) return null;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  return (
    <div className={styles["product-actions"]}>
      <button
        onClick={handleAddToCart}
        className={`${styles["product-button"]} ${styles["product-button-primary"]}`}
        disabled={!product.inStock}
      >
        <CartPlusIcon />
        {product.inStock ? "Agregar" : "Agotado"}
      </button>
      <button
        onClick={handleViewDetails}
        className={`${styles["product-button"]} ${styles["product-button-secondary"]}`}
      >
        <EyeIcon />
        Ver
      </button>
    </div>
  );
};

export default ProductActions;

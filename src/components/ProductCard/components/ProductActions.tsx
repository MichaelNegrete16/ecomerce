import React from "react";
import styles from "../ProductCard.module.css";
import CartPlusIcon from "./icons/CartPlusIcon";
import EyeIcon from "./icons/EyeIcon";
import { IGetDataArticle } from "@/redux/slices/articles/article.api";
import useAppSelector from "@/redux/useAppSelector";
import { selectCartItems } from "@/redux/slices/cart/cart.selector";

interface ProductActionsProps {
  product: IGetDataArticle;
  onAddToCart?: (product: IGetDataArticle) => void;
  onViewDetails?: (product: IGetDataArticle) => void;
  showActions?: boolean;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  showActions = true,
}) => {
  const cartItems = useAppSelector(selectCartItems);

  if (!showActions) return null;

  const existingCartItem = cartItems.find(
    (item) => item.product.id === product.id
  );
  const currentQuantityInCart = existingCartItem
    ? existingCartItem.quantity
    : 0;

  const canAddMore = currentQuantityInCart < product.stock;
  const isOutOfStock = !product.inStock || product.stock === 0;

  const handleAddToCart = () => {
    if (onAddToCart && canAddMore && !isOutOfStock) {
      onAddToCart(product);
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  let buttonText = "Agregar";
  if (isOutOfStock) {
    buttonText = "Agotado";
  } else if (!canAddMore) {
    buttonText = `Máximo (${product.stock})`;
  }

  return (
    <div className={styles["product-actions"]}>
      <button
        onClick={handleAddToCart}
        className={`${styles["product-button"]} ${styles["product-button-primary"]}`}
        disabled={isOutOfStock || !canAddMore}
      >
        <CartPlusIcon />
        {buttonText}
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

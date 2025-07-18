import React from "react";
import styles from "../ProductModal.module.css";
import HeartIcon from "../components/icons/HeartIcon";
import ShareIcon from "../components/icons/ShareIcon";
import MinusIcon from "../components/icons/MinusIcon";
import PlusIcon from "../components/icons/PlusIcon";

interface ProductActionsProps {
  product: {
    id: string;
    title: string;
    inStock: boolean;
  };
  quantity: number;
  isFavorite: boolean;
  onQuantityChange: (newQuantity: number) => void;
  onAddToCart: () => void;
  onToggleFavorite?: (product: any) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  quantity,
  isFavorite,
  onQuantityChange,
  onAddToCart,
  onToggleFavorite,
}) => {
  return (
    <div className={styles["product-actions-section"]}>
      {/* Quantity Selector */}
      {product.inStock && (
        <div className={styles["quantity-section"]}>
          <label className={styles["quantity-label"]} htmlFor="quantity-input">
            Cantidad:
          </label>
          <div className={styles["quantity-selector"]}>
            <button
              className={styles["quantity-button"]}
              onClick={() => onQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              type="button"
              aria-label="Disminuir cantidad"
            >
              <MinusIcon />
            </button>
            <input
              id="quantity-input"
              type="number"
              className={styles["quantity-input"]}
              value={quantity}
              onChange={(e) =>
                onQuantityChange(parseInt(e.target.value, 10) || 1)
              }
              min="1"
              max="10"
              aria-label="Cantidad del producto"
            />
            <button
              className={styles["quantity-button"]}
              onClick={() => onQuantityChange(quantity + 1)}
              disabled={quantity >= 10}
              type="button"
              aria-label="Aumentar cantidad"
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className={styles["modal-actions"]}>
        <button
          className={styles["add-to-cart-modal"]}
          onClick={onAddToCart}
          disabled={!product.inStock}
          type="button"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 13M7 13l2.5 13m0 0h10m-10 0L19 26"
            />
          </svg>
          {product.inStock
            ? `Agregar al carrito (${quantity})`
            : "Producto agotado"}
        </button>

        <div className={styles["secondary-actions"]}>
          <button
            className={styles["favorite-button"]}
            onClick={() => onToggleFavorite?.(product)}
            type="button"
          >
            <HeartIcon filled={isFavorite} />
            {isFavorite ? "Favorito" : "Favoritos"}
          </button>
          <button className={styles["share-button"]} type="button">
            <ShareIcon />
            Compartir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductActions;

"use client";

import React, { useState, useEffect } from "react";
import styles from "./ProductModal.module.css";
import { ProductModalProps } from "./types";
import CloseIcon from "./components/icons/CloseIcon";
import ProductImageGallery from "./components/ProductImageGallery";
import ProductInfo from "./components/ProductInfo";
import ProductActions from "./components/ProductActions";

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const handleEscapeKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscapeKey);

      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
      };
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setQuantity(1);
    setSelectedImage(0);
  }, [product]);

  if (!isOpen || !product) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart && product.inStock) {
      onAddToCart(product, quantity);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
  };

  return (
    /* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
    <div className={styles["modal-overlay"]} onClick={handleOverlayClick}>
      <div className={styles["modal-content"]}>
        <button
          className={styles["modal-close"]}
          onClick={onClose}
          aria-label="Cerrar modal"
          type="button"
        >
          <CloseIcon />
        </button>

        <div className={styles["product-detail"]}>
          <ProductImageGallery
            product={product}
            selectedImage={selectedImage}
            onImageSelect={handleImageSelect}
          />

          <div>
            <ProductInfo product={product} />

            <ProductActions
              product={product}
              quantity={quantity}
              isFavorite={isFavorite}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

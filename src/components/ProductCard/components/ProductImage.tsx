import React from "react";
import styles from "../ProductCard.module.css";
import ImagePlaceholderIcon from "./icons/ImagePlaceholderIcon";

interface ProductImageProps {
  src?: string;
  alt: string;
  badge?: string;
  discount?: string;
}

const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  badge,
  discount,
}) => {
  return (
    <div className={styles["product-image-container"]}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={styles["product-image"]}
          onError={(e) => {
            // Hide image on error and show placeholder
            e.currentTarget.style.display = "none";
            const placeholder = e.currentTarget
              .nextElementSibling as HTMLElement;
            if (placeholder) {
              placeholder.style.display = "flex";
            }
          }}
        />
      ) : (
        <div className={styles["product-image-placeholder"]}>
          <ImagePlaceholderIcon />
          <span>Sin imagen</span>
        </div>
      )}

      {/* Hidden placeholder for error fallback */}
      <div
        className={styles["product-image-placeholder"]}
        style={{ display: src ? "none" : "flex" }}
      >
        <ImagePlaceholderIcon />
        <span>Sin imagen</span>
      </div>

      {/* Badge */}
      {badge && (
        <div className={`${styles["product-badge"]} ${styles[badge]}`}>
          {badge === "sale" && discount
            ? `${discount}% OFF`
            : badge.toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default ProductImage;

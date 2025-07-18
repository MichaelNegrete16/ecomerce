import React from "react";
import styles from "../ProductModal.module.css";
import ImagePlaceholderIcon from "@/components/ProductCard/components/icons/ImagePlaceholderIcon";

interface ProductImageGalleryProps {
  product: {
    image?: string;
    images?: string[];
    title: string;
  };
  selectedImage: number;
  onImageSelect: (index: number) => void;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  product,
  selectedImage,
  onImageSelect,
}) => {
  const currentImage = product.images?.[selectedImage] ?? product.image;

  return (
    <div className={styles["product-images"]}>
      <div className={styles["main-image"]}>
        {currentImage ? (
          <img
            src={currentImage}
            alt={product.title}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const placeholder = e.currentTarget
                .nextElementSibling as HTMLElement;
              if (placeholder) {
                placeholder.style.display = "flex";
              }
            }}
          />
        ) : (
          <div className={styles["image-placeholder-large"]}>
            <ImagePlaceholderIcon />
            <span>Sin imagen disponible</span>
          </div>
        )}

        {/* Hidden placeholder for error fallback */}
        <div
          className={styles["image-placeholder-large"]}
          style={{ display: currentImage ? "none" : "flex" }}
        >
          <ImagePlaceholderIcon />
          <span>Sin imagen disponible</span>
        </div>
      </div>

      {/* Thumbnails (if multiple images) */}
      {product.images && product.images.length > 1 && (
        <div className={styles["image-thumbnails"]}>
          {product.images.map((image, index) => (
            <button
              key={`thumb-${index + 1}`}
              className={`${styles.thumbnail} ${
                selectedImage === index ? styles.active : ""
              }`}
              onClick={() => onImageSelect(index)}
              type="button"
            >
              <img src={image} alt={`${product.title} ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;

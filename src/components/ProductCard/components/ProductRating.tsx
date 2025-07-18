import React from "react";
import styles from "../ProductCard.module.css";
import StarIcon from "./icons/StarIcon";

interface ProductRatingProps {
  rating: {
    rate: number;
    count: number;
  };
}

const ProductRating: React.FC<ProductRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating.rate);
  const hasHalfStar = rating.rate % 1 !== 0;

  return (
    <div className={styles["product-rating"]}>
      <div className={styles["product-stars"]}>
        {Array.from({ length: 5 }, (_, index) => (
          <StarIcon
            key={`star-${rating.rate}-${index}`}
            filled={index < fullStars || (index === fullStars && hasHalfStar)}
          />
        ))}
      </div>
      <span className={styles["product-rating-text"]}>
        {rating.rate.toFixed(1)} ({rating.count} reseñas)
      </span>
    </div>
  );
};

export default ProductRating;

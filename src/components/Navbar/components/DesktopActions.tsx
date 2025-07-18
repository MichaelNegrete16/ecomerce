import React from "react";
import styles from "../Navbar.module.css";
import CartIcon from "./icons/CartIcon";

interface DesktopActionsProps {
  cartCount?: number;
  onCartClick?: () => void;
}

const DesktopActions: React.FC<DesktopActionsProps> = ({
  cartCount = 0,
  onCartClick,
}) => {
  return (
    <div className={styles["desktop-actions"]}>
      <button className={styles["icon-button"]} onClick={onCartClick}>
        <CartIcon />
        <span className={styles["cart-badge"]}>{cartCount}</span>
      </button>
    </div>
  );
};

export default DesktopActions;

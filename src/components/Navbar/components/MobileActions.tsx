import React from "react";
import styles from "../Navbar.module.css";
import CartIcon from "./icons/CartIcon";
import HamburgerIcon from "./icons/HamburgerIcon";
import CloseIcon from "./icons/CloseIcon";

interface MobileActionsProps {
  cartCount?: number;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onCartClick?: () => void;
}

const MobileActions: React.FC<MobileActionsProps> = ({
  cartCount = 0,
  isSidebarOpen,
  onToggleSidebar,
  onCartClick,
}) => {
  return (
    <div className={styles["mobile-actions"]}>
      {/* Carrito en móvil */}
      <button className={styles["icon-button"]} onClick={onCartClick}>
        <CartIcon />
        <span className={styles["cart-badge"]}>{cartCount}</span>
      </button>

      {/* Botón hamburguesa */}
      <button onClick={onToggleSidebar} className={styles["hamburger-button"]}>
        <span className={styles["sr-only"]}>Abrir menú principal</span>
        {!isSidebarOpen ? <HamburgerIcon /> : <CloseIcon />}
      </button>
    </div>
  );
};

export default MobileActions;

import React from "react";
import styles from "../Navbar.module.css";
import Logo from "./Logo";
import DesktopActions from "./DesktopActions";
import MobileActions from "./MobileActions";

interface NavbarContentProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  cartCount?: number;
  onCartClick?: () => void;
}

const NavbarContent: React.FC<NavbarContentProps> = ({
  isSidebarOpen,
  onToggleSidebar,
  cartCount,
  onCartClick,
}) => {
  return (
    <div className={styles["navbar-container"]}>
      <div className={styles["navbar-content"]}>
        <Logo />

        <DesktopActions cartCount={cartCount} onCartClick={onCartClick} />

        <MobileActions
          cartCount={cartCount}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={onToggleSidebar}
          onCartClick={onCartClick}
        />
      </div>
    </div>
  );
};

export default NavbarContent;

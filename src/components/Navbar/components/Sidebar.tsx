import React from "react";
import Link from "next/link";
import styles from "../Navbar.module.css";
import CloseIcon from "./icons/CloseIcon";
import SearchIcon from "./icons/SearchIcon";

interface MenuItem {
  name: string;
  href: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onSearchClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  menuItems,
  onSearchClick,
}) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles["sidebar-content"]}>
        {/* Header del sidebar */}
        <div className={styles["sidebar-header"]}>
          <h2 className={styles["sidebar-title"]}>Menú</h2>
          <button onClick={onClose} className={styles["sidebar-close"]}>
            <CloseIcon />
          </button>
        </div>

        {/* Menu items del sidebar */}
        <div className={styles["sidebar-menu"]}>
          <nav className={styles["sidebar-nav"]}>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={styles["sidebar-menu-item"]}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer del sidebar */}
        <div className={styles["sidebar-footer"]}>
          <button
            className={styles["sidebar-search-button"]}
            onClick={onSearchClick}
          >
            <SearchIcon />
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

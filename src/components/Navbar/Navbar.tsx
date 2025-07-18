"use client";

import React, { useState } from "react";
import styles from "./Navbar.module.css";
import NavbarContent from "./components/NavbarContent";
import SidebarOverlay from "./components/SidebarOverlay";
import Sidebar from "./components/Sidebar";
import { MenuItem, NavbarProps } from "./types";

const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { name: "Inicio", href: "/" },
  { name: "Productos", href: "/productos" },
];

const NavbarComponent: React.FC<NavbarProps> = ({
  menuItems = DEFAULT_MENU_ITEMS,
  cartCount = 0,
  onSearchClick,
  onCartClick,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    } else {
      console.log("Search clicked");
    }
  };

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    } else {
      console.log("Cart clicked");
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <NavbarContent
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
          cartCount={cartCount}
          onCartClick={handleCartClick}
        />
      </nav>

      <SidebarOverlay isOpen={isSidebarOpen} onClose={toggleSidebar} />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        menuItems={menuItems}
        onSearchClick={handleSearchClick}
      />
    </>
  );
};

export default NavbarComponent;

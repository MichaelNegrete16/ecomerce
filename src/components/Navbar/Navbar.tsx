"use client";

import React from "react";
import styles from "./Navbar.module.css";
import NavbarContent from "./components/NavbarContent";
import CartSidebar from "./components/CartSidebar";

const NavbarComponent: React.FC = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <NavbarContent />
      </nav>

      <CartSidebar />
    </>
  );
};

export default NavbarComponent;

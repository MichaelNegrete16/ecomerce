import React from "react";
import styles from "../Navbar.module.css";
import Logo from "./Logo";
import DesktopActions from "./DesktopActions";

const NavbarContent: React.FC = () => {
  return (
    <div className={styles["navbar-container"]}>
      <div className={styles["navbar-content"]}>
        <Logo />
        <DesktopActions />
      </div>
    </div>
  );
};

export default NavbarContent;

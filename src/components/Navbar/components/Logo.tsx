"use client";

import React from "react";
import Link from "next/link";
import styles from "../Navbar.module.css";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={className}>
      <Link href="/" className={styles["navbar-logo"]}>
        ECommerce
      </Link>
    </div>
  );
};

export default Logo;

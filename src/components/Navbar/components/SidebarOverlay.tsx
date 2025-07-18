import React from "react";
import styles from "../Navbar.module.css";

interface SidebarOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarOverlay: React.FC<SidebarOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <button
      className={styles["sidebar-overlay"]}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClose();
        }
      }}
      aria-label="Cerrar menú"
    />
  );
};

export default SidebarOverlay;

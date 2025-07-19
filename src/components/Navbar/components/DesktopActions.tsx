import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { toggleCart } from "../../../redux/slices/cartSlice";
import styles from "../Navbar.module.css";
import CartIcon from "./icons/CartIcon";

const DesktopActions: React.FC = () => {
  const dispatch = useDispatch();
  const { itemCount } = useSelector((state: RootState) => state.cart);

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  return (
    <div className={styles["desktop-actions"]}>
      <button className={styles["icon-button"]} onClick={handleCartClick}>
        <CartIcon />
        {itemCount > 0 && (
          <span className={styles["cart-badge"]}>{itemCount}</span>
        )}
      </button>
    </div>
  );
};

export default DesktopActions;

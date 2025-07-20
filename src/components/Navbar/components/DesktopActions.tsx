import React from "react";
import { toggleCart } from "../../../redux/slices/cart/cartSlice";
import styles from "../Navbar.module.css";
import CartIcon from "./icons/CartIcon";
import useAppDispatch from "@/redux/useAppDisppatch";
import useAppSelector from "@/redux/useAppSelector";
import { selectCartItemCount } from "@/redux/slices/cart/cart.selector";

const DesktopActions: React.FC = () => {
  const dispatch = useAppDispatch();
  const itemsCount = useAppSelector(selectCartItemCount);

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  return (
    <div className={styles["desktop-actions"]}>
      <button className={styles["icon-button"]} onClick={handleCartClick}>
        <CartIcon />
        {itemsCount > 0 && (
          <span className={styles["cart-badge"]}>{itemsCount}</span>
        )}
      </button>
    </div>
  );
};

export default DesktopActions;

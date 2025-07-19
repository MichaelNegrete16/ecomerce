import React from "react";
import {
  closeCart,
  removeFromCart,
  updateQuantity,
} from "../../../redux/slices/cartSlice";
import styles from "../Navbar.module.css";
import CloseIcon from "../components/icons/CloseIcon";
import MinusIcon from "../../ProductModal/components/icons/MinusIcon";
import PlusIcon from "../../ProductModal/components/icons/PlusIcon";
import Link from "next/link";
import useAppDispatch from "@/redux/useAppDisppatch";
import useAppSelector from "@/redux/useAppSelector";
import {
  selectCartItemCount,
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen,
} from "@/redux/slices/cart.selector";
import { formatPrice } from "@/utils/FromatPrice";

const CartSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const itemCount = useAppSelector(selectCartItemCount);
  const isOpen = useAppSelector(selectIsCartOpen);

  const handleClose = () => {
    dispatch(closeCart());
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className={styles["sidebar-overlay"]}
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className={`${styles.sidebar} ${styles.open}`}>
        <div className={styles["sidebar-header"]}>
          <h2 className={styles["sidebar-title"]}>
            Carrito de Compras {itemCount > 0 && `(${itemCount})`}
          </h2>
          <button
            className={styles["sidebar-close"]}
            onClick={handleClose}
            aria-label="Cerrar carrito"
            type="button"
          >
            <CloseIcon />
          </button>
        </div>

        <div className={styles["sidebar-content"]}>
          {items.length === 0 ? (
            <div className={styles["empty-cart"]}>
              <div className={styles["empty-cart-icon"]}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 13M7 13l2.5 13m0 0h10m-10 0L19 26"
                  />
                </svg>
              </div>
              <h3>Tu carrito está vacío</h3>
              <p>Agrega algunos productos para comenzar</p>
            </div>
          ) : (
            <>
              <div className={styles["cart-items"]}>
                {items.map((item) => (
                  <div key={item.id} className={styles["cart-item"]}>
                    <div className={styles["cart-item-image"]}>
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const placeholder = e.currentTarget
                              .nextElementSibling as HTMLElement;
                            if (placeholder) {
                              placeholder.style.display = "flex";
                            }
                          }}
                        />
                      ) : (
                        <div className={styles["cart-item-placeholder"]}>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}

                      <div
                        className={styles["cart-item-placeholder"]}
                        style={{
                          display: item.product.image ? "none" : "flex",
                        }}
                      >
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className={styles["cart-item-details"]}>
                      <h4 className={styles["cart-item-title"]}>
                        {item.product.title}
                      </h4>
                      <p className={styles["cart-item-price"]}>
                        {formatPrice(item.product.price)}
                      </p>

                      <div className={styles["cart-item-controls"]}>
                        <div className={styles["quantity-controls"]}>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            type="button"
                            aria-label="Disminuir cantidad"
                          >
                            <MinusIcon />
                          </button>
                          <span className={styles["quantity-display"]}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= 10}
                            type="button"
                            aria-label="Aumentar cantidad"
                          >
                            <PlusIcon />
                          </button>
                        </div>

                        <button
                          className={styles["remove-item"]}
                          onClick={() => handleRemoveItem(item.id)}
                          type="button"
                          aria-label="Eliminar producto"
                        >
                          <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles["cart-footer"]}>
                <div className={styles["cart-total"]}>
                  <div className={styles["total-line"]}>
                    <span>Subtotal:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className={styles["total-line-main"]}>
                    <span>Total:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                <Link href={"/checkout"}>
                  <button
                    className={styles["checkout-button"]}
                    type="button"
                    onClick={handleClose}
                  >
                    Proceder al Pago
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;

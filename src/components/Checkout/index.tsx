"use client";

import {
  selectCartItemCount,
  selectCartItems,
  selectCartTotal,
} from "@/redux/slices/cart/cart.selector";
import useAppSelector from "@/redux/useAppSelector";
import React, { useState } from "react";
import styles from "./checkout.module.css";
import Link from "next/link";
import IndexContainer from "./Items";
import { formatPrice } from "@/utils/FromatPrice";
import PaymentForm from "./Form/PaymenMethod/PaymentForm";
import UserInfo from "./Form/UserInfo";

const CheckoutModule = () => {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const itemCount = useAppSelector(selectCartItemCount);

  const [currentStep, setCurrentStep] = useState<"shipping" | "payment">(
    "shipping"
  );

  const handleContinueToPayment = () => {
    setCurrentStep("payment");
  };

  const handleBackToShipping = () => {
    setCurrentStep("shipping");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.backToCatalog}>
          <Link href="/" className={styles.backLink}>
            ← Volver al catálogo
          </Link>
        </div>

        <h1 className={styles.title}>Finalizar Compra</h1>
        <p>Revisa tu pedido y completa la información de envío</p>
      </div>

      <div className={styles.checkoutContent}>
        <div className={styles.orderSummary}>
          <h2>Resumen del Pedido</h2>

          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>No tienes productos en tu carrito</p>
            </div>
          ) : (
            <>
              <IndexContainer />

              <div className={styles.totals}>
                <div className={styles.totalLine}>
                  <span>Subtotal ({itemCount} productos):</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className={styles.totalLine}>
                  <span>Envío:</span>
                  <span>Gratis</span>
                </div>
                <div className={styles.totalLineMain}>
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {currentStep === "shipping" ? (
          <UserInfo onContinue={handleContinueToPayment} />
        ) : (
          <PaymentForm onBack={handleBackToShipping} />
        )}
      </div>
    </div>
  );
};

export default CheckoutModule;

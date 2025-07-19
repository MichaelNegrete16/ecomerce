import React from "react";
import styles from "./Form.module.css";
import { formatPrice } from "@/utils/FromatPrice";
import useAppSelector from "@/redux/useAppSelector";
import { selectCartItems, selectCartTotal } from "@/redux/slices/cart.selector";

const FormSubmit = () => {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  return (
    <div className={styles.checkoutForm}>
      <h2>Información de Envío</h2>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="tu@email.com"
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">Nombre</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Juan"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Apellido</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Pérez"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Calle Principal 123"
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="city">Ciudad</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Madrid"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="postalCode">Código Postal</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              placeholder="28001"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+34 123 456 789"
            required
          />
        </div>

        <div className={styles.formActions}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={items.length === 0}
          >
            Confirmar Pedido ({formatPrice(total)})
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSubmit;

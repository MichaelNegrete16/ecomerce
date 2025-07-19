import React, { useState } from "react";
import styles from "../Form.module.css";
import useAppSelector from "@/redux/useAppSelector";
import { selectCartItems } from "@/redux/slices/cart.selector";
import { initialDataUserInfo } from "./UserInfo.constant";
import useAppDispatch from "@/redux/useAppDisppatch";
import { setUserInfo } from "@/redux/slices/cartSlice";

interface UserInfoFormProps {
  onContinue: () => void;
}

const UserInfo = ({ onContinue }: UserInfoFormProps) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const [form, setForm] = useState(initialDataUserInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setUserInfo(form));
    onContinue();
  };
  return (
    <div className={styles.userInfoForm}>
      <h2>Información de Envío</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="tu@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">Nombre</label>
            <input
              type="text"
              id="firstName"
              name="firstname"
              placeholder="Juan"
              value={form.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Apellido</label>
            <input
              type="text"
              id="lastName"
              name="lastname"
              placeholder="Pérez"
              value={form.lastname}
              onChange={handleChange}
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
            value={form.address}
            onChange={handleChange}
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
              placeholder="Bogotá"
              value={form.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="postalCode">Código Postal</label>
            <input
              type="text"
              id="postalcode"
              name="postalcode"
              value={form.postalcode}
              onChange={handleChange}
              placeholder="11001"
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
            value={form.phone}
            onChange={handleChange}
            placeholder="+57 300 123 4567"
            required
          />
        </div>

        <div className={styles.formActions}>
          <button
            type="submit"
            className={styles.continueButton}
            disabled={items.length === 0}
          >
            Continuar al Pago
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;

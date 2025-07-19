import React, { useState } from "react";
import styles from "../Form.module.css";
import { formatPrice } from "@/utils/FromatPrice";
import useAppSelector from "@/redux/useAppSelector";
import {
  selectCartItems,
  selectCartTotal,
  selectPrivacyAccepted,
  selectTermsAccepted,
  selectUserInfo,
} from "@/redux/slices/cart.selector";
import {
  detectCardType,
  formatCardNumber,
  getCardIcon,
} from "@/utils/DetecTypeCard";
import { initialDataPayment } from "./PaymentMethod.constant";
import TermsAndCondition from "../TermsAndCondition";

interface PaymentFormProps {
  onBack: () => void;
}

export type CardType = "visa" | "mastercard" | "amex" | "unknown";

const PaymentForm = ({ onBack }: PaymentFormProps) => {
  const [form, setForm] = useState(initialDataPayment);
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const acceptTerms = useAppSelector(selectTermsAccepted);
  const acceptPrivacy = useAppSelector(selectPrivacyAccepted);
  const userInfo = useAppSelector(selectUserInfo);
  const [cardType, setCardType] = useState<CardType>("unknown");

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");

    if (value.length <= 16) {
      const formattedValue = formatCardNumber(value);
      const detectedType = detectCardType(value);
      setForm((prev) => ({ ...prev, cardNumber: formattedValue }));
      setCardType(detectedType);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptTerms || !acceptPrivacy) {
      alert(
        "Debes aceptar los términos y condiciones y la política de privacidad para continuar."
      );
      return;
    }

    alert("¡Pago procesado exitosamente!");
  };

  return (
    <div className={styles.paymentForm}>
      <h2>Información de Pago</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="cardNumber">Número de Tarjeta</label>
          <div className={styles.cardInputContainer}>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
            />
            <div className={styles.cardIcon}>{getCardIcon(cardType)()}</div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cardName">Nombre en la Tarjeta</label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={form.cardName}
            onChange={handleChange}
            placeholder="Juan Pérez"
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="expiryDate">Fecha de Vencimiento</label>
            <input
              type="text"
              id="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              name="expiryDate"
              placeholder="MM/AA"
              maxLength={5}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              placeholder="123"
              maxLength={4}
              required
            />
          </div>
        </div>

        <div className={styles.securityInfo}>
          <p className={styles.securityText}>
            🔒 Tu información está protegida con encriptación SSL
          </p>
        </div>

        <TermsAndCondition />

        <div className={styles.formActions}>
          <button type="button" onClick={onBack} className={styles.backButton}>
            ← Volver
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={items.length === 0 || !acceptTerms || !acceptPrivacy}
          >
            Procesar Pago ({formatPrice(total)})
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;

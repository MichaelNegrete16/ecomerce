import React, { useState } from "react";
import styles from "../Form.module.css";
import { formatPrice } from "@/utils/FromatPrice";
import useAppSelector from "@/redux/useAppSelector";
import {
  selectAcceptanceToken,
  selectCartItems,
  selectCartTotal,
  selectPersonalToken,
  selectPrivacyAccepted,
  selectTermsAccepted,
  selectUserInfo,
} from "@/redux/slices/cart/cart.selector";
import {
  detectCardType,
  formatCardNumber,
  getCardIcon,
} from "@/utils/DetecTypeCard";
import { initialDataPayment } from "./PaymentMethod.constant";
import TermsAndCondition from "../TermsAndCondition";
import { useCreateTransactionMutation } from "@/redux/slices/cart/cart.api";

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
  const accepToken = useAppSelector(selectAcceptanceToken);
  const personalToken = useAppSelector(selectPersonalToken);
  const [cardType, setCardType] = useState<CardType>("unknown");
  const [isLoading, setIsLoading] = useState(false);
  const [createTransaction] = useCreateTransactionMutation();

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

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Solo números

    if (value.length >= 2) {
      const month = value.slice(0, 2);
      const year = value.slice(2, 4);

      if (parseInt(month) > 12) {
        value = "12" + year;
      }

      value = month + (year ? "/" + year : "");
    }

    if (value.length <= 5) {
      setForm((prev) => ({ ...prev, expiryDate: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!acceptTerms || !acceptPrivacy) {
        alert(
          "Debes aceptar los términos y condiciones y la política de privacidad para continuar."
        );
        setIsLoading(false);
        return;
      }

      // Validar formato de fecha
      const expiryParts = form.expiryDate.split("/");
      if (
        expiryParts.length !== 2 ||
        expiryParts[0].length !== 2 ||
        expiryParts[1].length !== 2
      ) {
        alert("Por favor, ingresa una fecha de vencimiento válida (MM/AA)");
        setIsLoading(false);
        return;
      }

      const month = expiryParts[0];
      const year = expiryParts[1];

      const formatArticle = items.map((item) => ({
        id: item.product.id,
        amount: item.quantity,
      }));

      const response = await createTransaction({
        number: form.cardNumber.replace(/\s/g, ""),
        exp_month: month,
        exp_year: year,
        cvc: form.cvv,
        card_holder: form.cardName,
        customer_email: userInfo.email,
        acceptance_token: accepToken,
        accept_personal_auth: personalToken,
        amount_in_cents: total * 100,
        currency: "COP",
        articles: formatArticle,
      }).unwrap();

      const transactionData = {
        id: response.bill_id || Date.now().toString(),
        amount: total,
        items: items,
        userInfo: userInfo,
        cardLastFour: form.cardNumber.slice(-4),
        date: new Date().toISOString(),
        status: "completed",
      };

      localStorage.setItem("lastTransaction", JSON.stringify(transactionData));

      // Redirigir al resumen de pago
      window.location.href = `/payment-summary?id=${transactionData.id}`;
    } catch (error) {
      console.log("Error al procesar el pago:", error);
      alert("Error al procesar el pago. Por favor, inténtalo de nuevo.");
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingContent}>
            <div className={styles.spinner}></div>
            <h3>Procesando tu pago...</h3>
            <p>Por favor, no cierres esta ventana ni actualices la página</p>
          </div>
        </div>
      )}

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
                onChange={handleExpiryDateChange}
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
            <button
              type="button"
              onClick={onBack}
              className={styles.backButton}
            >
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
    </>
  );
};

export default PaymentForm;

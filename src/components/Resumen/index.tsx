import React, { useEffect, useState } from "react";

import styles from "./Resumen.module.css";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/utils/FromatPrice";
import { TransactionData } from "./Resumen.types";
import {
  IStatusTransactionResponse,
  useLazyGetStatusTransactionQuery,
} from "@/redux/slices/cart/cart.api";

const ResumenPayment = () => {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("id");
  const [transactionData, setTransactionData] =
    useState<TransactionData | null>(null);
  const [dataTransactionConsulta, setDataTransactionConsulta] =
    useState<IStatusTransactionResponse | null>(null);
  const [getTransactionStatus, { isLoading }] =
    useLazyGetStatusTransactionQuery();

  useEffect(() => {
    if (!transactionId) {
      window.location.href = "/";
    }
  }, [transactionId]);

  useEffect(() => {
    (async () => {
      if (transactionId) {
        const savedTransaction = localStorage.getItem("lastTransaction");
        if (savedTransaction) {
          const data = JSON.parse(savedTransaction);
          setTransactionData(data);
        }
        const response = await getTransactionStatus({
          bill_id: transactionId,
        }).unwrap();
        setDataTransactionConsulta(response);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Cargando resumen de pago...</p>
      </div>
    );
  }

  if (!transactionData) {
    return (
      <div className={styles.errorContainer}>
        <h2>Transacción no encontrada</h2>
        <p>No se pudo encontrar la información de la transacción.</p>
        <Link href="/" className={styles.homeButton}>
          Volver al inicio
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.successHeader}>
        {dataTransactionConsulta?.currentStatus === "APPROVED" ? (
          <div className={styles.successIcon}>✓</div>
        ) : (
          <div className={styles.errorIcon}>✗</div>
        )}
        <h1>
          {dataTransactionConsulta?.currentStatus === "APPROVED"
            ? "¡Pago Exitoso!"
            : "¡Pago Fallido!"}
        </h1>
        <p>
          {dataTransactionConsulta?.currentStatus === "APPROVED"
            ? "Tu pedido ha sido procesado correctamente"
            : "Hubo un problema con tu pedido"}
        </p>
      </div>

      <div className={styles.summaryCard}>
        <div className={styles.transactionInfo}>
          <h2>Detalles de la Transacción</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>ID de Transacción:</span>
              <span className={styles.value}>{transactionData.id}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Fecha:</span>
              <span className={styles.value}>
                {formatDate(transactionData.date)}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Tarjeta:</span>
              <span className={styles.value}>
                **** **** **** {transactionData.cardLastFour}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.orderInfo}>
          <h2>Información del Pedido</h2>
          <div className={styles.itemsList}>
            {transactionData.items.map((item) => (
              <div key={item.id} className={styles.orderItem}>
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <h3>{item.product.title}</h3>
                  <p>Cantidad: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.totalSection}>
            <div className={styles.totalRow}>
              <span>Subtotal:</span>
              <span>
                {formatPrice(
                  transactionData.amount -
                    (transactionData.amount * 0.19 +
                      transactionData.amount * 0.1)
                )}
              </span>
            </div>
            <div className={styles.totalRow}>
              <span>Impuestos (19%):</span>
              <span>{formatPrice(transactionData.amount * 0.19)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>ITMS (10%):</span>
              <span>{formatPrice(transactionData.amount * 0.1)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Total:</span>
              <span>{formatPrice(transactionData.amount)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Envío:</span>
              <span>Gratis</span>
            </div>
          </div>
        </div>

        <div className={styles.shippingInfo}>
          <h2>Información de Envío</h2>
          <div className={styles.addressCard}>
            <p>
              <strong>
                {transactionData.userInfo.firstName}{" "}
                {transactionData.userInfo.lastName}
              </strong>
            </p>
            <p>{transactionData.userInfo.address}</p>
            <p>
              {transactionData.userInfo.city},{" "}
              {transactionData.userInfo.postalCode}
            </p>
            <p>Email: {transactionData.userInfo.email}</p>
            <p>Teléfono: {transactionData.userInfo.phone}</p>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.printButton} onClick={() => window.print()}>
          Imprimir Resumen
        </button>
        <Link href="/" className={styles.homeButton}>
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default ResumenPayment;

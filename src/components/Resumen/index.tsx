import React, { useEffect, useState } from "react";

import styles from "./Resumen.module.css";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/utils/FromatPrice";

interface IItems {
  id: string;
  product: {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    originalPrice: number;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
    badge: string;
    discount: number;
    inStock: boolean;
    featured: boolean;
  };
  quantity: 1;
  addedAt: "2025-07-19T23:59:30.312Z";
}

interface TransactionData {
  id: string;
  amount: number;
  items: IItems[];
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  cardLastFour: string;
  date: string;
  status: string;
}

const ResumenPayment = () => {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("id");
  const [transactionData, setTransactionData] =
    useState<TransactionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga y obtener datos del localStorage
    const timer = setTimeout(() => {
      const savedTransaction = localStorage.getItem("lastTransaction");
      if (savedTransaction) {
        const data = JSON.parse(savedTransaction);
        setTransactionData(data);
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
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
        <div className={styles.successIcon}>✓</div>
        <h1>¡Pago Exitoso!</h1>
        <p>Tu pedido ha sido procesado correctamente</p>
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
              <span className={styles.label}>Estado:</span>
              <span className={`${styles.value} ${styles.statusCompleted}`}>
                Completado
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
                  <p className={styles.itemPrice}>
                    {formatPrice(item.product.price)}
                  </p>
                </div>
                <div className={styles.itemTotal}>
                  {formatPrice(item.product.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.totalSection}>
            <div className={styles.totalRow}>
              <span>Subtotal:</span>
              <span>{formatPrice(transactionData.amount)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Envío:</span>
              <span>Gratis</span>
            </div>
            <div className={styles.totalRow}>
              <span>Impuestos (16%):</span>
              <span>{formatPrice(transactionData.amount * 0.16)}</span>
            </div>
            <div className={`${styles.totalRow} ${styles.finalTotal}`}>
              <span>Total:</span>
              <span>{formatPrice(transactionData.amount * 1.16)}</span>
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

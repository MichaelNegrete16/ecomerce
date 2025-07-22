"use client";

import ResumenPayment from "@/components/Resumen";
import { Suspense } from "react";

const PaymentSummaryPage = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Suspense fallback={<div>Cargando resumen...</div>}>
        <ResumenPayment />
      </Suspense>
    </div>
  );
};

export default PaymentSummaryPage;

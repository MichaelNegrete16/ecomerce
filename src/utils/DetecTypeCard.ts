import CreditCardIcon from "@/components/Checkout/Form/icons/CreditCardIcon";
import MasterCardIcon from "@/components/Checkout/Form/icons/MasterCardIcon";
import VisaIcon from "@/components/Checkout/Form/icons/VisaIcon";
import { CardType } from "@/components/Checkout/Form/PaymenMethod/PaymentForm";

export const detectCardType = (number: string): CardType => {
  const cleanNumber = number.replace(/\s/g, "");

  // Visa: empieza con 4
  if (cleanNumber.startsWith("4")) {
    return "visa";
  }

  // Mastercard: empieza con 5[1-5] o 2[2-7]
  if (/^5[1-5]/.test(cleanNumber) || /^2[2-7]/.test(cleanNumber)) {
    return "mastercard";
  }

  return "unknown";
};

export const formatCardNumber = (value: string): string => {
  const cleanValue = value.replace(/\s/g, "");
  const detectedType = detectCardType(cleanValue);

  let formatted = "";

  if (detectedType === "amex") {
    // Amex: XXXX XXXXXX XXXXX
    formatted = cleanValue.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3");
  } else {
    // Visa/Mastercard: XXXX XXXX XXXX XXXX
    formatted = cleanValue.replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  return formatted;
};

export const getCardIcon = (cardType: CardType) => {
  switch (cardType) {
    case "visa":
      return VisaIcon;
    case "mastercard":
      return MasterCardIcon;
    default:
      return CreditCardIcon;
  }
};

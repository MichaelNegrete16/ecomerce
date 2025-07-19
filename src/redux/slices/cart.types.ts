import { Product } from "@/components/ProductCard/types";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface IUserInfo {
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  city: string;
  postalcode: string;
  phone: string;
}

export interface IPaymentInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
  userInfo: IUserInfo;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  acceptanceToken: string;
  personalToken: string;
}

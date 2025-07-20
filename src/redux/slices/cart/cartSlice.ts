import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState, IUserInfo } from "./cart.types";
import { initialDataUserInfo } from "@/components/Checkout/Form/UserInfo/UserInfo.constant";
import { IGetDataArticle } from "../articles/article.api";

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  isOpen: false,
  userInfo: initialDataUserInfo,
  termsAccepted: false,
  privacyAccepted: false,
  acceptanceToken: "",
  personalToken: "",
} as CartState;

const calculateTotals = (items: CartItem[]) => {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce(
    (total, item) => total + parseFloat(item.product.price) * item.quantity,
    0
  );
  return { itemCount, total };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: IGetDataArticle; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: parseFloat(`${product.id}-${Date.now()}`), // Unique ID based on product ID and timestamp
          product,
          quantity,
          addedAt: new Date(),
        });
      }

      const totals = calculateTotals(state.items);
      state.itemCount = totals.itemCount;
      state.total = totals.total;
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      const totals = calculateTotals(state.items);
      state.itemCount = totals.itemCount;
      state.total = totals.total;
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item && quantity > 0) {
        item.quantity = quantity;
      } else if (item && quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      }

      const totals = calculateTotals(state.items);
      state.itemCount = totals.itemCount;
      state.total = totals.total;
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },

    setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload;
    },

    setTermsAccepted: (state, action: PayloadAction<boolean>) => {
      state.termsAccepted = action.payload;
    },

    setPrivacyAccepted: (state, action: PayloadAction<boolean>) => {
      state.privacyAccepted = action.payload;
    },

    setAcceptanceToken: (state, action: PayloadAction<string>) => {
      state.acceptanceToken = action.payload;
    },

    setPersonalToken: (state, action: PayloadAction<string>) => {
      state.personalToken = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  setUserInfo,
  setTermsAccepted,
  setPrivacyAccepted,
  setAcceptanceToken,
  setPersonalToken,
} = cartSlice.actions;

export default cartSlice.reducer;

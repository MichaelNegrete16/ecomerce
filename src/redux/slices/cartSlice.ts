import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../components/ProductCard/types";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isOpen: false,
};

const calculateTotals = (items: CartItem[]) => {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
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
      action: PayloadAction<{ product: Product; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: `${product.id}-${Date.now()}`,
          product,
          quantity,
          addedAt: new Date(),
        });
      }

      const totals = calculateTotals(state.items);
      state.itemCount = totals.itemCount;
      state.total = totals.total;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      const totals = calculateTotals(state.items);
      state.itemCount = totals.itemCount;
      state.total = totals.total;
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
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
} = cartSlice.actions;

export default cartSlice.reducer;

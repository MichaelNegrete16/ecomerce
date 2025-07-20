import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { CartState } from "./cart.types";

export const selectCart = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  selectCart,
  (card: CartState) => card.items
);

export const selectCartTotal = createSelector(
  selectCart,
  (cart: CartState) => cart.total
);

export const selectCartItemCount = createSelector(
  selectCart,
  (cart: CartState) => cart.itemCount
);

export const selectIsCartOpen = createSelector(
  selectCart,
  (cart: CartState) => cart.isOpen
);

export const selectUserInfo = createSelector(
  selectCart,
  (cart: CartState) => cart.userInfo
);

export const selectTermsAccepted = createSelector(
  selectCart,
  (cart: CartState) => cart.termsAccepted
);

export const selectPrivacyAccepted = createSelector(
  selectCart,
  (cart: CartState) => cart.privacyAccepted
);

export const selectAcceptanceToken = createSelector(
  selectCart,
  (cart: CartState) => cart.acceptanceToken
);

export const selectPersonalToken = createSelector(
  selectCart,
  (cart: CartState) => cart.personalToken
);

import type { RootState } from "./index";

export const selectCartItemsArray = (state: RootState) =>
  Object.values(state.cart.itemsById);

export const selectTotalItems = (state: RootState) =>
  selectCartItemsArray(state).reduce((sum, it) => sum + it.quantity, 0);

export const selectSubtotal = (state: RootState) =>
  selectCartItemsArray(state).reduce((sum, it) => sum + it.price * it.quantity, 0);

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../api/dummyjson";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

export type CartState = {
  itemsById: Record<number, CartItem>;
};

const initialState: CartState = {
  itemsById: {},
};

function toCartItem(p: Product): CartItem {
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    thumbnail: p.thumbnail,
    quantity: 1,
  };
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const p = action.payload;
      const existing = state.itemsById[p.id];
      if (existing) existing.quantity += 1;
      else state.itemsById[p.id] = toCartItem(p);
    },
    incrementQty: (state, action: PayloadAction<number>) => {
      const item = state.itemsById[action.payload];
      if (item) item.quantity += 1;
    },
    decrementQty: (state, action: PayloadAction<number>) => {
      const item = state.itemsById[action.payload];
      if (!item) return;
      item.quantity -= 1;
      if (item.quantity <= 0) delete state.itemsById[action.payload];
    },
    removeItem: (state, action: PayloadAction<number>) => {
      delete state.itemsById[action.payload];
    },
    hydrateCart: (_state, action: PayloadAction<CartState>) => {
      return action.payload;
    },
  },
});

export const { addToCart, incrementQty, decrementQty, removeItem, hydrateCart } = cartSlice.actions;
export default cartSlice.reducer;

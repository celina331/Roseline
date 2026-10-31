
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const product = state.find(
        (item) => item.id === action.payload.id
      );

      if (product) {
        product.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) =>
      state.filter((item) => item.id !== action.payload),

    changeQuantity: (state, action) => {
      const item = state.find(
        (product) => product.id === action.payload.id
      );

      if (item) {
        item.quantity += action.payload.delta;
        if (item.quantity <= 0) {
          return state.filter(
            (product) => product.id !== action.payload.id
          );
        }
      }
    },

    clearCart: () => [],
  },
});

export const {
  addToCart,
  removeFromCart,
  changeQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

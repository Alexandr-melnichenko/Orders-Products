import { configureStore } from "@reduxjs/toolkit";
import { ordersReducer } from "./slices/orderSlice";
import { productsReducer } from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    products: productsReducer,
  },
});

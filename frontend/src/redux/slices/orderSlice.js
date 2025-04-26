import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  activeOrder: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = state.orders.push(action.payload);
    },
    deleteOrders: (state, action) => {
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload.id),
      };
    },
  },
});

export const { setOrders, deleteOrders } = orderSlice.actions;
export const ordersReducer = orderSlice.reducer;

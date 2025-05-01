import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders } from "../operations";

const initialState = {
  orders: [],
  activeOrder: null,
  loading: false,
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setOrders, deleteOrders } = orderSlice.actions;
export const ordersReducer = orderSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

export const fetchOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/orders");
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (page = 1, thunkAPI) => {
    try {
      const response = await axios.get(`/products?page=${page}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchSelectedOrder = createAsyncThunk(
  "orders/fetchSelected",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/orders/${orderId}`);
      console.log("Ответ сервера с orderId:", response.data);
      return response.data;
    } catch (err) {
      console.error("OrderId error:", err);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchSelectedProduct = createAsyncThunk(
  "products/fetchSelected",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/products/${productId}`);
      console.log("Ответ сервера с productId:", response.data);
      return response.data;
    } catch (err) {
      console.error("ProductId error:", err);
      return rejectWithValue(err.message);
    }
  }
);

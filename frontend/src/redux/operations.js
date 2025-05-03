import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

export const fetchOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/orders-with-stats");
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
      console.log("products response.data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchProductsOfOrder = createAsyncThunk(
  "products/fetchProductsOfOrder",
  async (orderId, thunkAPI) => {
    try {
      // Добавляем проверку на уже загруженные данные
      // const state = thunkAPI.getState();
      // if (state.products.productsOfOrder.some((p) => p.order_id === orderId)) {
      //   return; // Не делать запрос, если данные уже есть
      // }
      const response = await axios.get(`/products?order_id=${orderId}`);
      console.log("Products of Order:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching products of Order:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchProductsOfType = createAsyncThunk(
  "products/fetchProductsOfType",
  async (type, thunkAPI) => {
    try {
      // Добавляем проверку на уже загруженные данные
      const state = thunkAPI.getState();
      if (state.products.productsFilteredOfType.some((p) => p.type === type)) {
        return; // Не делать запрос, если данные уже есть
      }
      const response = await axios.get(`/products?type=${type}`);
      console.log("Products of type:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching products of type:", error.message);
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

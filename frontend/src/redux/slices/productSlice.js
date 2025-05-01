import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductsOfOrder,
  fetchProductsOfType,
} from "../operations";

const initialState = {
  products: [],
  currentPage: 1,
  totalPages: 1,
  totalProducts: 0,
  activeProduct: null,
  loading: false,
  error: null,
  productsOfOrder: [],
  productsFilteredOfType: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = state.products.push(action.payload);
    },
    deleteProducts: (state, action) => {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductsOfOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsOfOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.productsOfOrder = action.payload.products;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchProductsOfOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductsOfType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsOfType.fulfilled, (state, action) => {
        state.loading = false;
        state.productsFilteredOfType = action.payload.products;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchProductsOfType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProducts, deleteProducts } = productSlice.actions;
export const productsReducer = productSlice.reducer;

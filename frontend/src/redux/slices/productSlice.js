import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductsOfOrder,
  fetchProductTypes,
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
  types: [],
  typesLoading: false,
  typesError: null,
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
    resetProductsOfOrder: (state) => {
      state.productsOfOrder = [];
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
        console.log("fetchProductsOfOrder payload:", action.payload);
        state.productsOfOrder = action.payload.products;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchProductsOfOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductTypes.pending, (state) => {
        state.typesLoading = true;
        state.typesError = null;
      })
      .addCase(fetchProductTypes.fulfilled, (state, action) => {
        state.typesLoading = false;
        state.types = action.payload;
      })
      .addCase(fetchProductTypes.rejected, (state, action) => {
        state.typesLoading = false;
        state.typesError = action.payload;
      });
  },
});

export const { setProducts, deleteProducts, resetProductsOfOrder } =
  productSlice.actions;
export const productsReducer = productSlice.reducer;

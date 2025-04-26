import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  activeProduct: null,
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
});

export const { setProducts, deleteProducts } = productSlice.actions;
export const productsReducer = productSlice.reducer;

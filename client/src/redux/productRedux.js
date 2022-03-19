import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // Get
    getProductsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductsSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductsFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    // Delete
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    // Update
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Update
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
    addProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} = productSlice.actions;

export default productSlice.reducer;

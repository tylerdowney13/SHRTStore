import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from "./userRedux";
import {
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
} from "./productRedux";
import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess());
  } catch (err) {
    console.log(err);
    dispatch(logoutFailure());
  }
};

// Get Products
export const getProducts = async (dispatch) => {
  dispatch(getProductsStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductsSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getProductsFailure());
  }
};

// Delete Product
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    console.log(res);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    console.log(err);
    dispatch(deleteProductFailure());
  }
};

// Update Product
export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess({ id: id, product: product }));
    console.log(res.data.title + " was updated");
  } catch (err) {
    console.log(err);
    dispatch(updateProductFailure());
  }
};

// Add Product
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post("/products", product);
    console.log(res);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(addProductFailure());
  }
};

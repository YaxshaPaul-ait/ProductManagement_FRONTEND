import { createSlice } from '@reduxjs/toolkit';
import {
  createProduct,
  getProducts,
  getProductByID,
  getProductByName,
  getProductByDate,
  getProductStock,
  updateProduct,
  deleteProduct,
} from './actions';

interface ProductState {
  products: any[];
  selectedProduct: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getProductByID.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })
      .addCase(getProductByName.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })
      .addCase(getProductByDate.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getProductStock.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        if (!Array.isArray(state.products)) {
          state.products = []; 
        }
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (Array.isArray(state.products)) {
          state.products = state.products.filter((p) => p._id !== action.payload.id);
        } else {
          console.error("State.products is not an array:", state.products);
        }
      });
      
  },
});

export default productSlice.reducer;

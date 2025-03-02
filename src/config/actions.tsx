import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getApiEndPoint } from './api';
import { RootState } from './store';

export const signUp = createAsyncThunk('auth/signUp', async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
  try {
    const response = await axios.post(getApiEndPoint('/signup'), userData);
    return response.data.token;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk('auth/login', async (credentials: { email: string; password: string }, { rejectWithValue }) => {
  try {
    const response = await axios.post(getApiEndPoint('/login'), credentials);
    return response.data.token;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});



export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: any, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Unauthorized: No token found');
      }
      const response = await axios.post(getApiEndPoint('/products'), productData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Error creating product:', error);
      if (error.response.status === 400) {
        return rejectWithValue('Bad Request: Please check your product data');
      }
      return rejectWithValue(error.response?.data || 'Failed to create product');
    }
  }
);
export const getProductByID = createAsyncThunk(
    'products/getById',
    async (id: string, { getState, rejectWithValue }) => {
      try {
        const state = getState() as RootState;
        const token = state.auth.token;
        if (!token) {
          return rejectWithValue('Unauthorized: No token found');
        }
        const response = await axios.get(getApiEndPoint(`/products/${id}`), {
          headers: {
            Authorization: token,
          },
        });
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
export const getProducts = createAsyncThunk(
  'products/getAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Unauthorized: No token found');
      }
      const response = await axios.get(getApiEndPoint('/products'), {
        headers: {
          Authorization: token,
        },
      });
    //   console.log(response.data)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const getProductByName = createAsyncThunk(
  'products/getByName',
  async (name: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Unauthorized: No token found');
      }
      const response = await axios.get(getApiEndPoint(`/products_name/?name=${name}`), {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductByDate = createAsyncThunk(
  'products/getByDate',
  async (date: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Unauthorized: No token found');
      }
      const formattedDate = date.split('-').reverse().join('-');
      console.log(formattedDate)
      const response = await axios.get(getApiEndPoint(`/products_date/?date=${formattedDate}`), {
        headers: {
          Authorization: token,
        },
      });
      console.log(response);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductStock = createAsyncThunk(
  'products/getStock',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        return rejectWithValue('Unauthorized: No token found');
      }
      const response = await axios.get(getApiEndPoint('/product_stock/?isAvailable=true'), {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, name, price, isAvailable }: { id: string; name: string; price: number; isAvailable: boolean }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Unauthorized: No token found');
      }
      const response = await axios.put(getApiEndPoint(`/product/${id}`), { name, price, isAvailable }, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Unauthorized: No token found');
      }
      const response = await axios.delete(getApiEndPoint(`/productdelete/${id}`), {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, COMMON_PROP_URL, MARITAL_STATUS_URL, COMMON_PROP_PORT } from '../../../config';

const initialState = {
    maritalStatusOptions: [], 
  };

export const fetchMaritalStatusOptions = createAsyncThunk('maritalstatus', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}${COMMON_PROP_PORT}${COMMON_PROP_URL}${MARITAL_STATUS_URL}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const maritalStatusSlice = createSlice({
  name: 'maritalstatus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaritalStatusOptions.fulfilled, (state, action) => {
        state.maritalStatusOptions = action.payload; 
        state.isLoading = false
      })
      .addCase(fetchMaritalStatusOptions.rejected, (state, action) => {
        console.error('Error fetching data:', action.error.message);
      });
  },
});

export default maritalStatusSlice.reducer;

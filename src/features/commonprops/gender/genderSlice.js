import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, COMMON_PROP_URL, GENDER_URL, COMMON_PROP_PORT } from '../../../config';

const initialState = {
    genderOptions: [], // Make sure this is initialized properly
  };

// Create an async thunk for fetching gender options
export const fetchGenderOptions = createAsyncThunk('gender', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}${COMMON_PROP_PORT}${COMMON_PROP_URL}${GENDER_URL}`); 
    return response.data;
  } catch (error) {
    throw error;
  }
});

const genderSlice = createSlice({
  name: 'gender',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenderOptions.fulfilled, (state, action) => {
        state.genderOptions = action.payload; // Update gender options in the state when the request is successful
        state.isLoading = false
      })
      .addCase(fetchGenderOptions.rejected, (state, action) => {
        console.error('Error fetching data:', action.error.message);
      });
  },
});

export default genderSlice.reducer;

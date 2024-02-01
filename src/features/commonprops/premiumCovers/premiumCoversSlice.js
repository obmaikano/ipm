// Import necessary libraries and configurations
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, PREMIUM_COVERS_URL, COMMON_PROP_PORT } from '../../../config';

// Define initial state
const initialState = {
    premiumCovers: [], 
    selectedPremiumCover: null,
    selectedPlan: null,
    isLoading: false,
};

// Define async thunk for checking premium cover status
export const checkPremiumCoverStatus = createAsyncThunk('premiumcoverstatus', async () => {
  try {
    // Make API call to check premium cover status
    const response = await axios.get(`${API_BASE_URL}${COMMON_PROP_PORT}${PREMIUM_COVERS_URL}/status/check`);
    return response.data;
  } catch (error) {
    // Handle errors during API call
    throw error;
  }
});

// Define async thunk for fetching all premium cover products
export const fetchPremiumCoverProducts = createAsyncThunk('premiumcoverproducts', async () => {
  try {
    // Make API call to fetch all premium cover products
    const response = await axios.get(`${API_BASE_URL}${COMMON_PROP_PORT}${PREMIUM_COVERS_URL}/products`);
    return response.data;
  } catch (error) {
    // Handle errors during API call
    throw error;
  }
});

// Define async thunk for fetching a single premium cover product by productId
export const fetchSinglePremiumCover = createAsyncThunk('singlepremiumcover', async (productId) => {
  try {
    // Make API call to fetch a single premium cover product by productId
    const response = await axios.get(`${API_BASE_URL}${PREMIUM_COVERS_URL}/product/${productId}`);
    return response.data;
  } catch (error) {
    // Handle errors during API call
    throw error;
  }
});

// Define async thunk for fetching a plan for a premium cover product by planId
export const fetchPremiumCoverPlan = createAsyncThunk('premiumcoverplan', async (planId) => {
  try {
    // Make API call to fetch a plan for a premium cover product by planId
    const response = await axios.get(`${API_BASE_URL}${PREMIUM_COVERS_URL}/product/plan/${planId}`);
    return response.data;
  } catch (error) {
    // Handle errors during API call
    throw error;
  }
});

// Create a slice for premium covers using the 'builder callback' notation
const premiumCoversSlice = createSlice({
  name: 'premiumcovers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkPremiumCoverStatus.fulfilled, (state, action) => {
        // Update state with premium cover status on successful API call
        state.premiumCoverStatus = action.payload;
        state.isLoading = false;
      })
      .addCase(checkPremiumCoverStatus.rejected, (state, action) => {
        // Log error message if API call for premium cover status is rejected
        console.error('Error checking premium cover status:', action.error.message);
      })
      .addCase(fetchPremiumCoverProducts.fulfilled, (state, action) => {
        // Update state with fetched premium cover products on successful API call
        state.premiumCovers = action.payload; 
        state.isLoading = false;
      })
      .addCase(fetchPremiumCoverProducts.rejected, (state, action) => {
        // Log error message if API call for fetching premium cover products is rejected
        console.error('Error fetching premium cover products:', action.error.message);
      })
      .addCase(fetchSinglePremiumCover.fulfilled, (state, action) => {
        // Update state with the selected premium cover on successful API call
        state.selectedPremiumCover = action.payload; 
        state.isLoading = false;
      })
      .addCase(fetchSinglePremiumCover.rejected, (state, action) => {
        // Log error message if API call for a single premium cover is rejected
        console.error('Error fetching single premium cover:', action.error.message);
      })
      .addCase(fetchPremiumCoverPlan.fulfilled, (state, action) => {
        // Update state with fetched premium cover plan on successful API call
        state.selectedPlan = action.payload; 
        state.isLoading = false;
      })
      .addCase(fetchPremiumCoverPlan.rejected, (state, action) => {
        // Log error message if API call for fetching premium cover plan is rejected
        console.error('Error fetching premium cover plan:', action.error.message);
      });
  },
});

// Export the reducer
export default premiumCoversSlice.reducer;

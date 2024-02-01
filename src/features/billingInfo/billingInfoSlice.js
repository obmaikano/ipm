// Import necessary libraries and configurations
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BILLING_SERVICE_URL, BILLING_PORT, BILLING_URL } from '../../config';


const initialState = {
    billingInfo: null,
    status: 'idle',
    error: null,
};

export const postBillingAsync = createAsyncThunk('postbilling', async (billingData) => {
    try {
        // Make API call to get a policy by policyId
        const response = await axios.get(`${BILLING_SERVICE_URL}${BILLING_PORT}${BILLING_URL}`, billingData);
        return response.data;
    } catch ( error ) {
        // Handle errors during API call
        throw error;
    }
});

const billingInfoSlice = createSlice({
    name: 'billing',
    initialState,
    reducers: {
        billingRequest: (state) => {
            state.status = 'loading';
        },
        billingSuccess: (state, action) => {
            state.status = 'succeeded';
            state.billingInfo = action.payload;
        },
        billingFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(postBillingAsync.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.billingInfo = action.payload;
          })
          .addCase(postBillingAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(postBillingAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
    },
});

export const { billingRequest, billingSuccess, billingFailure } = billingInfoSlice.actions;
export default billingInfoSlice.reducer;
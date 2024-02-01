// Import necessary libraries and configurations
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, POLICIES_PORT, POLICIES_URL } from '../../config';

// Define initial state
const initialState = {
  policies: [],
  selectedPolicy: null,
  policyStatus: null,
  isLoading: false,
};

// Define async thunk for getting a policy by policyId
export const getPolicy = createAsyncThunk('getpolicy', async (policyId) => {
  try {
    // Make API call to get a policy by policyId
    const response = await axios.get(`${API_BASE_URL}${POLICIES_PORT}${POLICIES_URL}/${policyId}`);
    return response.data;
  } catch (error) {
    // Handle errors during API call
    throw error;
  }
});

// Define async thunk for updating a policy by policyId
export const putPolicy = createAsyncThunk('putpolicy', async ({ policyId, updatedPolicy }) => {
  try {
    // Make API call to update a policy by policyId
    const response = await axios.put(`${API_BASE_URL}${POLICIES_PORT}${POLICIES_URL}/${policyId}`, updatedPolicy);
    return response.data;
  } catch (error) {
    // Handle errors during API call
    throw error;
  }
});

// Define async thunk for posting a new policy
export const postPolicy = createAsyncThunk('postpolicy', async (newPolicy) => {
  try {
    // Make API call to post a new policy
    const response = await axios.post(`${API_BASE_URL}${POLICIES_PORT}${POLICIES_URL}`, newPolicy);
    return response.data;
  } catch (error) {
    // Handle errors during API call
    throw error;
  }
});

// Define async thunk for checking the status of policies
export const checkPolicyStatus = createAsyncThunk('policystatuscheck', async () => {
  try {
    // Make API call to check the status of policies
    const response = await axios.get(`${API_BASE_URL}${POLICIES_PORT}${POLICIES_URL}/statuscheck`);
    return response.data;
  } catch (error) {
    // Handle errors during API call
    throw error;
  }
});

// Define async thunk for getting policies by status
export const getPoliciesByStatus = createAsyncThunk('policiesbystatus', async (policyStatus) => {
  try {
    // Make API call to get policies by status
    const response = await axios.get(`${API_BASE_URL}${POLICIES_PORT}${POLICIES_URL}/status/${policyStatus}`);
    return response.data;
  } catch (error) {
    // Handle errors during API call
    throw error;
  }
});

// Define async thunk for getting all policies
export const getAllPolicies = createAsyncThunk('allpolicies', async () => {
  try {
    // Make API call to get all policies
    const response = await axios.get(`${API_BASE_URL}${POLICIES_PORT}${POLICIES_URL}/all`);
    return response.data;
  } catch (error) {
    // Handle errors during API call
    throw error;
  }
});

// Create a slice for policies using the 'builder callback' notation
const policiesSlice = createSlice({
  name: 'policies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPolicy.fulfilled, (state, action) => {
        // Update state with the fetched policy on successful API call
        state.selectedPolicy = action.payload;
        state.isLoading = false;
      })
      .addCase(getPolicy.rejected, (state, action) => {
        // Log error message if API call for getting a policy is rejected
        console.error('Error getting policy:', action.error.message);
      })
      .addCase(putPolicy.fulfilled, (state, action) => {
        // Update state with the updated policy on successful API call
        state.selectedPolicy = action.payload;
        state.isLoading = false;
      })
      .addCase(putPolicy.rejected, (state, action) => {
        // Log error message if API call for updating a policy is rejected
        console.error('Error updating policy:', action.error.message);
      })
      .addCase(postPolicy.fulfilled, (state, action) => {
        // Update state with the newly created policy on successful API call
        state.selectedPolicy = action.payload;
        state.isLoading = false;
      })
      .addCase(postPolicy.rejected, (state, action) => {
        // Log error message if API call for posting a policy is rejected
        console.error('Error posting policy:', action.error.message);
      })
      .addCase(checkPolicyStatus.fulfilled, (state, action) => {
        // Update state with the policy status on successful API call
        state.policyStatus = action.payload;
        state.isLoading = false;
      })
      .addCase(checkPolicyStatus.rejected, (state, action) => {
        // Log error message if API call for checking policy status is rejected
        console.error('Error checking policy status:', action.error.message);
      })
      .addCase(getPoliciesByStatus.fulfilled, (state, action) => {
        // Update state with policies by status on successful API call
        state.policies = action.payload;
        state.isLoading = false;
      })
      .addCase(getPoliciesByStatus.rejected, (state, action) => {
        // Log error message if API call for getting policies by status is rejected
        console.error('Error getting policies by status:', action.error.message);
      })
      .addCase(getAllPolicies.fulfilled, (state, action) => {
        // Update state with all policies on successful API call
        state.policies = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllPolicies.rejected, (state, action) => {
        // Log error message if API call for getting all policies is rejected
        console.error('Error getting all policies:', action.error.message);
      });
  },
});

// Export the reducer
export default policiesSlice.reducer;
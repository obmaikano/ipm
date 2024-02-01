// Import necessary libraries and configurations
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { API_BASE_URL, COMMON_PROP_PORT, EMPLOYER_URL } from "../../config";

// Define initial state
const initialState = {
    employers: [],
    selectedEmployer: null,
    employerStatus: null,
    isLoading: false,
};

// Define async thunk for getting an employer by employerId
export const getEmployer = createAsyncThunk('getemployer', async (employerId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}${COMMON_PROP_PORT}${EMPLOYER_URL}/${employerId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

// Define async thunk for updating an employer by employerId
export const putEmployer = createAsyncThunk('putemployer', async ({ employerId, employerData }) => {
    try {
        // Make API call to update a employer by employerId
        const response = await axios.put(`${API_BASE_URL}${COMMON_PROP_PORT}${EMPLOYER_URL}/${employerId}`, employerData);
        return response.data;
    } catch (error) {
        // Handle errors during API call
        throw error;
    }
});

// Define async thunk for posting a new employer
export const postEmployer = createAsyncThunk('postemployer', async (employerData) => {
    try {
        // Make API call to post a new employer
        const response = await axios.post(`${API_BASE_URL}${COMMON_PROP_PORT}${EMPLOYER_URL}`, employerData);
        return response.data;
    } catch (error) {
        // Handle errors during API call
        throw error;
    }
});

// Define async thunk for checking the status of employers
export const checkEmployerStatus = createAsyncThunk('employerstatuscheck', async () => {
    try {
        // Make API call to check the status of employers
        const response = await axios.get(`${API_BASE_URL}${COMMON_PROP_PORT}${EMPLOYER_URL}/statuscheck`);
        return response.data;
    } catch (error) {
        // Handle errors during API call
        throw error;
    }
});

const employerSlice = createSlice({
    name: 'employers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEmployer.fulfilled, (state, action) => {
                // update state with fetch employer on successful api call
                state.selectedEmployer = action.payload;
                state.isLoading = false;
            })
            .addCase(getEmployer.rejected, (state, action) => {
                console.log('Error getting employer: ', action.error.message);
            })
            .addCase(putEmployer.fulfilled, (state, action) => {
                // Update state with the updated employer on successful API call
                state.selectedEmployer = action.payload;
                state.isLoading = false;
            })
            .addCase(putEmployer.rejected, (state, action) => {
                // Log error message if API call for updating a employer is rejected
                console.error('Error updating employer:', action.error.message);
            })
            .addCase(postEmployer.fulfilled, (state, action) => {
                // Update state with the newly created employer on successful API call
                state.selectedEmployer = action.payload;
                state.isLoading = false;
            })
            .addCase(postEmployer.rejected, (state, action) => {
                // Log error message if API call for posting a employer is rejected
                console.error('Error posting policy:', action.error.message);
            }).addCase(checkEmployerStatus.fulfilled, (state, action) => {
                // Update state with the employer status on successful API call
                state.employerStatus = action.payload;
                state.isLoading = false;
            })
            .addCase(checkEmployerStatus.rejected, (state, action) => {
                // Log error message if API call for checking policy status is rejected
                console.error('Error checking employer status:', action.error.message);
            })
    }

});

export default employerSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PERSON_INFO_URL, API_BASE_URL, POLICIES_PORT } from '../../config';

// Define initial state
const initialState = {
    persons: [],
    selectedPerson: null,
    personStatus: null,
    isLoading: false
}

// Define async thunk for getting all persons
export const getAllPersons = createAsyncThunk('allcustomers', async () => {
    try {
        // Make API call to get all persons
        const response = await axios.get(`${API_BASE_URL}${POLICIES_PORT}${PERSON_INFO_URL}`);
        return response.data;
    } catch (error) {
        // Handle errors during API call
        throw error;
    }
});

// Define async thunk for posting a new customer/person
export const postPerson = createAsyncThunk('postperson', async (personData) => {
    try {
        // Make API call to post person
        const response = await axios.post(`${API_BASE_URL}${POLICIES_PORT}${PERSON_INFO_URL}`, personData);
        return response.data;
    } catch (error) {
        // handle error during API call
        throw error;
    }
});

// Define async thunk for getting a person by personId
export const getPerson = createAsyncThunk('getperson', async (personId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}${POLICIES_PORT}${PERSON_INFO_URL}/${personId}`);
        return response.data;
    } catch (error) {
        // handle errors during api call
        throw error;
    }
});

// Create a slice for persons/customers using the builder callback notation
const personSlice = createSlice({
    name: 'persons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPerson.fulfilled, (state, action) => {
                // Update state with the fetched person on successful API call
                state.selectedPerson = action.payload;
                state.isLoading = false;
            })
            .addCase(getPerson.rejected, (state, action) => {
                // Log error message if API call for getting a person is rejected
                console.error('Error getting person:', action.error.message);
            })
            .addCase(postPerson.fulfilled, (state, action) => {
                // Update state with the newly created person on successful API call
                state.selectedPerson = action.payload;
                state.isLoading = false;
            })
            .addCase(postPerson.rejected, (state, action) => {
                // Log error message if API call for posting a person is rejected
                console.error('Error posting person:', action.error.message);
            })
            .addCase(getAllPersons.fulfilled, (state, action) => {
                // Update state with all policies on successful API call
                state.persons = action.payload;
                state.isLoading = false;
            })
            .addCase(getAllPersons.rejected, (state, action) => {
                // Log error message if API call for getting all policies is rejected
                console.error('Error getting all persons:', action.error.message);
            });
    }
});

export default personSlice.reducer
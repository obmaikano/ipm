import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPoliciesContent = createAsyncThunk('/policies', async () => {
    const response = await axios.get('/api/policies', {})
    return response;
})

export const policiesSlice = createSlice({
    name: 'policies',
    initialState: {
        isLoading: false,
        policies: []
    },
    reducers: {

        addNewPolicy: (state, action) => {
            let {newPolicyObj} = action.payload
            state.policies = [...state.policies, newPolicyObj]
        },

        deletePolicy: (state, action) => {
            let {index} = action.payload
            state.policies.splice(index, 1)
        }
    },

    extraReducers: {
        [getPoliciesContent.pending]: state => {
            state.isLoading = true
        },
        [getPoliciesContent.fulfilled]: (state, action) => {
            state.policies = action.payload.data
            state.isLoading = false
        },
        [getPoliciesContent.rejected]: state => {
            state.isLoading = false
        },
    }
})

export const { addNewPolicy, deletePolicy } = policiesSlice.actions

export default policiesSlice.reducer
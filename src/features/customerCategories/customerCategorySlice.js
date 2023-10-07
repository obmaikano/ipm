import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCustomerCategoriesContent = createAsyncThunk('/customercategories', async () => {
    const response = await axios.get('/api/customercategories', {})
    return response;
})

export const customerCategoriesSlice = createSlice({
    name : 'customercategies',
    initialState : {
        isLoading: false,
        customercategories: []
    },
    reducers: {

        addNewCustomerCategory: (state, action) => {
            let {newCustomerCategoryObj} = action.payload
            state.customercategories = [...state.customercategories, newCustomerCategoryObj]
        },

        deleteCustomerCategory: (state, action) => {
            let {index} = action.payload
            state.customercategories.splice(index, 1)
        }
    },

    extraReducers: {
        [getCustomerCategoriesContent.pending]: state => {
            state.isLoading = true
        },
        [getCustomerCategoriesContent.fulfilled]: (state, action) => {
            state.customercategories = action.payload.data
            state.isLoading = false
        },
        [getCustomerCategoriesContent.rejected]: state => {
            state.isLoading = false
        },
    }
})

export const { addNewCustomerCategory, deleteCustomerCategory } = customerCategoriesSlice.actions

export default customerCategoriesSlice.reducer
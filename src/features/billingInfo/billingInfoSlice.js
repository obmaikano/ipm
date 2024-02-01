// Import necessary libraries and configurations
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    billingInfo: null,
    status: 'idle',
    error: null,
};
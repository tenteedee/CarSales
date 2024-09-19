import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

// Async thunk to fetch configuration from backend
export const fetchConfig = createAsyncThunk('config/fetchConfig', async () => {
    const response = await axios.get('https://your-backend-url/api/config'); // Replace with your actual URL
    return response.data; // Assuming the response contains the config object
});

const initialState = {
    config: {}, // Store your config object here
    loading: false,
    error: null,
};

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        // You can add other reducers for specific actions if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConfig.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchConfig.fulfilled, (state, action) => {
                state.config = action.payload;
                state.loading = false;
            })
            .addCase(fetchConfig.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default configSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import companyService from "./companyService";


const initialState = {
    company: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Add new company
export const addCompany = createAsyncThunk(
    "company/addCompany",
    async (company, thunkAPI) => {
        try {
        return await companyService.addCompany(company);
        } catch (error) {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(addCompany.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addCompany.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(addCompany.rejected, (state, action) => {
            state.isLoading = false
            state.company = null
            state.isError = true
            state.message = action.payload
        })
    },
})

export const { reset } = companySlice.actions;
export default companySlice.reducer;
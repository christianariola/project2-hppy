import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import companyService from "./companyService";


const initialState = {
    company: {},
    companyList: [],
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

// Fetch company list
export const getCompanyList = createAsyncThunk(
    "company/getCompanyList",
    async (company, thunkAPI) => {
        try {
        return await companyService.getCompanyList();
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

// Fetch company by id
export const getCompany = createAsyncThunk(
    "company/getCompany",
    async (companyId, thunkAPI) => {
        try {
        return await companyService.getCompany(companyId);
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
        .addCase(getCompanyList.fulfilled, (state, action) => {
            state.companyList = action.payload
        })
        .addCase(getCompanyList.rejected, (state, action) => {
            state.isLoading = false
            state.company = null
            state.isError = true
            state.message = action.payload
        })
        .addCase(getCompany.fulfilled, (state, action) => {
            state.company = action.payload
        })
        .addCase(getCompany.rejected, (state, action) => {
            state.isLoading = false
            state.company = null
            state.isError = true
            state.message = action.payload
        })
    },
})

export const { reset } = companySlice.actions;
export default companySlice.reducer;
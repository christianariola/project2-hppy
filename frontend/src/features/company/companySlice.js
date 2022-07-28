import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import companyService from "./companyService";


const initialState = {
    company: {},
    employee: '',
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
        // return await companyService.getCompanyList();
            const response = await companyService.getCompanyList();
            return response.data
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

// Edit company by id
export const editCompany = createAsyncThunk(
    "company/editCompany",
    async ({companyId, updatedCompanyData}, thunkAPI) => {
        console.log(updatedCompanyData)
        try {
        return await companyService.editCompany(updatedCompanyData, companyId);
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

// Delete company by id
export const deleteCompany = createAsyncThunk(
    "company/deleteCompany",
    async (companyId, thunkAPI) => {
        try {
        return await companyService.deleteCompany(companyId);
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

export const getEmployee = createAsyncThunk(
    "company/getEmployee",
    async (empId, thunkAPI) => {
        try {
        return await companyService.getEmployee(empId);
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

export const deleteEmployee = createAsyncThunk(
    "company/deleteEmployee",
    async ({empId, compempId}, thunkAPI) => {

        try {
        return await companyService.deleteEmployee(empId, compempId);
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

export const updateEmployee = createAsyncThunk(
    "company/updateEmployee",
    async ({updatedEmployeeData, empId}, thunkAPI) => {
        try {
        return await companyService.updateEmployee(updatedEmployeeData, empId);
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
        .addCase(getCompanyList.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getCompanyList.fulfilled, (state, action) => {
            state.isLoading = false
            state.companyList = action.payload
        })
        .addCase(getCompanyList.rejected, (state, action) => {
            state.isLoading = false
            state.compay = null
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
        .addCase(editCompany.fulfilled, (state, action) => {
            state.company = action.payload
            console.log("action", action)
            const { 
                arg: { id },
            } = action.meta

            if( id ){
                state.companyList = state.companyList.map((item) => item._id === id ? action.payload : item)
            }
        })
        .addCase(editCompany.rejected, (state, action) => {
            state.isLoading = false
            state.company = null
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteCompany.fulfilled, (state, action) => {
            // state.company = action.payload
            const { arg } = action.meta

            if( arg ){
                state.companyList = state.companyList.filter((item) => item._id !== arg)
            }
        })
        .addCase(deleteCompany.rejected, (state, action) => {
            state.isLoading = false
            // state.company = null
            state.isError = true
            state.message = action.payload
        })
        .addCase(getEmployee.fulfilled, (state, action) => {
            state.isLoading = false
            state.employee = action.payload
        })
        .addCase(getEmployee.rejected, (state, action) => {
            state.isLoading = false
            state.employee = null
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteEmployee.fulfilled, (state, action) => {

            state.company = action.payload
            // const { arg } = action.meta
            // console.log(state.company)
            // if( arg ){
            //     state.companyList = state.companyList.filter((item) => item._id !== arg)
            // }
        })
        .addCase(deleteEmployee.rejected, (state, action) => {
            state.isLoading = false
            state.company = null
            state.isError = true
            state.message = action.payload
        })
        .addCase(updateEmployee.fulfilled, (state, action) => {
            state.isLoading = false
            // state.employee = action.payload
        })
        .addCase(updateEmployee.rejected, (state, action) => {
            state.isLoading = false
            state.employee = null
            state.isError = true
            state.message = action.payload
        })
    },
})

export const { reset } = companySlice.actions;
export default companySlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    employee: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Add new employee
export const addEmployee = createAsyncThunk('auth/addEmployee', async (employee, thunkAPI) => {
    console.log(employee)
})

// Login employee
export const login = createAsyncThunk('auth/login', async (employee, thunkAPI) => {
    console.log(employee)
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export default authSlice.reducer
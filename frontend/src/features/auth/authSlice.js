import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from local storage
const employee = JSON.parse(localStorage.getItem('employee'))

const initialState = {
    employee: employee ? employee : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Add new employee
export const addEmployee = createAsyncThunk('auth/addEmployee', async (employee, thunkAPI) => {
    try {
        return await authService.addEmployee(employee)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// Login employee
export const login = createAsyncThunk('auth/login', async (employee, thunkAPI) => {
    try {
        return await authService.login(employee)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
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
        .addCase(addEmployee.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addEmployee.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            //disabled causing error on route protection
            //state.employee = action.payload
        })
        .addCase(addEmployee.rejected, (state, action) => {
            state.isLoading = false
            state.employee = null
            state.isError = true
            state.message = action.payload
        })
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.employee = action.payload
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.employee = null
            state.isError = true
            state.message = action.payload
        })
        .addCase(logout.fulfilled, (state) => {
            state.employee = null
        })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
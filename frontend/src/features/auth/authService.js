import axios from 'axios'

const API_URL = '/api/employees'

const addEmployee = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('employee', JSON.stringify(response.data))
    }

    return response.data
}

// Logout employee
const logout = () => localStorage.removeItem('employee')

const authService = {
    addEmployee,
    logout
}

export default authService
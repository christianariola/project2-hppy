import axios from 'axios'

// const API_URL_LOCAL = '/api/employees'
const API_URL = 'https://pluto-hppy.herokuapp.com/api/employees'

const addEmployee = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('employee', JSON.stringify(response.data))
    }

    return response.data
}

const login = async (userData) => {
    const response = await axios.post(API_URL + '/login', userData)

    if(response.data) {
        localStorage.setItem('employee', JSON.stringify(response.data))
    }

    return response.data
}


// Logout employee
const logout = () => localStorage.removeItem('employee')

const authService = {
    addEmployee,
    login,
    logout
}

export default authService
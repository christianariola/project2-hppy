import axios from 'axios'

// Local API_URL for dev
const API_URL = '/api/employees'
// const API_URL = 'https://pluto-hppy.herokuapp.com/api/employees'

const addEmployee = async (userData) => {
    const response = await axios.post(API_URL, userData)

    // if(response.data) {
    //     localStorage.setItem('employee', JSON.stringify(response.data))
    // }

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

const changePassword = async (userData) => {
    const response = await axios.post(API_URL + '/changePassword', userData)
    return response.data
}

const authService = {
    addEmployee,
    login,
    logout,
    changePassword
}

export default authService
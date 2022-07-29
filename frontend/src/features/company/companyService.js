import axios from 'axios'

// Local API_URL for dev
const API_URL = '/api/companies'
// const API_URL = 'https://pluto-hppy.herokuapp.com/api/companies'

const addCompany = async (companyData) => {
    const response = await axios.post(API_URL + '/add', companyData)

    return response.data
}

const getCompanyList = async () => {
    const response = await axios.get(API_URL + '/list')

    return response.data
}

const getCompany = async (companyId) => {
    const response = await axios.get(API_URL + `/view/${companyId}`)

    return response.data
}

const editCompany = async (updatedCompanyData, companyId) => {
    const response = await axios.patch(API_URL + `/edit/${companyId}`, updatedCompanyData)

    return response.data
}

const deleteCompany = async (companyId) => {
    const response = await axios.delete(API_URL + `/delete/${companyId}`)

    return response.data
}

const getEmployee = async (empId) => {
    const response = await axios.get(API_URL + `/employee/${empId}`)

    return response.data
}

const deleteEmployee = async (empId, compempId) => {
    const response = await axios.delete(API_URL + `/employee/${empId}/${compempId}`)

    return response.data
}

const companyService = {
    addCompany,
    getCompanyList,
    getCompany,
    editCompany,
    deleteCompany,
    getEmployee,
    deleteEmployee,
}

export default companyService
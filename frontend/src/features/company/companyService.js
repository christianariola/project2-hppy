import axios from 'axios'

// Local API_URL for dev
const API_URL = '/api/companies'
//const API_URL = 'https://pluto-hppy.herokuapp.com/api/companies'

const addCompany = async (companyData) => {
    const response = await axios.post(API_URL + '/add', companyData)

    return response.data
}

const getCompanyList = async () => {
    const response = await axios.get(API_URL + '/list')

    return response.data
}

const companyService = {
    addCompany,
    getCompanyList,
}

export default companyService
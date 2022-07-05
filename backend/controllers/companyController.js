const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const Company = require('../models/companyModel')

// @desc   Register a new user
// @route  /api/employees
// @access Public
const addCompany = asyncHandler(async (req, res) => {

    const {name, description, logo, departments} = req.body

    // const departments = { deptName: req.body.deptName }
    // console.log(req.body)
    const company = await Company.create({
        name,
        description,
        logo,
        departments
    })

    if(company) {
        res.status(201).json({
            _id: company._id,
            name: company.name,
            description: company.description,
            logo: company.logo
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const getCompanyList = asyncHandler(async (req, res) => {
    const companies = await Company.find({})

    if(companies) {
        res.status(201).json({
            data: companies,
        })
    } else {
        res.status(400)
        throw new Error('Something went wrong...')
    }
}) 

module.exports = {
    addCompany,
    getCompanyList,
}
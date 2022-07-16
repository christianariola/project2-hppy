const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')

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

const getCompany = asyncHandler(async (req, res) => {

    // console.log(req.params.companyId);
    const company = await Company.findOne({ _id: req.params.companyId })    

    if(company){
        res.status(201).json({
            _id: company._id,
            name: company.name,
            description: company.description,
            departments: company.departments,
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

const deleteCompany = asyncHandler(async (req, res) => {

    const id = req.params.companyId

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ message: `No company exist with id ${id}` })
    }

    const company = await Company.findByIdAndRemove(id) 

    if(company){
        res.status(201).json({
            message: "Company deleted successfully"
        })
    } else {
        res.status(401)
        throw new Error('Something went wrong...')
    }
})


module.exports = {
    addCompany,
    getCompanyList,
    getCompany,
    deleteCompany,
}
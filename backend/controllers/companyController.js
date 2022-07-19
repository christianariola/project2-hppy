const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const cloudinary = require("../cloudinary/cloudinary")
const Company = require('../models/companyModel')

// @desc   Register a new user
// @route  /api/employees
// @access Public
const addCompany = asyncHandler(async (req, res) => {

    const {name, description, logo, departments} = req.body

    const filename = name.trim().toLowerCase()

    const result = await cloudinary.uploader.upload(logo,
    {
        upload_preset: 'unsigned_uploads',
        public_id: `${filename}-logo`,
        allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
        width: 300,
        crop: "scale"
    });

    const company = await Company.create({
        name,
        description,
        logo: {
            public_id: result.public_id,
            url: result.secure_url
        },
        departments
    })

    if(company) {
        res.status(201).json({
            _id: company._id,
            name: company.name,
            description: company.description,
            logo: company.logo.public_id,
            logo_url: company.logo.url
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

const editCompany = asyncHandler(async (req, res) => {

    const id = req.params.companyId
    const { name, description, logo, departments } = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ message: `No company exist with id ${id}` })
    }

    const updatedCompany = {
        name,
        description,
        logo,
        departments,
        _id: id
    }

    const company = await Company.findByIdAndUpdate(id, updatedCompany, { new: true }) 

    if(company){
        res.status(201).json(updatedCompany)
    } else {
        res.status(401)
        throw new Error('Something went wrong...')
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
    editCompany,
    deleteCompany,
}
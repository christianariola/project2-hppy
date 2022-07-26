const asyncHandler = require('express-async-handler')
// password encryption
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Employee = require('../models/employeeModel')

// @desc   Register a new user
// @route  /api/employees
// @access Public
const registerEmployee = asyncHandler(async (req, res) => {
    const {company_id, company_name, department, firstName, lastName, email, password} = req.body

    console.log(req.body)

    //Validation
    if(!firstName || !lastName || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    // Find id employee already exists
    const employeeExist = await Employee.findOne({ email })

    if(employeeExist) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Password encyptions
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const employee = await Employee.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        company_id,
        company_name,
        department,
    })

    if(employee) {
        res.status(201).json({
            _id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            token: generateToken(employee._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc   Login a new user
// @route  /api/employees/login
// @access Public
const loginEmployee = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const employee = await Employee.findOne({ email })

    // Check employee and password match
    if(employee && (await bcrypt.compare(password, employee.password))){
        res.status(201).json({
            _id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            role: employee.role,
            company_name: employee.company_name,
            token: generateToken(employee._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }


})

// @desc   get current emploee
// @route  /api/employees/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    const employee = {
        id: req.employee._id,
        email: req.employee.email,
        firstName: req.employee.firstName,
        lastName: req.employee.lastName
    }
    res.status(200).json(employee)
})

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

//@desc get all employees
// const getAllEmployees = asyncHandler(async (req, res) => {
//     const employeeAll = {
//         id: req.employee._id,
//         email: req.employee.email,
//         company_name: req.employee.company_name,
//         company_id : req.employee.company_id
//     }
//     res.status(200).json(employeeAll)
// })

module.exports = {
    registerEmployee,
    loginEmployee,
    getMe,
    // getAllEmployees
}
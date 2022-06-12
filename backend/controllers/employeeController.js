const asyncHandler = require('express-async-handler')
// password encryption
const bcrypt = require('bcryptjs')

const Employee = require('../models/employeeModel')
const { restart } = require('nodemon')

// @desc   Register a new user
// @route  /api/users
// @access Public
const registerEmployee = asyncHandler(async (req, res) => {
    const {firstName, lastName, email, password} = req.body

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
        password: hashedPassword
    })

    if(employee) {
        res.status(201).json({
            _id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email
        })
    } else {
        restart.stauts(400)
        throw new Error('Invalid user data')
    }
})

// @desc   Login a new user
// @route  /api/users/login
// @access Public
const loginEmployee = asyncHandler(async (req, res) => {
    res.send('Login Route')
})

module.exports = {
    registerEmployee,
    loginEmployee
}
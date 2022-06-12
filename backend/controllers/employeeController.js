const asyncHandler = require('express-async-handler')
// password encryption
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
            email: employee.email,
            token: generateToken(employee._id)
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

    const { email, password } = req.body

    const employee = await Employee.findOne({ email })

    // Check employee and password match
    if(employee && (await bcrypt.compare(password, employee.password))){
        res.status(201).json({
            _id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            token: generateToken(employee._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }

    res.send('Login Route')
})

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerEmployee,
    loginEmployee
}
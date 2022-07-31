const asyncHandler = require('express-async-handler')
// password encryption
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Employee = require('../models/employeeModel')
const Company = require('../models/companyModel')

const cloudinary = require("../cloudinary/cloudinary")

// @desc   Register a new user
// @route  /api/employees
// @access Public
const registerEmployee = asyncHandler(async (req, res) => {
    const {company_id, company_name, department_id, department_name, employeeNumber, firstName, lastName, email, role, jobTitle, password} = req.body

    // console.log(req.body)

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
        employeeNumber,
        firstName,
        lastName,
        email,
        role: role.toLowerCase(),
        jobTitle,
        password: hashedPassword,
        company_id,
        company_name,
        department_id,
        department_name,
    })

    let empData = []
    if(role == 'Manager'){
        empData = {
            employee_id: employee._id,
            employeeNumber,
            firstName,
            lastName,
            email,
            jobTitle,
            isManager: true
        }
    } else if(role == 'Admin'){
        empData = {
            employee_id: employee._id,
            employeeNumber,
            firstName,
            lastName,
            email,
            jobTitle,
            isAdmin: true
        }
    } else {
        empData = {
            employee_id: employee._id,
            employeeNumber,
            firstName,
            lastName,
            email,
            jobTitle,
        }
    }

    // const company = Company.findOne({"departments._id": department_id}).then(doc => {
    //     item = doc.departments.id(department_id);

    //     console.log(item)
    //     item["employees"] = "new name";
    //     // item["value"] = "new value";
    //     doc.save();
    // //sent respnse to client
    // }).catch(err => {
    // console.log('Oh! Dark', err)
    // });

    // Insert employee data to company document
    const company = Company.updateOne({
        "_id": company_id,
        "departments._id": department_id
    },
    {
        $push: {
            "departments.$[departments].employees": empData
        }
    },
    {
        arrayFilters: [
            {
            "departments._id": department_id
            }
        ]
    },
    (err, success) => {
        if(err){
            console.log("Unsuccessful", err)
        } else {
            console.log("Successful", success)
        }
    })

    if(employee) {
        res.status(201).json({
            _id: employee._id,
            employeeNumber: employee.employeeNumber,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            role: employee.role,
            job_title: employee.jobTitle,
            company_id: employee.company_id,
            company_name: employee.company_name,
            department_id: employee.department_id,
            department_name: employee.department_name,
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
            employeeNumber: employee.employeeNumber,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            role: employee.role,
            job_title: employee.jobTitle,
            role: employee.role,
            company_id: employee.company_id,
            company_name: employee.company_name,
            department_id: employee.department_id,
            department_name: employee.department_name,
            token: generateToken(employee._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid username and password. Please try again.')
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

// @desc   Login a new user
// @route  /api/employees/login
// @access Public
const changePassword = asyncHandler(async (req, res) => {

    const { email, currentPassword, newPassword, confirmPassword } = req.body

    const employee = await Employee.findOne({ email })

    // Check employee and password match
    if(employee && (await bcrypt.compare(currentPassword, employee.password))){

        if(newPassword !== confirmPassword){
            res.status(401)
            throw new Error('New and confirm password does not match')
        }

        // Password encyptions
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        const filter = { email: email };
        const update = { password: hashedPassword };
        let doc = await Employee.findOneAndUpdate(filter, update);


        res.status(201).json({
            message: "You have successfully updated you password"
        })
    } else {
        res.status(401)
        throw new Error('Invalid current password')
    }

})

module.exports = {
    registerEmployee,
    loginEmployee,
    getMe,
    changePassword,
}
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { default: mongoose } = require('mongoose')
const cloudinary = require("../cloudinary/cloudinary")

const Company = require('../models/companyModel')
const Employee = require('../models/employeeModel')

const generateString = (length) => {
    var res = '';
    var availableChars = 'abcdefghijklmnopqrstuvwxyz';
    var numAvalailableChars = availableChars.length;

    for (var i = 0; i < length; i++) {
        res += availableChars.charAt(Math.floor(Math.random() * numAvalailableChars));
    }

    return res;
}


// @desc   Register a new company
// @route  /api/companies
// @access Public
const addCompany = asyncHandler(async (req, res) => {

    const {name, description, logo, departments} = req.body

    const filename = name.trim().toLowerCase()
    const randomName = generateString(8)

    const result = await cloudinary.uploader.upload(logo,
    {
        upload_preset: 'unsigned_uploads',
        public_id: `${filename}-${randomName}`,
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
            logo: company.logo,
            departments: company.departments,
        })
    } else {
        res.status(401)
        throw new Error('No data found')
    }
})

const editCompany = asyncHandler(async (req, res) => {

    const id = req.params.companyId
    const { name, description, logo, departments } = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ message: `No company exist with id ${id}` })
    }

    if(logo){
        const filename = name.trim().toLowerCase()
        const randomName = generateString(8)
        const result = await cloudinary.uploader.upload(logo,
        {
            upload_preset: 'unsigned_uploads',
            public_id: `${filename}-${randomName}`,
            allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
            width: 300,
            crop: "scale"
        });

        console.log(result)
        const updatedCompany = {
            name,
            description,
            logo: {
                public_id: result.public_id,
                url: result.secure_url
            },
            departments,
            _id: id
        }

        const company = await Company.findByIdAndUpdate(id, updatedCompany) 

        if(company){
            res.status(201).json(updatedCompany)
        } else {
            res.status(401)
            throw new Error('Something went wrong...')
        }
    } else {
        const updatedCompany = {
            name,
            description,
            departments,
            _id: id
        }

        // const company = await Company.findByIdAndUpdate(id, updatedCompany) 

        // if(company){
        //     res.status(201).json(updatedCompany)
        // } else {
        //     res.status(401)
        //     throw new Error('Something went wrong...')
        // }
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

const employeeByCompany = asyncHandler(async (req, res) => {
    const empId = req.params.empId
    // console.log(empId)
    const employee = await Employee.findOne({ _id: empId })    

    if(empId){
        if(employee){
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
            })
        } else {
            res.status(401)
            throw new Error('No data found')
        }
    }

})

const deleteEmployee = asyncHandler(async (req, res) => {

    const {empId, compempId} = req.params

    console.log(empId)
    console.log(compempId)
    
    try {

        // Remove on employee collection
        const employee = await Employee.findByIdAndRemove(empId) 

        // Remove on company collection
        const company = Company.updateOne({'departments.employees._id': compempId },
        { $pull: {'departments.$.employees':  {'_id': compempId}}  },
        {multi: true},
        (err, success) => {
            if(err){
                console.log("Unsuccessful", err)
            } else {
                console.log("Successful", success)
            }
        })

        const newcompany = await Company.findOne({ 'departments.employees._id': compempId })    

        if(newcompany){
            res.status(201).json({
                _id: company._id,
                name: company.name,
                description: company.description,
                logo: company.logo,
                departments: company.departments,
            })
        } else {
            res.status(401)
            throw new Error('No data found')
        }

    } catch (error) {
        console.log(error)
    }

})

const editEmployee = asyncHandler(async (req, res) => {

    const {empId} = req.params

    const {department_id, department_name, employeeNumber, firstName, lastName, email, role, jobTitle, password} = req.body

    // updating company collection nested document
    let empData = []
    if(role == 'manager'){
        empData = {
            employee_id: empId,
            employeeNumber,
            firstName,
            lastName,
            email,
            jobTitle,
            isManager: true
        }
    } else if(role == 'admin'){
        empData = {
            employee_id: empId,
            employeeNumber,
            firstName,
            lastName,
            email,
            jobTitle,
            isAdmin: true
        }
    } else {
        empData = {
            employee_id: empId,
            employeeNumber,
            firstName,
            lastName,
            email,
            jobTitle,
        }
    }

    // const company = Company.updateOne({
    //     // "_id": '62df922b736253a622c857df',
    //     "departments._id": department_id
    // },
    // {
    //     $push: {
    //         "departments.$[departments].employees": empData
    //     }
    // },
    // {
    //     arrayFilters: [
    //         {
    //         "departments._id": department_id
    //         }
    //     ]
    // },
    // (err, success) => {
    //     if(err){
    //         console.log("Unsuccessful", err)
    //     } else {
    //         console.log("Successful", success)
    //     }
    // })

    const company = Company.findOne({"departments._id": department_id}).then(doc => {
        item = doc.departments.id(department_id);

        // console.log(item.employees)
        const employeeDoc = item.employees.filter((employees) => employees.email !== email)
        const empInsert = [...employeeDoc, empData]

        // console.log(empInsert)
        item["employees"] = empInsert;

        doc.save();
    //sent respnse to client
    }).catch(err => {
    console.log('Oh! Dark', err)
    });

    let employeeData 
    if(password){

        // Password encyptions
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        employeeData = {
            employeeNumber,
            firstName,
            lastName,
            email,
            role: role.toLowerCase(),
            jobTitle,
            password: hashedPassword,
            department_id,
            department_name,
        }
    } else {
        employeeData = {
            employeeNumber,
            firstName,
            lastName,
            email,
            role: role.toLowerCase(),
            jobTitle,
            department_id,
            department_name,
        }
    }

    const employee = Employee.findByIdAndUpdate(empId, employeeData,
    (err, success) => {
        if(err){
            // console.log("Unsuccessful", err)
        } else {
            // console.log("Successful", success)
        }
    })

    if(employee && company) {
        res.status(201).json({
            message: "Success"
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


module.exports = {
    addCompany,
    getCompanyList,
    getCompany,
    editCompany,
    deleteCompany,
    employeeByCompany,
    deleteEmployee,
    editEmployee,
}
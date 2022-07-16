const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add a first name'],
    },
    middleName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: [true, 'Please add a last name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    role: {
        type: String,
        required: [true, 'Please select a role'],
        default: 'employee',
    },
    company_id: {
        type: String,
        required: [true, 'Please add a company id'],
    },
    company_name: {
        type: String,
        required: [true, 'Please add a company name'],
    },
    department_id: {
        type: String,
        required: [true, 'Please add a department id'],
    },
    department: {
        type: String,
        required: [true, 'Please add a department'],
    },
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Employee', employeeSchema)
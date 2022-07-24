const mongoose = require('mongoose')
const { ObjectId } = mongoose.SchemaTypes;

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
    role: {
        type: String,
        required: [true, 'Please add a role'],
        unique: true
    },
    jobTitle: {
        type: String,
        required: [true, 'Please add an job title'],
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
        type: ObjectId,
        ref: "Company",
        required: [true, 'Please add a company id'],
    },
    company_name: {
        type: String,
        required: [true, 'Please add a company name'],
    },
    department_id: {
        type: ObjectId,
        ref: "Company",
        required: [true, 'Please add a department id'],
    },
    department_name: {
        type: String,
        required: [true, 'Please add a department name'],
    },
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Employee', employeeSchema)
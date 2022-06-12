const mongoose = require('mongoose')

const employeeScheme = mongoose.Schema({
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
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Employee', employeeScheme)
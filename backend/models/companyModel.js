const mongoose = require('mongoose')
const { ObjectId } = mongoose.SchemaTypes;

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a company name'],
    },
    description: {
        type: String,
        required: false,
    },
    logo: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    }, required: false,
    departments: [{
        deptName: {
            type: String,
            required: [false, "Please add a department name"],
        },
        manager: [{
            employee_id: {
                type: ObjectId,
                ref: "Employee",
                required: false,
            },
            firstName: {
                type: String,
                required: false,
            },
            lastName: {
                type: String,
                required: false,
            },
            email: {
                type: String,
                required: false,
            },
            jobTitle: {
                type: String,
                required: false,
            },
        }],
        employees: [{
            employee_id: {
                type: ObjectId,
                ref: "Employee",
                required: false,
            },
            firstName: {
                type: String,
                required: false,
            },
            lastName: {
                type: String,
                required: false,
            },
            email: {
                type: String,
                required: false,
            },
            jobTitle: {
                type: String,
                required: false,
            },
        }],
    }], required: false,
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Company', companySchema)
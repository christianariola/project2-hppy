const mongoose = require('mongoose')

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
        type: String,
        required: [true, 'Please add a logo'],
    },
    departments: {
        deptName: {
            type: String,
            required: [true, "Please add a department name"],
        },
        deptCode: {
            type: String,
            required: [true, "Please add a department name"],
        },
        employees: [
            {
                type: ObjectId,
                ref: "Employee",
                required: [true, "employee_id is required"],
            }
        ],
    },
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Company', companySchema)
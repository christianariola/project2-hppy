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
        type: String,
        required: [true, 'Please add a logo'],
    },
    departments: [{
        deptName: {
            type: String,
            required: [false, "Please add a department name"],
        },
        // employees: [
        //     {
        //         type: ObjectId,
        //         ref: "Employee",
        //         required: [false, "employee_id is required"],
        //     }
        // ],
    }], required: false,
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Company', companySchema)
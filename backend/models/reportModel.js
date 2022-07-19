const mongoose = require('mongoose')


const reportSchema = mongoose.Schema({
    surveyid: {
        type: String
    },
    dailySurvey: {
        employeeEmail: {
          type: String,
          required: [true, "Please add an employee email"],
        },
        surveyName: {
          type: String,
          required: [true, "Please add a survey name"],
        },
        dailyFeeling: {
          type: String,
          required: [true, "Please add a daily feeling"],
        },
        dailyComment: {
          type: String,
        },
        dailySentiment: {
          type: String,
        },
        dailySurveyState: {
          type: String,
          default: "pending",
          required: [true, "Please add a daily survey state"],
        },
        dailySurveyDate: {
          type: String,
          required: [true, "Please add a daily survey date"],
        },
        dailyTotalRating: {
          type: Number,
          required: [true, "Please add a daily total rating"],
        },
      },
    employees: {
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
    department: {
        type: String,
        required: [true, 'Please add a department'],
    },
}, 
},
{
    timestamps: true,
})

module.exports = mongoose.model('Report', reportSchema)
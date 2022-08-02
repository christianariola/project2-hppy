const asyncHandler = require('express-async-handler')
const { default: mongoose } = require('mongoose')

const Company = require('../models/companyModel')
const Employee = require('../models/employeeModel')
const DailySurvey = require("../models/dailySurveyModel");
const MonthlySurvey = require("../models/MonthlySurveyModel");

const getDashboardStats = asyncHandler(async (req, res) => {

    // Company Count
    const companies = await Company.count({})
    const employees = await Employee.count({})

    const daily = await DailySurvey.DailySurvey.count({})
    const monthly = await MonthlySurvey.MonthlySurvey.count({})

    const totalSurveys = daily + monthly

    res.status(201).json({
        companies: companies,
        employees: employees,
        totalSurveys: totalSurveys,
    })
})


module.exports = {
    getDashboardStats
}
const asyncHandler = require('express-async-handler')

// @desc   Fetch report by date
// @route  /api/reports
// @access Public
const getReportByDate = asyncHandler(async (req, res) => {

    console.log(req.params.surveyDate);  
    const dailySurveyModel = await dailySurveyModel.findAll({dailySurveyDate:req.params.surveyDate})
    // if(company){
    //     res.status(201).json({
    //     })
    // } else {
    //     res.status(401)
    //     throw new Error('Invalid credentials')
    // }
}) 

module.exports = {
    getReportByDate,
}
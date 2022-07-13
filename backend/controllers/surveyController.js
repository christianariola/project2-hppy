const asyncHandler = require("express-async-handler");
// const DailySurvey = require("../models/dailySurveyModel");


const dailySurveyChecker = asyncHandler(async (req, res) => {

  const { DailySurvey } = require("../models/dailySurveyModel");
  
  let dailySurvey = new DailySurvey(req.body);

  const dailychecker = await DailySurvey.findOne({ surveyid:dailySurvey.surveyid })

  let employeeDone;

  if(dailychecker){
    employeeDone = true
  } else {
    employeeDone = false
  }

  res.status(200).json({ checker: employeeDone })
})

module.exports = {
  dailySurveyChecker,
}

const asyncHandler = require("express-async-handler");

const dailySurvey = require("../models/dailySurveyModel");

// @desc   submit a new survey
// @route  /api/dailySurvey
// @access Public
const submitSurvey = asyncHandler(async (req, res) => {
  const {
    surveyName,
    questionOne,
    questionTwo,
    sentimentRating,
    surveyState,
    surveyDate,
  } = req.body;

  const survey = await dailySurvey.create({
    surveyName,
    questionOne,
    questionTwo,
    sentimentRating,
    surveyState,
    surveyDate,
  });

  if (survey) {
    res.status(201).json({
      surveyName: survey.surveyName,
      questionOne: survey.questionOne,
      questionTwo: survey.questionTwo,
      sentimentRating: survey.sentimentRating,
      surveyState: survey.surveyState,
      surveyDate: survey.surveyDate,
    });
  } else {
    res.status(400);
    throw new Error("Invalid survey data");
  }
});

module.exports = { submitSurvey };

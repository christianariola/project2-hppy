const asyncHandler = require("express-async-handler");

const dailySurvey = require("../models/dailySurveyModel");

// @desc   submit a new survey
// @route  /api/dailySurvey
// @access Public
const submitSurvey = asyncHandler(async (req, res) => {
  const { questionOne, questionTwo, sentimentRating, surveyState } = req.body;

  const survey = await dailySurvey.create({
    questionOne,
    questionTwo,
    sentimentRating,
    surveyState,
  });

  if (survey) {
    res.status(201).json({
      _id: survey._id,
      questionOne: survey.questionOne,
      questionTwo: survey.questionTwo,
      sentimentRating: survey.sentimentRating,
      surveyState: survey.surveyState,
    });
  } else {
    res.status(400);
    throw new Error("Invalid survey data");
  }
});

module.exports = { submitSurvey };
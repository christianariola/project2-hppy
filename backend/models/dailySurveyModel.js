const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dailySurveySchema = new Schema({
  surveyName: {
    type: String,
    required: [true, "Please add a survey name"],
    unique: true,
  },
  questionOne: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please select a rating"],
  },
  questionTwo: {
    type: String,
    required: false,
  },
  sentimentRating: {
    type: Number,
  },
  surveyState: {
    type: String,
    required: true,
    default: "pending",
  },
  surveyDate: {
    type: Date,
    required: true,
  },
});
exports.dailySurveySchema = mongoose.model("DailySurvey", dailySurveySchema);

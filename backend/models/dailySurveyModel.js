const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dailySurveySchema = new Schema({
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
  date: {
    type: Date,
    required: true,
  },
});
exports.dailySurveySchema = mongoose.model("DailySurvey", dailySurveySchema);

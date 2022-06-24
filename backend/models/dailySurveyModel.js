const mongoose = require("mongoose");

const dailySurveySchema = mongoose.Schema({
  questionOne: {
    type: Number,
    required: [true, "Please select a rating"],
  },
  questionTwo: {
    type: String,
    required: false,
  },
  surveyState: {
    type: String,
    required: true,
    default: "pending",
  },
  timestamps: true,
});
module.exports = mongoose.model("DailySurvey", dailySurveySchema);

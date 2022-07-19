const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* Creating a schema for the database. */
const dailySurveySchema = new Schema({
  surveyid: {
    type: String,
    unique: true,
    required: [true, "Please add an id"],
    Error: [true, "Survey Already Exists"],
  },
  surveyType: {
    type: String,
    required: [true, "Please add a survey type"],
    default: "Daily",
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
});
exports.DailySurvey = mongoose.model("DailySurvey", dailySurveySchema);

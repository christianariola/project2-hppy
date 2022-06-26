const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dailySurveySchema = new Schema({
  dailySurvey: {
    employeeEmail: {
      type: String,
      required: [true, "Please add an employee email"],
    },
    surveyName: {
      type: String,
      required: [true, "Please add a survey name"],
      unique: true,
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
  },
  // employeeEmail: {
  //   type: String,
  //   required: [true, "Please add an employee email"],
  // },
  // surveyName: {
  //   type: String,
  //   required: [true, "Please add a survey name"],
  //   unique: true,
  // },
  // dailyFeeling: {
  //   type: String,
  //   min: 1,
  //   max: 5,
  //   required: [true, "Please select a rating"],
  // },
  // dailyComment: {
  //   type: String,
  //   required: false,
  // },
  // dailySentiment: {
  //   type: String,
  // },
  // dailySurveyState: {
  //   type: String,
  //   required: true,
  //   default: "pending",
  // },
  // dailySurveyDate: {
  //   type: Date,
  //   required: true,
  // },
});
exports.DailySurvey = mongoose.model("DailySurvey", dailySurveySchema);

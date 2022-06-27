const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dailySurveySchema = new Schema({
  surveyid: {
    type: String,
    unique: true,
    required: [true, "Please add an id"],
    Error: [true, "Survey Already Exists"],
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
  },
  // employeeEmail: {
  //   type: String ,
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
  //   type: String,
  //   required: true,
  // },
});
exports.DailySurvey = mongoose.model("DailySurvey", dailySurveySchema);

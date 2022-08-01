"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var MonthlySurveySchema = new Schema({
  surveyid: {
    type: String,
    unique: true,
    required: [false, "Please add an id"],
    Error: [true, "Survey Already Exists"]
  },
  employeeEmail: {
    type: String
  },
  surveyName: {
    type: String
  },
  surveyType: {
    type: String // enum: ["Monthly Survey", "dailySurvey"],

  },
  createdDate: {
    type: String
  },
  surveyStatus: {
    type: String // enum: ["completed", "incompleted", "expired"],

  },
  surveyOpened: {
    type: Boolean,
    required: false
  },
  monthlySurvey: {
    answers: {
      answer1: {
        type: String,
        // enum: [
        //   "1", "2", "3", "4", "5", "6", "7"
        // ],
        required: [false, "Please answer the 1st question"]
      },
      answer2: {
        type: String,
        // enum: [
        //   "1", "2", "3", "4", "5", "6", "7"
        // ],
        required: [false, "Please answer the 2d question"]
      },
      answer3: {
        type: String,
        // enum: [
        //   "1", "2", "3", "4", "5", "6", "7"
        // ],
        required: [false, "Please answer the 3th question"]
      },
      answer4: {
        type: String,
        // enum: [
        //   "1", "2", "3", "4", "5", "6", "7"
        // ],
        required: [false, "Please answer the 4th question"]
      },
      answer5: {
        type: String,
        // enum: [
        //   "1", "2", "3", "4", "5", "6", "7"
        // ],
        required: [false, "Please answer the 5th question"]
      },
      answer6: {
        type: String,
        // enum: [
        //   "1", "2", "3", "4", "5", "6", "7"
        // ],
        required: [false, "Please answer the 6th question"]
      },
      answer7: {
        type: String,
        // enum: [
        //   "1", "2", "3", "4", "5", "6", "7"
        // ],
        required: [false, "Please answer the 7th question"]
      },
      answer7a: {
        type: String,
        // minlength: 1,
        maxlength: 60,
        required: [false, "Please answer the 7ath question"]
      }
    }
  },
  monthlyFeeling: {
    type: String,
    required: [false, "Please add a monthly feeling"]
  },
  monthlySentiment: {
    type: String,
    required: [false, "Please add a monthly Sentiment Score"]
  },
  monthlyTotalRating: {
    type: Number,
    required: [false, "Please add a daily total rating"]
  }
});
exports.MonthlySurvey = mongoose.model("MonthlySurvey", MonthlySurveySchema);
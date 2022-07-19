const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MonthlySurveyEmptySchema = new Schema({
  surveyid: {
    type: String,
    unique: true,
    required: [true, "Please add an id"],
    Error: [true, "Survey Already Exists"],
  },
  employeeEmail: {
    type: String,
    required: [false],
  },
  surveyType: {
    type: String,
    required: [false],
  },
  createdDate: {
    type: String,
    required: [false],
  },
  surveyStatus: {
    type: String,
    required: [false],
  },
  surveyOpened: {
    type: String,
    required: [false],
  },
  monthlySurvey: {
    answers: {
            answer1: {
                type: String,
                
            },
            answer2: {
                type: String,
            },
            answer3: {
                type: String,
            },
            answer4: {
                type: String,
            },
            answer5: {
                type: String,
            },
            answer6: {
                type: String,
            },
            answer7: {
                type: String,
            },
            answer7a: {
                type: String,
            },
    },
  },
  monthlyFeeling: {
      type: String,
  },
  monthlySentiment: {
      type: String,
  },
  monthlyTotalRating: {
      type: Number,
  },
});

exports.MonthlySurveyEmpty = mongoose.model("MonthlySurveyEmpty", MonthlySurveyEmptySchema);

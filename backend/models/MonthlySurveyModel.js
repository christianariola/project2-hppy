const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MonthlySurveySchema = new Schema({
  surveyid: {
    type: String,
    unique: true,
    required: [true, "Please add an id"],
    Error: [true, "Survey Already Exists"],
  },
  employeeEmail: {
    type: String,
  },
  surveyName: {
    type: String,
  },
  surveyType: {
    type: String,
    enum: ["monthlySurvey", "dailySurvey"],
  },
  createdDate: {
    type: String
  },
  surveyStatus: {
    type: String,
    enum: ["compleated", "incompleated", "expired"],
  },
  surveyOpened: {
    type: String,
    enum: ["visited", "non-visited"],
  },
  monthlySurvey: {
    answers: {
      answer1: {
        type: String,
        enum: [
          "1", "2", "3", "4", "5", "6", "7"
        ],
        required: [true, "Please answer the 1st question"],
      },
      answer2: {
        type: String,
        enum: [
          "1", "2", "3", "4", "5", "6", "7"
        ],
        required: [true, "Please answer the 2d question"],
      },
      answer3: {
        type: String,
        enum: [
          "1", "2", "3", "4", "5", "6", "7"
        ],
        required: [true, "Please answer the 3th question"],
      },
      answer4: {
        type: String,
        enum: [
          "1", "2", "3", "4", "5", "6", "7"
        ],
        required: [true, "Please answer the 4th question"],
      },
      answer5: {
        type: String,
        enum: [
          "1", "2", "3", "4", "5", "6", "7"
        ],
        required: [true, "Please answer the 5th question"],
      },
      answer6: {
        type: String,
        enum: [
          "1", "2", "3", "4", "5", "6", "7"
        ],
        required: [true, "Please answer the 6th question"],
      },
      answer7: {
        type: String,
        enum: [
          "1", "2", "3", "4", "5", "6", "7"
        ],
        required: [true, "Please answer the 7th question"],
      },
      answer7a: {
        type: String,
        minlength: 1,
        maxlength: 60,
        required: true,
        required: [true, "Please answer the 7ath question"],
      },
    },
    },
    monthlyFeeling: {
      type: String,
      required: [true, "Please add a monthly feeling"],
    },
    monthlySentiment: {
      type: String,
      required: [true, "Please add a monthly Sentiment Score"],
    },
    monthlyTotalRating: {
      type: Number,
      required: [true, "Please add a daily total rating"],
    },
});

exports.MonthlySurvey = mongoose.model("MonthlySurvey", MonthlySurveySchema);

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
  surveyType: {
    type: String,
    enum: ["monthlySurvey", "dailySurvey"],
  },
  createdDate: {
    type: String,
  },
  monthlySurvey: {
    answers: {
      answer1: {
        type: String,
        enum: [
          "Congue praesent ac odio",
          "Congue praesent ac turo",
          "Congue  ac odio grnds",
        ],
        required: [true, "Please answer the question"],
      },
      answer2: {
        type: String,
        minlength: 1,
        maxlength: 60,
        required: true,
        required: [true, "Please answer the question"],
      },
      answer3: {
        type: String,
        enum: [
          "Bibendum vivamus ut lacinia auctor",
          "Congue bibendum vivamu ac turo",
          "Ac odio bibendum",
        ],
        required: [true, "Please answer the question"],
      },
      answer4: {
        type: String,
        enum: [
          "Bibendum vivamus ut lacinia auctor",
          "Bibendum vivamus ut lacinia head",
          "Bibendum vivamus ut lacinia employer",
          "Bibendum vivamus ut lacinia footer",
        ],
        required: [true, "Please answer the question"],
      },
    },
    questions: {
      question1: {
        type: String,
      },
      question2: {
        type: String,
      },
      question3: {
        type: String,
      },
      question4: {
        type: String,
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
  },
});

exports.MonthlySurvey = mongoose.model("MonthlySurvey", MonthlySurveySchema);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WeeklySurveySchema = new Schema({
    surveyid: {
        type: String,
        unique: true,
        required: [true, "Please add an id"],
        Error: [true, "Survey Already Exists"],
    },
    a1: {
        type: [{ type: String }],
        enum: ['Congue praesent ac odio',
            'Congue praesent ac turo',
            'Congue  ac odio grnds'],
        required: [true, "Please answer the question"]
    },
    a2: {
        type: String,
        minlength: 1,
        maxlength: 60,
        required: true,
        required: [true, "Please answer the question"]
    },
    a3: {
        type: [{ type: String }],
        enum: ['Bibendum vivamus ut lacinia auctor',
            'Congue bibendum vivamu ac turo',
            'Ac odio bibendum'],
        required: [true, "Please answer the question"]
    },
    a4: {
        type: [{ type: String }],
        enum: ['Bibendum vivamus ut lacinia auctor',
            'Bibendum vivamus ut lacinia head',
            'Bibendum vivamus ut lacinia employer',
            'Bibendum vivamus ut lacinia footer'],
        required: [true, "Please answer the question"]
    }

});

module.weeklySurveys = mongoose.model('WeeklySurveys', WeeklySurveySchema);
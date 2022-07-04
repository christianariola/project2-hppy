const mongoose = require('mongoose')

const WeeklySurveyScheme = mongoose.Schema({
    a1: {
        type: [{ type: String }],
        enum: ['Congue praesent ac odio',
            'Congue praesent ac turo',
            'Congue  ac odio grnds']
    },
    a2: {
        type: String,
        minlength: 1,
        maxlength: 60,
        required: true
    },
    a3: {
        type: [{ type: String }],
        enum: ['Bibendum vivamus ut lacinia auctor',
            'Congue bibendum vivamu ac turo',
            'Ac odio bibendum']
    },
    a4: {
        type: [{ type: String }],
        enum: ['Bibendum vivamus ut lacinia auctor',
            'Bibendum vivamus ut lacinia head',
            'Bibendum vivamus ut lacinia employer',
            'Bibendum vivamus ut lacinia footer']
    }

});

module.exports = mongoose.model('WeeklySurvey', WeeklySurveyScheme)
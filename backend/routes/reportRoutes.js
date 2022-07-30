const express = require('express')
const router = express.Router()
const { 
    getReportByDate,
} = require('../controllers/reportController')

router.get('reportchart/:type/:surveyDate', getReportByDate)

module.exports = router
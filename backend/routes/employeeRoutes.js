const express = require('express')
const router = express.Router()
const { 
    registerEmployee, 
    loginEmployee, 
    getMe,
} = require('../controllers/employeeController')

const { submitSurvey } = require("../controllers/surveyController");
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerEmployee)
router.post('/login', loginEmployee)
router.get('/me', protect, getMe)


router.post("/dailysurvey", submitSurvey);

module.exports = router
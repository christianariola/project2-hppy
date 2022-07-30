const express = require('express')
const router = express.Router()
const { 
    registerEmployee, 
    loginEmployee, 
    getMe,
    changePassword,
} = require('../controllers/employeeController')

const { submitSurvey } = require("../controllers/surveyController");
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerEmployee)
router.post('/login', loginEmployee)
router.get('/me', protect, getMe)
router.post('/changePassword', changePassword)

module.exports = router
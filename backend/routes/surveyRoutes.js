const express = require('express')
const router = express.Router()
const { 
    registerEmployee, 
    loginEmployee, 
    getMe,
} = require('../controllers/employeeController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', registerEmployee)

module.exports = router
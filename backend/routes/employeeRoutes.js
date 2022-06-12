const express = require('express')
const router = express.Router()
const { 
    registerEmployee, 
    loginEmployee, 
    getMe,
} = require('../controllers/employeeController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', registerEmployee)
router.post('/login', loginEmployee)
router.get('/me', protect, getMe)

module.exports = router
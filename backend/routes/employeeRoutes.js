const express = require('express')
const router = express.Router()
const { registerEmployee, loginEmployee } = require('../controllers/employeeController')

router.post('/', registerEmployee)

router.post('/login', loginEmployee)

module.exports = router
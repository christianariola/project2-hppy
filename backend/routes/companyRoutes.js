const express = require('express')
const router = express.Router()
const { 
    addCompany,
} = require('../controllers/companyController')

router.post('/add', addCompany)

module.exports = router
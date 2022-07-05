const express = require('express')
const router = express.Router()
const { 
    addCompany,
    getCompanyList,
} = require('../controllers/companyController')

router.post('/add', addCompany)
router.get('/list', getCompanyList)

module.exports = router
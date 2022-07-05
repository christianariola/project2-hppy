const express = require('express')
const router = express.Router()
const { 
    addCompany,
    getCompanyList,
    getCompany,
} = require('../controllers/companyController')

router.post('/add', addCompany)
router.get('/list', getCompanyList)
router.get('/view/:companyId', getCompany)

module.exports = router
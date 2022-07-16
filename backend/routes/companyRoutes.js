const express = require('express')
const router = express.Router()
const { 
    addCompany,
    getCompanyList,
    getCompany,
    deleteCompany,
} = require('../controllers/companyController')

router.post('/add', addCompany)
router.get('/list', getCompanyList)
router.get('/view/:companyId', getCompany)
router.get('/delete/:companyId', deleteCompany)

module.exports = router
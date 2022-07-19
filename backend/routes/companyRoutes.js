const express = require('express')
const router = express.Router()
const { 
    addCompany,
    getCompanyList,
    getCompany,
    editCompany,
    deleteCompany,
} = require('../controllers/companyController')

router.post('/add', addCompany)
router.get('/list', getCompanyList)
router.get('/view/:companyId', getCompany)
router.patch('/edit/:companyId', editCompany)
router.delete('/delete/:companyId', deleteCompany)

module.exports = router
const express = require('express')
const router = express.Router()
const { 
    addCompany,
    getCompanyList,
    getCompany,
    editCompany,
    deleteCompany,
    employeeByCompany,
    deleteEmployee,
    editEmployee,
} = require('../controllers/companyController')

router.post('/add', addCompany)
router.get('/list', getCompanyList)
router.get('/view/:companyId', getCompany)
router.patch('/edit/:companyId', editCompany)
router.delete('/delete/:companyId', deleteCompany)
router.get('/employee/:empId', employeeByCompany)
router.patch('/employee/:empId', editEmployee)
router.delete('/employee/:empId/:compempId', deleteEmployee)

module.exports = router
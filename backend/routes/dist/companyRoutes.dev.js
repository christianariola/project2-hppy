"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/companyController'),
    addCompany = _require.addCompany,
    getCompanyList = _require.getCompanyList,
    getCompany = _require.getCompany,
    editCompany = _require.editCompany,
    deleteCompany = _require.deleteCompany,
    employeeByCompany = _require.employeeByCompany,
    deleteEmployee = _require.deleteEmployee,
    editEmployee = _require.editEmployee,
    getEmployeeByCompany = _require.getEmployeeByCompany;

router.post('/add', addCompany);
router.get('/list', getCompanyList);
router.get('/view/:companyId', getCompany);
router.patch('/edit/:companyId', editCompany);
router["delete"]('/delete/:companyId', deleteCompany);
router.get('/employee/:empId', employeeByCompany);
router.patch('/employee/:empId', editEmployee);
router["delete"]('/employee/:empId/:compempId', deleteEmployee);
router.get('/employeelist/:companyId', getEmployeeByCompany);
module.exports = router;
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
    deleteEmployee = _require.deleteEmployee;

router.post('/add', addCompany);
router.get('/list', getCompanyList);
router.get('/view/:companyId', getCompany);
router.patch('/edit/:companyId', editCompany);
router["delete"]('/delete/:companyId', deleteCompany);
router.get('/employee/:empId', employeeByCompany);
router["delete"]('/employee/:companyId/:deptId/:empId/:compempId', deleteEmployee);
module.exports = router;
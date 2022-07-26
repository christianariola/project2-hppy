"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/employeeController'),
    registerEmployee = _require.registerEmployee,
    loginEmployee = _require.loginEmployee,
    getMe = _require.getMe,
    getAllEmployees = _require.getAllEmployees;

var _require2 = require("../controllers/surveyController"),
    submitSurvey = _require2.submitSurvey;

var _require3 = require('../middleware/authMiddleware'),
    protect = _require3.protect;

router.post('/', registerEmployee);
router.post('/login', loginEmployee);
router.get('/me', protect, getMe);
router.get('/getEmployeeAll', getAllEmployees);
module.exports = router;
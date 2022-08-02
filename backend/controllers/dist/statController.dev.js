"use strict";

var asyncHandler = require('express-async-handler');

var _require = require('mongoose'),
    mongoose = _require["default"];

var Company = require('../models/companyModel');

var Employee = require('../models/employeeModel');

var DailySurvey = require("../models/dailySurveyModel");

var MonthlySurvey = require("../models/MonthlySurveyModel");

var getDashboardStats = asyncHandler(function _callee(req, res) {
  var companies, employees, daily, monthly, totalSurveys;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Company.count({}));

        case 2:
          companies = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(Employee.count({}));

        case 5:
          employees = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(DailySurvey.DailySurvey.count({}));

        case 8:
          daily = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(MonthlySurvey.MonthlySurvey.count({}));

        case 11:
          monthly = _context.sent;
          totalSurveys = daily + monthly;
          res.status(201).json({
            companies: companies,
            employees: employees,
            totalSurveys: totalSurveys
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = {
  getDashboardStats: getDashboardStats
};
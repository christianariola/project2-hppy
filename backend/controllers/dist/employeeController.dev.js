"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var asyncHandler = require('express-async-handler'); // password encryption


var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var Employee = require('../models/employeeModel'); // @desc   Register a new user
// @route  /api/employees
// @access Public


var registerEmployee = asyncHandler(function _callee(req, res) {
  var _req$body, company_id, company_name, department_id, department_name, firstName, lastName, email, role, jobTitle, password, employeeExist, salt, hashedPassword, employee;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, company_id = _req$body.company_id, company_name = _req$body.company_name, department_id = _req$body.department_id, department_name = _req$body.department_name, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, role = _req$body.role, jobTitle = _req$body.jobTitle, password = _req$body.password;
          console.log(req.body); //Validation

          if (!(!firstName || !lastName || !email || !password)) {
            _context.next = 5;
            break;
          }

          res.status(400);
          throw new Error('Please include all fields');

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(Employee.findOne({
            email: email
          }));

        case 7:
          employeeExist = _context.sent;

          if (!employeeExist) {
            _context.next = 11;
            break;
          }

          res.status(400);
          throw new Error('User already exists');

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 13:
          salt = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 16:
          hashedPassword = _context.sent;
          _context.next = 19;
          return regeneratorRuntime.awrap(Employee.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role.toLowerCase(),
            jobTitle: jobTitle,
            password: hashedPassword,
            company_id: company_id,
            company_name: company_name,
            department_id: department_id,
            department_name: department_name
          }));

        case 19:
          employee = _context.sent;

          if (!employee) {
            _context.next = 24;
            break;
          }

          res.status(201).json({
            _id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            role: employee.role,
            job_title: employee.jobTitle,
            company_id: employee.company_id,
            company_name: employee.company_name,
            department_id: employee.department_id,
            department_name: employee.department_name,
            token: generateToken(employee._id)
          });
          _context.next = 26;
          break;

        case 24:
          res.status(400);
          throw new Error('Invalid user data');

        case 26:
        case "end":
          return _context.stop();
      }
    }
  });
}); // @desc   Login a new user
// @route  /api/employees/login
// @access Public

var loginEmployee = asyncHandler(function _callee2(req, res) {
  var _req$body2, email, password, employee, _res$status$json;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Employee.findOne({
            email: email
          }));

        case 3:
          employee = _context2.sent;
          _context2.t0 = employee;

          if (!_context2.t0) {
            _context2.next = 9;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(password, employee.password));

        case 8:
          _context2.t0 = _context2.sent;

        case 9:
          if (!_context2.t0) {
            _context2.next = 13;
            break;
          }

          res.status(201).json((_res$status$json = {
            _id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            role: employee.role,
            job_title: employee.jobTitle
          }, _defineProperty(_res$status$json, "role", employee.role), _defineProperty(_res$status$json, "company_id", employee.company_id), _defineProperty(_res$status$json, "company_name", employee.company_name), _defineProperty(_res$status$json, "department_id", employee.department_id), _defineProperty(_res$status$json, "department_name", employee.department_name), _defineProperty(_res$status$json, "token", generateToken(employee._id)), _res$status$json));
          _context2.next = 15;
          break;

        case 13:
          res.status(401);
          throw new Error('Invalid credentials');

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // @desc   get current emploee
// @route  /api/employees/me
// @access Private

var getMe = asyncHandler(function _callee3(req, res) {
  var employee;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          employee = {
            id: req.employee._id,
            email: req.employee.email,
            firstName: req.employee.firstName,
            lastName: req.employee.lastName
          };
          res.status(200).json(employee);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // Generate Token

var generateToken = function generateToken(id) {
  return jwt.sign({
    id: id
  }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
}; //@desc get all employees


var getAllEmployees = asyncHandler(function _callee4(req, res) {
  var employeeAll;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          employeeAll = {
            id: req.employee._id,
            email: req.employee.email,
            company_name: req.employee.company_name,
            company_id: req.employee.company_id
          };
          res.status(200).json(employeeAll);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
});
module.exports = {
  registerEmployee: registerEmployee,
  loginEmployee: loginEmployee,
  getMe: getMe,
  getAllEmployees: getAllEmployees
};
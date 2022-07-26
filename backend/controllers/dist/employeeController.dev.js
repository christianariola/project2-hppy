"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var asyncHandler = require('express-async-handler'); // password encryption


var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var Employee = require('../models/employeeModel');

var Company = require('../models/companyModel');

var cloudinary = require("../cloudinary/cloudinary"); // @desc   Register a new user
// @route  /api/employees
// @access Public


var registerEmployee = asyncHandler(function _callee(req, res) {
  var _req$body, company_id, company_name, department_id, department_name, employeeNumber, firstName, lastName, email, role, jobTitle, password, employeeExist, salt, hashedPassword, employee, empData, company;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, company_id = _req$body.company_id, company_name = _req$body.company_name, department_id = _req$body.department_id, department_name = _req$body.department_name, employeeNumber = _req$body.employeeNumber, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, role = _req$body.role, jobTitle = _req$body.jobTitle, password = _req$body.password; // console.log(req.body)
          //Validation

          if (!(!firstName || !lastName || !email || !password)) {
            _context.next = 4;
            break;
          }

          res.status(400);
          throw new Error('Please include all fields');

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(Employee.findOne({
            email: email
          }));

        case 6:
          employeeExist = _context.sent;

          if (!employeeExist) {
            _context.next = 10;
            break;
          }

          res.status(400);
          throw new Error('User already exists');

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 12:
          salt = _context.sent;
          _context.next = 15;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 15:
          hashedPassword = _context.sent;
          _context.next = 18;
          return regeneratorRuntime.awrap(Employee.create({
            employeeNumber: employeeNumber,
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

        case 18:
          employee = _context.sent;
          empData = [];

          if (role == 'Manager') {
            empData = {
              employee_id: employee._id,
              employeeNumber: employeeNumber,
              firstName: firstName,
              lastName: lastName,
              email: email,
              jobTitle: jobTitle,
              isManager: true
            };
          } else {
            empData = {
              employee_id: employee._id,
              employeeNumber: employeeNumber,
              firstName: firstName,
              lastName: lastName,
              email: email,
              jobTitle: jobTitle
            };
          } // const company = Company.findOne({"departments._id": department_id}).then(doc => {
          //     item = doc.departments.id(department_id);
          //     console.log(item)
          //     item["employees"] = "new name";
          //     // item["value"] = "new value";
          //     doc.save();
          // //sent respnse to client
          // }).catch(err => {
          // console.log('Oh! Dark', err)
          // });
          // Insert employee data to company document


          company = Company.updateOne({
            "_id": company_id,
            "departments._id": department_id
          }, {
            $push: {
              "departments.$[departments].employees": empData
            }
          }, {
            arrayFilters: [{
              "departments._id": department_id
            }]
          }, function (err, success) {
            if (err) {
              console.log("Unsuccessful", err);
            } else {
              console.log("Successful", success);
            }
          });

          if (!employee) {
            _context.next = 26;
            break;
          }

          res.status(201).json({
            _id: employee._id,
            employeeNumber: employee.employeeNumber,
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
          _context.next = 28;
          break;

        case 26:
          res.status(400);
          throw new Error('Invalid user data');

        case 28:
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
            employeeNumber: employee.employeeNumber,
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
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var asyncHandler = require('express-async-handler');

var jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');

var _require = require('mongoose'),
    mongoose = _require["default"];

var cloudinary = require("../cloudinary/cloudinary");

var Company = require('../models/companyModel');

var Employee = require('../models/employeeModel');

var generateString = function generateString(length) {
  var res = '';
  var availableChars = 'abcdefghijklmnopqrstuvwxyz';
  var numAvalailableChars = availableChars.length;

  for (var i = 0; i < length; i++) {
    res += availableChars.charAt(Math.floor(Math.random() * numAvalailableChars));
  }

  return res;
}; // @desc   Register a new company
// @route  /api/companies
// @access Public


var addCompany = asyncHandler(function _callee(req, res) {
  var _req$body, name, description, logo, departments, filename, randomName, result, company;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, description = _req$body.description, logo = _req$body.logo, departments = _req$body.departments;
          filename = name.trim().toLowerCase();
          randomName = generateString(8);
          _context.next = 5;
          return regeneratorRuntime.awrap(cloudinary.uploader.upload(logo, {
            upload_preset: 'unsigned_uploads',
            public_id: "".concat(filename, "-").concat(randomName),
            allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
            width: 300,
            crop: "scale"
          }));

        case 5:
          result = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(Company.create({
            name: name,
            description: description,
            logo: {
              public_id: result.public_id,
              url: result.secure_url
            },
            departments: departments
          }));

        case 8:
          company = _context.sent;

          if (!company) {
            _context.next = 13;
            break;
          }

          res.status(201).json({
            _id: company._id,
            name: company.name,
            description: company.description,
            logo: company.logo.public_id,
            logo_url: company.logo.url
          });
          _context.next = 15;
          break;

        case 13:
          res.status(400);
          throw new Error('Invalid user data');

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
});
var getCompanyList = asyncHandler(function _callee2(req, res) {
  var companies;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Company.find({}));

        case 2:
          companies = _context2.sent;

          if (!companies) {
            _context2.next = 7;
            break;
          }

          res.status(201).json({
            data: companies
          });
          _context2.next = 9;
          break;

        case 7:
          res.status(400);
          throw new Error('Something went wrong...');

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var getCompany = asyncHandler(function _callee3(req, res) {
  var company;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Company.findOne({
            _id: req.params.companyId
          }));

        case 2:
          company = _context3.sent;

          if (!company) {
            _context3.next = 7;
            break;
          }

          res.status(201).json({
            _id: company._id,
            name: company.name,
            description: company.description,
            logo: company.logo,
            departments: company.departments
          });
          _context3.next = 9;
          break;

        case 7:
          res.status(401);
          throw new Error('No data found');

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var editCompany = asyncHandler(function _callee4(req, res) {
  var id, _req$body2, name, description, logo, newDeptArr, removeOldArr, deptEmployees, filename, randomName, result, updatedCompany, company, _updatedCompany, _company;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.companyId;
          _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description, logo = _req$body2.logo, newDeptArr = _req$body2.newDeptArr, removeOldArr = _req$body2.removeOldArr; // console.log(req.body)

          if (mongoose.Types.ObjectId.isValid(id)) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "No company exist with id ".concat(id)
          }));

        case 4:
          // query company departments with employees
          deptEmployees = Company.findOne({
            "_id": id
          }).then(function (doc) {
            // console.log(departments)
            item = doc.departments;
            var deptDoc = item.filter(function (ar) {
              return !removeOldArr.find(function (rm) {
                return rm.deptName === ar.deptName;
              });
            });
            var empInsert = [].concat(_toConsumableArray(deptDoc), _toConsumableArray(newDeptArr));
            doc["departments"] = empInsert; // console.log(doc["departments"])

            doc.save(); //sent respnse to client
          })["catch"](function (err) {
            console.log('Oh! Dark', err);
          });

          if (!logo) {
            _context4.next = 24;
            break;
          }

          filename = name.split(" ").join("").trim().toLowerCase();
          randomName = generateString(16);
          _context4.next = 10;
          return regeneratorRuntime.awrap(cloudinary.uploader.upload(logo, {
            upload_preset: 'unsigned_uploads',
            public_id: "".concat(randomName),
            allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
            width: 300,
            crop: "scale"
          }));

        case 10:
          result = _context4.sent;
          console.log(result);
          updatedCompany = {
            name: name,
            description: description,
            logo: {
              public_id: result.public_id,
              url: result.secure_url
            },
            // departments,
            _id: id
          };
          _context4.next = 15;
          return regeneratorRuntime.awrap(Company.findByIdAndUpdate(id, updatedCompany, function (err, success) {
            if (err) {
              console.log("Unsuccessful", err);
            } else {
              console.log("Successful", success);
            }
          }));

        case 15:
          company = _context4.sent;

          if (!company) {
            _context4.next = 20;
            break;
          }

          res.status(201).json(updatedCompany);
          _context4.next = 22;
          break;

        case 20:
          res.status(401);
          throw new Error('Something went wrong...');

        case 22:
          _context4.next = 34;
          break;

        case 24:
          _updatedCompany = {
            name: name,
            description: description,
            // departments,
            _id: id
          };
          _context4.next = 27;
          return regeneratorRuntime.awrap(Company.findByIdAndUpdate(id, _updatedCompany));

        case 27:
          _company = _context4.sent;

          if (!_company) {
            _context4.next = 32;
            break;
          }

          res.status(201).json(_company);
          _context4.next = 34;
          break;

        case 32:
          res.status(401);
          throw new Error('Something went wrong...');

        case 34:
        case "end":
          return _context4.stop();
      }
    }
  });
});
var deleteCompany = asyncHandler(function _callee5(req, res) {
  var id, company;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.companyId;

          if (mongoose.Types.ObjectId.isValid(id)) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: "No company exist with id ".concat(id)
          }));

        case 3:
          _context5.next = 5;
          return regeneratorRuntime.awrap(Company.findByIdAndRemove(id));

        case 5:
          company = _context5.sent;

          if (!company) {
            _context5.next = 10;
            break;
          }

          res.status(201).json({
            message: "Company deleted successfully"
          });
          _context5.next = 12;
          break;

        case 10:
          res.status(401);
          throw new Error('Something went wrong...');

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  });
});
var employeeByCompany = asyncHandler(function _callee6(req, res) {
  var empId, employee, _res$status$json;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          empId = req.params.empId;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Employee.findOne({
            _id: empId
          }));

        case 3:
          employee = _context6.sent;
          console.log(employee);

          if (!empId) {
            _context6.next = 12;
            break;
          }

          if (!employee) {
            _context6.next = 10;
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
          }, _defineProperty(_res$status$json, "role", employee.role), _defineProperty(_res$status$json, "company_id", employee.company_id), _defineProperty(_res$status$json, "company_name", employee.company_name), _defineProperty(_res$status$json, "department_id", employee.department_id), _defineProperty(_res$status$json, "department_name", employee.department_name), _res$status$json));
          _context6.next = 12;
          break;

        case 10:
          res.status(401);
          throw new Error('No data found');

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  });
});
var deleteEmployee = asyncHandler(function _callee7(req, res) {
  var _req$params, empId, compempId, employee, company, newcompany;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _req$params = req.params, empId = _req$params.empId, compempId = _req$params.compempId;
          console.log(empId);
          console.log(compempId);
          _context7.prev = 3;
          _context7.next = 6;
          return regeneratorRuntime.awrap(Employee.findByIdAndRemove(empId));

        case 6:
          employee = _context7.sent;
          // Remove on company collection
          company = Company.updateOne({
            'departments.employees._id': compempId
          }, {
            $pull: {
              'departments.$.employees': {
                '_id': compempId
              }
            }
          }, {
            multi: true
          }, function (err, success) {
            if (err) {
              console.log("Unsuccessful", err);
            } else {
              console.log("Successful", success);
            }
          });
          _context7.next = 10;
          return regeneratorRuntime.awrap(Company.findOne({
            'departments.employees._id': compempId
          }));

        case 10:
          newcompany = _context7.sent;

          if (!newcompany) {
            _context7.next = 15;
            break;
          }

          res.status(201).json({
            _id: company._id,
            name: company.name,
            description: company.description,
            logo: company.logo,
            departments: company.departments
          });
          _context7.next = 17;
          break;

        case 15:
          res.status(401);
          throw new Error('No data found');

        case 17:
          _context7.next = 22;
          break;

        case 19:
          _context7.prev = 19;
          _context7.t0 = _context7["catch"](3);
          console.log(_context7.t0);

        case 22:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[3, 19]]);
});
var editEmployee = asyncHandler(function _callee8(req, res) {
  var empId, _req$body3, department_id, department_name, employeeNumber, firstName, lastName, email, role, jobTitle, password, empData, company, employeeData, salt, hashedPassword, employee;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          empId = req.params.empId;
          _req$body3 = req.body, department_id = _req$body3.department_id, department_name = _req$body3.department_name, employeeNumber = _req$body3.employeeNumber, firstName = _req$body3.firstName, lastName = _req$body3.lastName, email = _req$body3.email, role = _req$body3.role, jobTitle = _req$body3.jobTitle, password = _req$body3.password; // updating company collection nested document

          empData = [];

          if (role == 'manager') {
            empData = {
              employee_id: empId,
              employeeNumber: employeeNumber,
              firstName: firstName,
              lastName: lastName,
              email: email,
              jobTitle: jobTitle,
              isManager: true
            };
          } else if (role == 'admin') {
            empData = {
              employee_id: empId,
              employeeNumber: employeeNumber,
              firstName: firstName,
              lastName: lastName,
              email: email,
              jobTitle: jobTitle,
              isAdmin: true
            };
          } else {
            empData = {
              employee_id: empId,
              employeeNumber: employeeNumber,
              firstName: firstName,
              lastName: lastName,
              email: email,
              jobTitle: jobTitle
            };
          }

          company = Company.findOne({
            "departments._id": department_id
          }).then(function (doc) {
            item = doc.departments.id(department_id); // console.log(item.employees)

            var employeeDoc = item.employees.filter(function (employees) {
              return employees.email !== email;
            });
            var empInsert = [].concat(_toConsumableArray(employeeDoc), [empData]); // console.log(empInsert)

            item["employees"] = empInsert;
            doc.save(); //sent respnse to client
          })["catch"](function (err) {
            console.log('Oh! Dark', err);
          });

          if (!password) {
            _context8.next = 15;
            break;
          }

          _context8.next = 8;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 8:
          salt = _context8.sent;
          _context8.next = 11;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 11:
          hashedPassword = _context8.sent;
          employeeData = {
            employeeNumber: employeeNumber,
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role.toLowerCase(),
            jobTitle: jobTitle,
            password: hashedPassword,
            department_id: department_id,
            department_name: department_name
          };
          _context8.next = 16;
          break;

        case 15:
          employeeData = {
            employeeNumber: employeeNumber,
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role.toLowerCase(),
            jobTitle: jobTitle,
            department_id: department_id,
            department_name: department_name
          };

        case 16:
          employee = Employee.findByIdAndUpdate(empId, employeeData, function (err, success) {
            if (err) {// console.log("Unsuccessful", err)
            } else {// console.log("Successful", success)
              }
          });

          if (!(employee && company)) {
            _context8.next = 21;
            break;
          }

          res.status(201).json({
            message: "Success"
          });
          _context8.next = 23;
          break;

        case 21:
          res.status(400);
          throw new Error('Invalid user data');

        case 23:
        case "end":
          return _context8.stop();
      }
    }
  });
});
var getEmployeeByCompany = asyncHandler(function _callee9(req, res) {
  var employee;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          console.log(req.params.companyId); // const employee = Employee.find({ company_id: req.params.companyId }, (err, success) => {
          //     if(err){
          //         console.log("Unsuccessful", err)
          //     } else {
          //         console.log("Successful", success)
          //     }
          // })   

          _context9.next = 3;
          return regeneratorRuntime.awrap(Employee.find({
            company_id: req.params.companyId
          }));

        case 3:
          employee = _context9.sent;

          if (!employee) {
            _context9.next = 8;
            break;
          }

          res.status(201).json({
            data: employee
          });
          _context9.next = 10;
          break;

        case 8:
          res.status(401);
          throw new Error('No data found');

        case 10:
        case "end":
          return _context9.stop();
      }
    }
  });
});
module.exports = {
  addCompany: addCompany,
  getCompanyList: getCompanyList,
  getCompany: getCompany,
  editCompany: editCompany,
  deleteCompany: deleteCompany,
  employeeByCompany: employeeByCompany,
  deleteEmployee: deleteEmployee,
  editEmployee: editEmployee,
  getEmployeeByCompany: getEmployeeByCompany
};
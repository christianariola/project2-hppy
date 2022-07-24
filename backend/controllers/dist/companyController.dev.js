"use strict";

var asyncHandler = require('express-async-handler');

var jwt = require('jsonwebtoken');

var _require = require('mongoose'),
    mongoose = _require["default"];

var cloudinary = require("../cloudinary/cloudinary");

var Company = require('../models/companyModel');

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
          throw new Error('Invalid credentials');

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var editCompany = asyncHandler(function _callee4(req, res) {
  var id, _req$body2, name, description, logo, departments, filename, randomName, result, updatedCompany, company, _updatedCompany, _company;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.companyId;
          _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description, logo = _req$body2.logo, departments = _req$body2.departments;

          if (mongoose.Types.ObjectId.isValid(id)) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "No company exist with id ".concat(id)
          }));

        case 4:
          if (!logo) {
            _context4.next = 23;
            break;
          }

          filename = name.trim().toLowerCase();
          randomName = generateString(8);
          _context4.next = 9;
          return regeneratorRuntime.awrap(cloudinary.uploader.upload(logo, {
            upload_preset: 'unsigned_uploads',
            public_id: "".concat(filename, "-").concat(randomName),
            allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
            width: 300,
            crop: "scale"
          }));

        case 9:
          result = _context4.sent;
          console.log(result);
          updatedCompany = {
            name: name,
            description: description,
            logo: {
              public_id: result.public_id,
              url: result.secure_url
            },
            departments: departments,
            _id: id
          };
          _context4.next = 14;
          return regeneratorRuntime.awrap(Company.findByIdAndUpdate(id, updatedCompany, {
            "new": true
          }));

        case 14:
          company = _context4.sent;

          if (!company) {
            _context4.next = 19;
            break;
          }

          res.status(201).json(updatedCompany);
          _context4.next = 21;
          break;

        case 19:
          res.status(401);
          throw new Error('Something went wrong...');

        case 21:
          _context4.next = 33;
          break;

        case 23:
          _updatedCompany = {
            name: name,
            description: description,
            departments: departments,
            _id: id
          };
          _context4.next = 26;
          return regeneratorRuntime.awrap(Company.findByIdAndUpdate(id, _updatedCompany, {
            "new": true
          }));

        case 26:
          _company = _context4.sent;

          if (!_company) {
            _context4.next = 31;
            break;
          }

          res.status(201).json(_updatedCompany);
          _context4.next = 33;
          break;

        case 31:
          res.status(401);
          throw new Error('Something went wrong...');

        case 33:
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
var employeesByCompany = asyncHandler(function _callee6(req, res) {
  var companyId;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          companyId = req.params.id;
          console.log(id);

        case 2:
        case "end":
          return _context6.stop();
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
  employeesByCompany: employeesByCompany
};
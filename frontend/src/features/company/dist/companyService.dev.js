"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Local API_URL for dev
// const API_URL = '/api/companies'
var API_URL = 'https://pluto-hppy.herokuapp.com/api/companies';

var addCompany = function addCompany(companyData) {
  var response;
  return regeneratorRuntime.async(function addCompany$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post(API_URL + '/add', companyData));

        case 2:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getCompanyList = function getCompanyList() {
  var response;
  return regeneratorRuntime.async(function getCompanyList$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get(API_URL + '/list'));

        case 2:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var getCompany = function getCompany(companyId) {
  var response;
  return regeneratorRuntime.async(function getCompany$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get(API_URL + "/view/".concat(companyId)));

        case 2:
          response = _context3.sent;
          return _context3.abrupt("return", response.data);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var editCompany = function editCompany(updatedCompanyData, companyId) {
  var response;
  return regeneratorRuntime.async(function editCompany$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].patch(API_URL + "/edit/".concat(companyId), updatedCompanyData));

        case 2:
          response = _context4.sent;
          return _context4.abrupt("return", response.data);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var deleteCompany = function deleteCompany(companyId) {
  var response;
  return regeneratorRuntime.async(function deleteCompany$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_axios["default"]["delete"](API_URL + "/delete/".concat(companyId)));

        case 2:
          response = _context5.sent;
          return _context5.abrupt("return", response.data);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var getEmployee = function getEmployee(empId) {
  var response;
  return regeneratorRuntime.async(function getEmployee$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get(API_URL + "/employee/".concat(empId)));

        case 2:
          response = _context6.sent;
          return _context6.abrupt("return", response.data);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
};

var deleteEmployee = function deleteEmployee(empId, compempId) {
  var response;
  return regeneratorRuntime.async(function deleteEmployee$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(_axios["default"]["delete"](API_URL + "/employee/".concat(empId, "/").concat(compempId)));

        case 2:
          response = _context7.sent;
          return _context7.abrupt("return", response.data);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
};

var updateEmployee = function updateEmployee(updatedEmployeeData, empId) {
  var response;
  return regeneratorRuntime.async(function updateEmployee$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].patch(API_URL + "/employee/".concat(empId), updatedEmployeeData));

        case 2:
          response = _context8.sent;
          return _context8.abrupt("return", response.data);

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
};

var getEmployeeByCompany = function getEmployeeByCompany(companyId) {
  var response;
  return regeneratorRuntime.async(function getEmployeeByCompany$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get(API_URL + "/employeelist/".concat(companyId)));

        case 2:
          response = _context9.sent;
          return _context9.abrupt("return", response.data);

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
};

var companyService = {
  addCompany: addCompany,
  getCompanyList: getCompanyList,
  getCompany: getCompany,
  editCompany: editCompany,
  deleteCompany: deleteCompany,
  getEmployee: getEmployee,
  deleteEmployee: deleteEmployee,
  updateEmployee: updateEmployee,
  getEmployeeByCompany: getEmployeeByCompany
};
var _default = companyService;
exports["default"] = _default;
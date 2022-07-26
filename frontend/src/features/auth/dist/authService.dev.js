"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Local API_URL for dev
var API_URL = '/api/employees'; // const API_URL = 'https://pluto-hppy.herokuapp.com/api/employees'

var addEmployee = function addEmployee(userData) {
  var response;
  return regeneratorRuntime.async(function addEmployee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post(API_URL, userData));

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

var login = function login(userData) {
  var response;
  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post(API_URL + '/login', userData));

        case 2:
          response = _context2.sent;

          if (response.data) {
            localStorage.setItem('employee', JSON.stringify(response.data));
          }

          return _context2.abrupt("return", response.data);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // Logout employee


var logout = function logout() {
  return localStorage.removeItem('employee');
};

var changePassword = function changePassword(userData) {
  var response;
  return regeneratorRuntime.async(function changePassword$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post(API_URL + '/changePassword', userData));

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

var authService = {
  addEmployee: addEmployee,
  login: login,
  logout: logout,
  changePassword: changePassword
};
var _default = authService;
exports["default"] = _default;
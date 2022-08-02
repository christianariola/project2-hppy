"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Local API_URL for dev
// const API_URL = '/api/survey'
var API_URL = "https://pluto-hppy.herokuapp.com/api/survey";

var dailySurveyChecker = function dailySurveyChecker(userData) {
  var response;
  return regeneratorRuntime.async(function dailySurveyChecker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post(API_URL + '/dailychecker', userData));

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

var surveyService = {
  dailySurveyChecker: dailySurveyChecker
};
var _default = surveyService;
exports["default"] = _default;
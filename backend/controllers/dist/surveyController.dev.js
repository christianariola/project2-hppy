"use strict";

var asyncHandler = require("express-async-handler"); // const DailySurvey = require("../models/dailySurveyModel");


var dailySurveyChecker = asyncHandler(function _callee(req, res) {
  var _require, DailySurvey, dailySurvey, dailychecker, employeeDone;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _require = require("../models/dailySurveyModel"), DailySurvey = _require.DailySurvey;
          dailySurvey = new DailySurvey(req.body);
          console.log(req.body);
          _context.next = 5;
          return regeneratorRuntime.awrap(DailySurvey.findOne({
            surveyid: dailySurvey.surveyid
          }));

        case 5:
          dailychecker = _context.sent;

          if (dailychecker) {
            employeeDone = true;
          } else {
            employeeDone = false;
          }

          res.status(200).json({
            checker: employeeDone
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = {
  dailySurveyChecker: dailySurveyChecker
};
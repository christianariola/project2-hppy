"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controllers/surveyController"),
    dailySurveyChecker = _require.dailySurveyChecker;

router.post("/dailychecker", dailySurveyChecker);
module.exports = router;
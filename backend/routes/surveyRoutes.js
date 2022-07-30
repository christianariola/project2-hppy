const express = require("express");
const router = express.Router();

const { dailySurveyChecker } = require("../controllers/surveyController");

router.post("/dailychecker", dailySurveyChecker);
module.exports = router;

const express = require("express");
const router = express.Router();
const {
  registerEmployee,
  loginEmployee,
  getMe,
} = require("../controllers/employeeController");

const { submitSurvey } = require("../controllers/surveyController");

const { protect } = require("../middleware/authMiddleware");

router.post("/dailysurvey", submitSurvey);

module.exports = router;

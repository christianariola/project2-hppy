const express = require("express");
const router = express.Router();


const { submitSurvey,
        // surveyReport,
        
    } = require("../controllers/surveyController");

router.post("/dailysurvey", submitSurvey);

module.exports = router;

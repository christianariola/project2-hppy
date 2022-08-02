"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/statController'),
    getDashboardStats = _require.getDashboardStats;

router.get('/dashboard', getDashboardStats);
module.exports = router;
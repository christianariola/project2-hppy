const express = require('express')
const router = express.Router()
const { 
    getDashboardStats,
} = require('../controllers/statController')

router.get('/dashboard', getDashboardStats)

module.exports = router
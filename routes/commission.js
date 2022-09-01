const express = require('express')
const commissionController = require('../controllers/commission')

const router = express.Router()

router.post('/create', commissionController.createCommission)
router.get('/get/all/', commissionController.getAllCommissions)

module.exports = router;
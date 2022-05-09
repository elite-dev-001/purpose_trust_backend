const express = require('express')
const adminController = require('../controllers/admin')
const ensureToken = require('../token')


const router = express.Router();

router.post('/register', adminController.createAdmin)
router.get('/get/one/:id', ensureToken, adminController.getOneAdmin)
router.patch('/update/transactions/history/:id', adminController.approvedRequest)

module.exports = router;
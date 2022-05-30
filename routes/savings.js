const express = require('express')
const savingController = require('../controllers/savings')


const router = express.Router();

router.post('/create', savingController.createSavings)
router.get('/get/all/', savingController.getAllSavings)
router.patch('/update/status/:id', savingController.statusUpdate)

module.exports = router;
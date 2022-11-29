const express = require('express')
const cardController = require('../controllers/card')


const router = express.Router()

router.post('/create', cardController.createCard)
router.get('/get/all', cardController.getAllCards)

module.exports = router;
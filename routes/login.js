const express = require('express')
const loginController = require('../controllers/login')

const router = express.Router();

router.post('/', loginController.loginControl)

module.exports = router;
const express = require('express')
const agentController = require('../controllers/agent')
const ensureToken = require('../token')


const router = express.Router();

router.post('/register', agentController.createAgent)
router.get('/get/all', ensureToken, agentController.getAllAgent)
router.get('/get/one/:id', ensureToken, agentController.getOneAgent)
router.patch('/update/customer/:id', agentController.agentCustomers)
router.patch('/update/login/pin/:id', agentController.agentLoginPin)
router.patch('/update/history/:id', agentController.agentHistory)

module.exports = router;
const express = require('express')
const agentController = require('../controllers/agent')
const ensureToken = require('../token')
const multer = require('multer')
const upload = multer({ dest: 'uploads/'})


const router = express.Router();

router.post('/register', upload.single('picture'), agentController.createAgent)
router.get('/get/all', agentController.getAllAgent)
router.get('/get/one/:id', agentController.getOneAgent)
router.patch('/update/customer/:id', agentController.agentCustomers)
router.patch('/update/login/pin/:id', agentController.agentLoginPin)
router.patch('/update/history/:id', agentController.agentHistory)

module.exports = router;
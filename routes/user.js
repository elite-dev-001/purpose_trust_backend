const express = require('express')
const userController = require('../controllers/user')
const ensureToken = require('../token')


const router = express.Router();

router.post('/register', userController.createUser);
router.get('/get/all', ensureToken, userController.getAllUsers)
router.get('/get/one/:id', ensureToken, userController.getOneUser);
router.patch('/update/transactions/:id', userController.updateTransHistory);
router.patch('/update/deposit/pending/:id', userController.updateDepositPendingStatus)
router.patch('/update/withdraw/pending/:id', userController.updateWithdrawPendingStatus)

module.exports = router;
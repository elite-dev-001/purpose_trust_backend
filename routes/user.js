const express = require('express')
const userController = require('../controllers/user')
const ensureToken = require('../token')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


const router = express.Router();

router.post('/register', upload.single('picture'), userController.createUser);
router.get('/get/all', userController.getAllUsers)
router.get('/get/one/:id', userController.getOneUser);
router.patch('/update/transactions/:id', userController.updateTransHistory);
router.patch('/update/deposit/pending/:id', userController.updateDepositPendingStatus)
router.patch('/update/withdraw/pending/:id', userController.updateWithdrawPendingStatus)
router.patch('/update/balance/:id', userController.updateBalance)

module.exports = router;
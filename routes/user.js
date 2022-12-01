const express = require('express')
const userController = require('../controllers/user')
const ensureToken = require('../token')
const multer = require('multer')
const upload = multer({ dest: '/tmp' })


const router = express.Router();

router.post('/register', upload.single('picture'), userController.createUser);
router.get('/get/all', userController.getAllUsers)
router.get('/get/one/:id', userController.getOneUser);
router.patch('/update/transactions/:id', userController.updateTransHistory);
router.patch('/update/deposit/pending/:id', userController.updateDepositPendingStatus)
router.patch('/update/withdraw/pending/:id', userController.updateWithdrawPendingStatus)
router.patch('/update/balance/:id', userController.updateBalance)
router.patch('/update/card/payment/:id', userController.updateCardPayment)
router.patch('/update/principal/amount/:id', userController.updatePrincipalAmount)
router.patch('/update/pending/loan/:id', userController.pendingLoan)
router.patch('/update/akawo/loan/:id', userController.akawoLoanUpdate)
router.patch('/update/business/loan/:id', userController.businessLoanUpdate)
router.patch('/approve/loan/:id', userController.approveLoan)
router.patch('/decline/loan/:id', userController.declineLoan)

module.exports = router;
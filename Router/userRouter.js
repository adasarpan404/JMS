const express = require('express');
const Transaction = require('./../Controllers/transcationController')
const authController = require('./../Controllers/authController')
const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword', authController.resetPassword);



router.use(authController.protect);

router.post('/add-money-wallet', Transaction.setUserIds, Transaction.createTransactionToUser)
router.get('/get-all-transaction', Transaction.getAllTransaction)



module.exports = router;
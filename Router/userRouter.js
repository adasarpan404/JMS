const express = require('express');
const Transaction = require('./../Controllers/transcationController')
const authController = require('./../Controllers/authController')
const userController = require('./../Controllers/userController')
const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword', authController.resetPassword);
router.post('/verify', authController.verify)
router.post('/loginwithuser', authController.loginWithUser)
router.get('/resendOTP', authController.protect, authController.resendTo)

router.use(authController.protect);
router.patch(
    '/updateMe',
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateMe
);

router.post('/add-money-wallet', Transaction.setUserIds, Transaction.createTransactionToUser)
router.get('/get-all-transaction', Transaction.getAllTransaction)



module.exports = router;
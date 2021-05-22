const express = require('express')
const authController = require('./../controllers/authController')
const userController = require('./../controllers/userController')
const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword', authController.resetPassword);
router.post('/verify', authController.verify);
router.post('/resendOTP', authController.protect, authController.resendTo)

router.use(authController.protect);

router.patch('/updateMe', userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateMe);

module.exports = router;
const express = require('express')
const viewController = require('../Controllers/viewController')
const authController = require('../Controllers/authController')
const maidAuthController = require('../Controllers/maidAuthController')
const router = express.Router();
router.get('/', authController.isLoggedIn, maidAuthController.isLoggedIn, viewController.getStart);
router.get('/login', viewController.getLoginPage);
router.get('/signup', viewController.getsignupPage);
router.get('/maid-login', viewController.getMaidLoginPage);
router.get('/maid-signup', viewController.getMaidSignUpPage);
router.get('/overview', authController.protect, viewController.getoverview);
router.get('/maidOverview', maidAuthController.protect, viewController.getMaidOverview);
router.get('/updateInformation', maidAuthController.protect, viewController.getUpdatePersonalInformation);
router.get('/contactInformation', maidAuthController.protect, viewController.getUpdateContactInformation);
router.get('/forgotPassword', viewController.getForgetPassword);
router.get('/resetPassword', viewController.getResetPassword);
router.get('/forgotMaidPassword', viewController.getForgotMaidPassword);
router.get('/resetMaidPassword', viewController.getResetMaidPassword);
router.get('/verifyOTP', authController.protect, viewController.getVerifyOTP)
router.get('/verifyMaid', maidAuthController.protect, viewController.getVerifyMaidOTP)
module.exports = router;
const express = require('express')
const viewController = require('../Controllers/viewController')
const authController = require('../Controllers/authController')
const maidAuthController = require('../Controllers/maidAuthController')
const router = express.Router();
const path = require('path')
router.use(function (req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src-elm 'self' https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js");
    next();
});
router.get('/', authController.isLoggedIn, maidAuthController.isLoggedIn, viewController.getStart);
router.get('/login', viewController.getLoginPage);
router.get('/signup', viewController.getsignupPage);
router.get('/maid-login', viewController.getMaidLoginPage);
router.get('/maid-signup', viewController.getMaidSignUpPage);
router.get('/overview', authController.protect, viewController.getMaid);
router.get('/maidOverview', maidAuthController.protect, viewController.getMaidOverview);
router.get('/updateInformation', maidAuthController.protect, viewController.getUpdatePersonalInformation);
router.get('/contactInformation', maidAuthController.protect, viewController.getUpdateContactInformation);
router.get('/maid/:maidId', authController.protect, viewController.getOneMaid)
router.get('/forgotPassword', viewController.getForgetPassword);
router.get('/resetPassword', viewController.getResetPassword);
router.get('/forgotMaidPassword', viewController.getForgotMaidPassword);
router.get('/resetMaidPassword', viewController.getResetMaidPassword);
router.get('/verifyOTP', authController.protect, viewController.getVerifyOTP)
router.get('/verifyMaid', maidAuthController.protect, viewController.getVerifyMaidOTP)
module.exports = router;
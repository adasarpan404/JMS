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
router.get('/maidOverview', maidAuthController.protect, viewController.getMaidOverview)
module.exports = router;
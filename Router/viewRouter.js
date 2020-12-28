const express = require('express')
const viewController = require('../Controllers/viewController')
const authController = require('../Controllers/authController')
const router = express.Router();
router.get('/', authController.isLoggedIn, viewController.getStart);
router.get('/login', viewController.getLoginPage);
router.get('/signup', viewController.getsignupPage);
router.get('/maid-login', viewController.getMaidLoginPage);
router.get('/overview', authController.protect, viewController.getoverview);
module.exports = router;
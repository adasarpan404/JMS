const express = require('express');
const maidAuth = require('./../controllers/maidAuthController')
const authController = require('./../controllers/authController')
const maidController = require('./../controllers/maidController')
const bookingController = require('./../controllers/bookingController')
const reviewRouter = require('./../Router/reviewRouter')
const router = express.Router();
router.post('/signUp', maidAuth.signUp);
router.post('login', maidAuth.login);
router.post('/logout', maidAuth.logout);
router.post('/forgotPassword', maidAuth.forgotPassword);
router.post('/resetPassword', maidAuth.resetPassword);
router.post('/verify', maidAuth.verify);
router.get('/resendOTP', maidAuth.protect, maidAuth.resendTo);
router.get('/', authController.protect, maidController.getAllMaid);
router.post('/updatePersonalInformation', maidAuth.protect, maidAuth.updatePersonalInformation)
router.post('/updateContactInformation', maidAuth.protect, maidAuth.updateContactInformation);
router.route('/:id').get(authController.protect, maidController.getMaid).patch(authController.protect, authController.restrictTo('regional-admin', 'admin'), maidController.updateMaid).delete(authController.protect, authController.restrictTo('regional-admin', 'admin'), maidController.deleteMaid);
router.use('/:maidId/reviews', reviewRouter);

module.exports = router;
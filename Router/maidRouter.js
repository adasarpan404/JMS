const express = require('express');
const maidAuth = require('./../Controllers/maidAuthController')
const authController = require('./../Controllers/authController')
const maidController = require('./../Controllers/MaidController')
const bookingController = require('./../Controllers/bookingController')
const Transaction = require('./../Controllers/transcationController')
const reviewRouter = require('./../Router/reviewRouter')
const router = express.Router();
router.post('/signUp', maidAuth.signUp);
router.post('/login', maidAuth.login);
router.get('/logout', maidAuth.logout);
router.post('/forgotPassword', maidAuth.forgotPassword);
router.post('/resetPassword', maidAuth.resetPassword);
router.post('/verify', maidAuth.verify);
router.get('/resendOTP', maidAuth.protect, maidAuth.resendTo);
router.post('/logininWithMaid', maidAuth.loginWithMaid);

router.get('/', authController.protect, maidController.getAllMaid);
router.post('/updatePersonalInformation', maidAuth.protect, maidAuth.updatePersonalInformation);
router.patch('/updateMe', maidAuth.protect, maidController.uploadUserPhoto, maidController.resizeUserPhoto, maidController.updateMe);
router.post('/updateContactInformation', maidAuth.protect, maidAuth.updateContactInformation);
router.get('/getTop5Maid', authController.protect, maidController.getTop5Maids, maidController.getAllMaid);
router.route('/:id').get(authController.protect, maidController.getMaid).patch(authController.protect, authController.restrictTo('regional-admin', 'admin'), maidController.updateMaid).delete(authController.protect, authController.restrictTo('regional-admin', 'admin'), maidController.deleteMaid);
router.post('./pay/:maidId', authController.protect, bookingController.setMaidUserIds, Transaction.createTransactiontoMaid, bookingController.createBooking)
router.use('/:maidId/reviews', reviewRouter)




module.exports = router;
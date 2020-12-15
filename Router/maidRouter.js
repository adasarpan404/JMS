const express = require('express');
const maidAuth = require('./../Controllers/maidAuthController')
const authController = require('./../Controllers/authController')
const maidController = require('./../Controllers/maidController')
const bookingController = require('./../Controllers/bookingController')
const Transaction = require('./../Controllers/transcationController')
const reviewRouter = require('./../Router/reviewRouter')
const router = express.Router();
router.post('/signUp', maidAuth.signUp);
router.post('/login', maidAuth.login);

router.get('/', authController.protect, maidController.getAllMaid)
router.get('/getTop5Maid', authController.protect, maidController.getTop5Maids, maidController.getAllMaid)
router.route('/:id').get(authController.protect, maidController.getMaid).patch(authController.protect, authController.restrictTo('regional-admin', 'admin'), maidController.updateMaid).delete(authController.protect, authController.restrictTo('regional-admin', 'admin'), maidController.deleteMaid)
router.post('./pay/:maidId', authController.protect, bookingController.setMaidUserIds, Transaction.createTransactiontoMaid, bookingController.createBooking)
router.use('/:maidId/reviews', reviewRouter)




module.exports = router;
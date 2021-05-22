const express = require('express');
const bookingController = require('./../Controllers/bookingController');
const authController = require('./../Controllers/authController')
const router = express.Router();

router.use(authController.protect)
router.get('/checkout-session/:maidId', bookingController.getSessionCheckOut)

module.exports = router;
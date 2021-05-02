const express = require('express');
const authController = require('./../Controllers/authController');
const notificationController = require('./../Controllers/notificationController');
const router = express.Router();

router.post('/', notificationController.createNotification);


module.exports = router;
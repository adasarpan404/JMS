const express = require('express')
const reviewController = require('./../Controllers/reviewController')
const authController = require('./../Controllers/authController')
const router = express.Router({ mergeParams: true });

router.use(authController.protect)

router.route('/').get(reviewController.getAllReview).post(reviewController.setMaidUserIds, reviewController.createReview)

router.get('/:id', reviewController.getReview)

module.exports = router;
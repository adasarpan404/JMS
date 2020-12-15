const express = require('express')
const authController = require('./../Controllers/authController');
const maidauth = require('./../Controllers/maidAuthController')
const requestController = require('./../Controllers/requestController')
const router = express.Router();

router.post('/', authController.protect, requestController.createRequest);
router.delete('/', authController.protect, requestController.deleteRequest);
router.patch('/', authController.protect, requestController.updateRequest);
router.use(maidauth.protect)
router.get('/', requestController.getAllRequest)
router.get('/:id', requestController.getOneRequest)

module.exports = router;
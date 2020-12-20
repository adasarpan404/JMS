const express = require('express')
const viewController = require('../Controllers/viewController')
const router = express.Router();
router.get('/', viewController.getOverview)
module.exports = router;
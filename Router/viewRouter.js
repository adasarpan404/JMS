const express = require('express')
const viewController = require('../Controllers/viewController')
const router = express.Router();
router.get('/', viewController.getOverview)
router.get('/login', viewController.getLoginPage);
router.get('/maid-login', viewController.getMaidLoginPage)
module.exports = router;
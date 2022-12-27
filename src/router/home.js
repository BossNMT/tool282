const express = require('express');
const router = express.Router()
const homeController = require('../app/controllers/homeController');

router.get('/', homeController.home);
router.post('/handle', homeController.handle);

module.exports = router
const express = require('express');
const router= express.Router();
const sideBarDataController= require('../controllers/sideBarDataController');

router.get('/',sideBarDataController.getSidebarData);

module.exports = router;
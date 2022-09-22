const express = require('express');
const userController = require('../../controllers/userController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

const router = express.Router();
router.route('/')
        .get(verifyRoles(ROLES_LIST.Admin), userController.getAllUsers)
        .put(verifyRoles(ROLES_LIST.Admin), userController.updateUser)
module.exports = router;
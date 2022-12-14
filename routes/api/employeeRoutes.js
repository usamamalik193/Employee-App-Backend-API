const express = require('express');
const multer = require("multer");
const employeesController = require('../../controllers/employeeController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //cb(null, "./../reactapp-employee/public/uploads");
      cb(null, "./../uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
const upload = multer({ storage: storage });

const router = express.Router();
router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Employee, ROLES_LIST.Editor), employeesController.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin), upload.any(), employeesController.createNewEmployee)
    //console.log(ROLES_LIST.Admin)

module.exports = router;
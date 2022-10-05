const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
const { userValidation } = require("../validators");
const { body, param, validationResult } = require('express-validator');

router.route("/").get(userController.getAll);

router.route("/:nama").get(userValidation.getUserByName, userController.getUserByName);
router.route("/:email/:telepon").get(userValidation.getUserByEmailAndTelephone, userController.getUserByEmailAndTelephone);
router.route("/insert").post(userValidation.insertNewUser, userController.insertNewUser);
router.route("/delete/:email").delete(userValidation.deleteUserByEmail, userController.deleteUserByEmail);
router.route("/update").patch(userValidation.updateUser, userController.updateUser);
router.route("/insertBulkUser").post(userValidation.insertBulkUser,userController.insertBulkUser);
    
    
module.exports = router;
const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");

// * login
router.post("/login",userController.login );
// * register
router.post("/register",userController.register);
// * logout
router.post("/logout",userController.register);

module.exports = router; // ! Don't forget to export the router
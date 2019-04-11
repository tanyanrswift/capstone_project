const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const User = require("../../src/db/models").User;

router.get("/users/sign_up", userController.signUp);
//router.get("/users/sign_in", userController.signIn);
//router.get("/users/sign_out", userController.signOut);

module.exports = router;
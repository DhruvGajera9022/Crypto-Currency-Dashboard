const express = require("express");
const route = express.Router();

const authController = require("../controllers/authController");

route.get("/login", authController.loginPage);
route.get("/signup", authController.signUpPage);


module.exports = route;
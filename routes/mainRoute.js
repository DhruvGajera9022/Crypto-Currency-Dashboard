const express = require("express");
const route = express.Router();

const mainController = require("../controllers/mainController");

route.get("/", mainController.mainPage);
route.get("/trade/:currency", mainController.chartPage);


module.exports = route;
const express = require("express");
const route = express.Router();

const currencyController = require("../controllers/currencyController");

// get all currency
route.get("/api/currency", currencyController.currencyAPI);

// add currency
route.post("/api/add-currency", currencyController.addCurrencyAPI);

module.exports = route;
const express = require("express");
require("dotenv").config();
const app = express();

const mainRoute = require("./routes/mainRoute");
const currencyRoute = require("./routes/currencyRoute");

app.use(express.json());

app.set("view engine", "ejs");

app.use(express.static("src"));

app.use("/", mainRoute);
app.use("/", currencyRoute);


const port = process.env.PORT;
const url = process.env.URL;
app.listen(port, () => console.log(`Server started at ${url}`));
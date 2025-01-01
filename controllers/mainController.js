const CurrencyModel = require("../models/currency");

const mainPage = async (req, res) => {
    const allCurrency = await CurrencyModel.findAll({});
    res.render("main", {
        allCurrency,
    });
}

const chartPage = async (req, res) => {
    const currency = req.params.currency;
    let currencyCoin, title;

    currencyCoin = currency;
    title = currency;

    res.render("chart", {
        currencyCoin,
        title
    });
}


module.exports = {
    mainPage,
    chartPage,
}
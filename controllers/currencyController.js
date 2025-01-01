const CurrencyModel = require("../models/currency");

// all currency api
const currencyAPI = async (req, res) => {
    try {
        const allCurrency = await getAllCurrency();

        if (!allCurrency) {
            return res.json({
                status: false,
                message: "Currency not available."
            });
        }

        return res.json({
            status: true,
            data: allCurrency
        });
    } catch (error) {
        console.log(error);
        return res.json({
            status: false,
            message: "Error in Currency API"
        });
    }
};


// add currency api
const addCurrencyAPI = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.json({
                status: false,
                message: "Please provide currency name",
            });
        }

        const isAdded = await CurrencyModel.create({ name });

        if (isAdded) {
            return res.json({
                status: true,
                message: "Currency added",
            });
        }

    } catch (error) {
        console.log(error)
        return res.json({
            status: false,
            message: "Error in Add currency API",
        });
        ;
    }
}


// get all currency
const getAllCurrency = async () => {
    return await CurrencyModel.findAll({});
}








module.exports = {
    currencyAPI,
    addCurrencyAPI,
}
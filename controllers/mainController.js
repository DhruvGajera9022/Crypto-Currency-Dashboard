const mainPage = async (req, res) => {
    res.render("main");
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
const currencyCoin = document.getElementById("currencyCoin");
const title = document.getElementById("title");

let data = [];
let chart;

setInterval(async () => {
    const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${currencyCoin.value}&interval=1m&limit=1000`
    );

    const json = await response.json();

    const newData = json.map((item) => [
        item[0],
        +item[1],
        +item[2],
        +item[3],
        +item[4],
    ]);

    data = newData;

    if (chart) {
        chart.series[0].setData(data, true);
    }
}, 1000);

chart = Highcharts.stockChart("container", {
    chart: {
        events: {
            load: function () {
                this.series[0].setData(data);
            },
        },
    },

    plotOptions: {
        candlestick: {
            color: "pink",
            lineColor: "red",
            upColor: "lightgreen",
            upLineColor: "green",
        },
    },

    rangeSelector: {
        selected: 1,
    },

    series: [
        {
            type: "candlestick",
            name: "BTC/USDT",
            data: data,
        },
    ],
});
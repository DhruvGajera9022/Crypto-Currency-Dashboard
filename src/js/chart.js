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
            color: "red",
            lineColor: "red",
            upColor: "green",
            upLineColor: "green",
        },
    },

    rangeSelector: {
        selected: 100,
        buttons: [
            {
                type: 'minute',
                count: 1,
                text: '1m',
            },
            {
                type: 'minute',
                count: 5,
                text: '5m',
            },
            {
                type: 'minute',
                count: 30,
                text: '30m',
            },
            {
                type: 'hour',
                count: 10,
                text: '1H',
            },
            {
                type: 'day',
                count: 100,
                text: '1D',
            },
            {
                type: 'all',
                text: 'All',
            },
        ]
    },

    navigator: {
        enabled: true,
    },

    scrollbar: {
        enabled: true,
    },

    tooltip: {
        split: true,
        valueDecimals: 2,
    },

    exporting: {
        enabled: true,
    },

    accessibility: {
        enabled: true,
    },

    series: [
        {
            type: "candlestick",
            name: "BTC/USDT",
            data: data,
            tooltip: {
                valueDecimals: 2,
            },
        },
    ],
});
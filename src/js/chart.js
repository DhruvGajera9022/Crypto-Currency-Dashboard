const currencyCoin = document.getElementById("currencyCoin");
const title = document.getElementById("title");
const mainTitle = document.getElementById("mainTitle");

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
        mainTitle.innerText = +item[4] + " | " + title.value
    ]);

    data = newData;

    if (chart) {
        chart.series[0].setData(data, true);
    }
}, 1000);

chart = Highcharts.stockChart("container", {
    chart: {
        backgroundColor: "#212529",
        style: {
            color: "#FFFFFF",
        },
        events: {
            load: function () {
                this.series[0].setData(data);
            },
        },
    },

    xAxis: {
        gridLineColor: "#444444",
        labels: {
            style: {
                color: "#FFFFFF",
            },
        },
    },

    yAxis: {
        gridLineColor: "#444444",
        labels: {
            style: {
                color: "#FFFFFF",
            },
        },
        title: {
            text: null,
        },
    },

    rangeSelector: {
        buttonTheme: {
            fill: "#333333",
            stroke: "#000000",
            style: {
                color: "#FFFFFF",
            },
            states: {
                hover: {
                    fill: "#444444",
                    style: {
                        color: "#FFFFFF",
                    },
                },
                select: {
                    fill: "#555555",
                    style: {
                        color: "#FFFFFF",
                    },
                },
            },
        },
        inputStyle: {
            color: "#FFFFFF",
            backgroundColor: "#333333",
        },
        labelStyle: {
            color: "#FFFFFF",
        },
        selected: 5,
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
        outlineColor: "#666666",
        maskFill: "rgba(255, 255, 255, 0.2)",
        series: {
            color: "#FF0000",
            lineColor: "#FF0000",
        },
        xAxis: {
            gridLineColor: "#444444",
        },
    },

    scrollbar: {
        barBackgroundColor: "#666666",
        barBorderColor: "#666666",
        buttonArrowColor: "#FFFFFF",
        buttonBackgroundColor: "#444444",
        buttonBorderColor: "#444444",
        rifleColor: "#FFFFFF",
        trackBackgroundColor: "#333333",
        trackBorderColor: "#333333",
    },

    tooltip: {
        backgroundColor: "#333333",
        style: {
            color: "#FFFFFF",
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

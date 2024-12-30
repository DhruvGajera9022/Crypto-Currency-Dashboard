const currencyCoin = document.getElementById("currencyCoin");
const title = document.getElementById("title");
const mainTitle = document.getElementById("mainTitle");
const orderBookBody = document.getElementById("orderBookBody");
const bottomCurrencyTitle = document.getElementById("bottomCurrencyTitle");

let data = [];
let chart;

const topCurrency = title.value.slice(0, 3);
const bottomCurrency = title.value.slice(3);
const fixedTitle = `${topCurrency}/${bottomCurrency}`

bottomCurrencyTitle.innerText = fixedTitle;

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
        mainTitle.innerText = +item[4] + " | " + `${topCurrency} ${bottomCurrency}`,
        +item[9]
    ]);

    data = newData;
    const last20Rows = data.slice(-13).reverse();
    orderBookBody.innerHTML = "";
    let previousPrice = null;

    last20Rows.forEach((item) => {
        const price = item[4];
        const amount = item[6];
        const total = price * amount;

        const row = document.createElement("tr");

        const isIncrease = previousPrice !== null && price > previousPrice;
        const isDecrease = previousPrice !== null && price < previousPrice;

        const priceCell = document.createElement("td");
        priceCell.innerText = price.toFixed(2);
        priceCell.style.color = isIncrease ? "green" : "red";


        const amountCell = document.createElement("td");
        amountCell.innerText = amount.toFixed(6);
        amountCell.style.color = "white";

        const totalCell = document.createElement("td");
        totalCell.innerText = total.toFixed(2);
        totalCell.style.color = "white";

        row.appendChild(priceCell);
        row.appendChild(amountCell);
        row.appendChild(totalCell);

        orderBookBody.appendChild(row);

        previousPrice = price;
    });

    if (chart) {
        chart.series[0].setData(data, true);
    }
}, 1000);


chart = Highcharts.stockChart("container", {
    chart: {
        backgroundColor: "#181a20",
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

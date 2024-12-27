const currencyCoin = document.getElementById("currencyCoin");
const title = document.getElementById("title");

const socket = new WebSocket(
    `wss://stream.binance.com:9443/ws/${currencyCoin.value}`
);
const chartData = [];
const smaData = [];
const tableBody = document.querySelector("#price-table tbody");
let tempData = [];

const chart = Highcharts.stockChart("chartContainer", {
    chart: {
        events: {
            load: function () {
                this.series[0].setData([]);
                this.series[1].setData([]);
            },
        },
    },
    rangeSelector: {
        selected: 1,
    },
    title: {
        text: `${title.value} Ticker Data`,
    },
    series: [
        {
            name: `${title.value} Price`,
            data: [],
            tooltip: {
                valueDecimals: 2,
            },
        },
        {
            name: "SMA (15)",
            data: [],
            color: "#FF0000",
            tooltip: {
                valueDecimals: 2,
            },
        },
    ],
});

setInterval(() => {
    if (tempData.length > 0) {
        chartData.push(...tempData);
        chart.series[0].setData(chartData, true);

        const smaPeriod = 15;
        const sma = calculateSMA(tempData, smaPeriod);
        smaData.push([tempData[tempData.length - 1][0], sma]);
        chart.series[1].setData(smaData, true);

        tempData = [];
    }
}, 30000);

function calculateSMA(data, period) {
    if (data.length < period) return null;

    let sum = 0;
    for (let i = data.length - period; i < data.length; i++) {
        sum += data[i][1];
    }
    return sum / period;
}

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    const {
        c: currentPrice,
        o: openPrice,
        h: highPrice,
        l: lowPrice,
        p: priceChange,
        P: percentChange,
    } = data;

    const time = new Date().getTime();

    tempData.push([time, parseFloat(currentPrice)]);

    const row = tableBody.insertRow(0);
    row.insertCell(0).textContent = new Date(time).toLocaleTimeString();
    row.insertCell(1).textContent = currentPrice;
    row.insertCell(2).textContent = openPrice;
    row.insertCell(3).textContent = highPrice;
    row.insertCell(4).textContent = lowPrice;
    row.insertCell(5).textContent = priceChange;
    row.insertCell(6).textContent = percentChange;

    if (tableBody.rows.length > 20) {
        tableBody.deleteRow(tableBody.rows.length - 1);
    }
};
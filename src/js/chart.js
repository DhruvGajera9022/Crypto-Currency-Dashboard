const currencyCoin = document.getElementById("currencyCoin");
const title = document.getElementById("title");

const socket = new WebSocket(
    `wss://stream.binance.com:9443/ws/${currencyCoin.value}`
);
const chartData = [];
const smaData = [];
const tableBody = document.querySelector("#price-table tbody");
let tempData = [];

const chart = Highcharts.chart("container", {
    chart: {
        type: "line",
        zoomType: "x",
        backgroundColor: "#f9f9f9",
    },
    title: {
        text: `Real-time ${title.value}/USDT Price with SMA`,
        style: {
            color: "#333",
            fontSize: "18px",
            fontWeight: "bold",
        },
    },
    xAxis: {
        type: "datetime",
        gridLineWidth: 1,
        lineColor: "#ddd",
        tickColor: "#ddd",
        title: {
            text: "Time",
        },
    },
    yAxis: {
        title: {
            text: "Price (USDT)",
        },
        gridLineWidth: 1,
        lineColor: "#ddd",
        tickColor: "#ddd",
    },
    tooltip: {
        shared: true,
        valuePrefix: "$",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: 5,
        style: {
            color: "#fff",
            fontWeight: "bold",
        },
    },
    plotOptions: {
        line: {
            marker: {
                enabled: false,
            },
            lineWidth: 3,
            states: {
                hover: {
                    lineWidth: 4,
                },
            },
        },
    },
    series: [
        {
            name: "Price",
            data: chartData,
            color: "#00bfae",
            fillOpacity: 0.1,
            lineColor: "#00bfae",
        },
        {
            name: "SMA (15)",
            data: smaData,
            color: "#ff9800",
            lineWidth: 2,
            dashStyle: "ShortDash",
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
const currencyTable = document.getElementById("currencyTable");
const searchInput = document.getElementById("searchInput");

const btcCoin = document.getElementById("btcCoin");
const ethCoin = document.getElementById("ethCoin");
const xrpCoin = document.getElementById("xrpCoin");

const btcPer = document.getElementById("btcPer");
const ethPer = document.getElementById("ethPer");
const xrpPer = document.getElementById("xrpPer");

const socket = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

// WebSocket message handler
socket.onmessage = (event) => {
    const allData = JSON.parse(event.data);

    allData.map(data => {
        switch (data.s) {
            case "BTCUSDT":
                btcCoin.innerText = "$" + +data.c;
                btcPer.innerText = data.P;
                data.P < 0 ? (btcPer.style.color = "red") : (btcPer.style.color = "green");
                break;
            case "ETHUSDT":
                ethCoin.innerText = "$" + +data.c;
                ethPer.innerText = data.P;
                data.P < 0 ? (ethPer.style.color = "red") : (ethPer.style.color = "green");
                break;
            case "XRPUSDT":
                xrpCoin.innerText = "$" + +data.c;
                xrpPer.innerText = data.P;
                data.P < 0 ? (xrpPer.style.color = "red") : (xrpPer.style.color = "green");
                break;
        }
    });

};

// Function to filter data
const filterTable = (filter) => {
    const rows = currencyTable.getElementsByTagName("tr");
    Array.from(rows).forEach((row) => {
        const currencyName = row.querySelector('td').textContent;
        if (currencyName.toLowerCase().includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
};
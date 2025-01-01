// Top Currency price
const btcCoin = document.getElementById("btcCoin");
const ethCoin = document.getElementById("ethCoin");
const xrpCoin = document.getElementById("xrpCoin");

// Top Currency percentage
const btcPer = document.getElementById("btcPer");
const ethPer = document.getElementById("ethPer");
const xrpPer = document.getElementById("xrpPer");

// New listing price
const usualCoin = document.getElementById("usualCoin");
const penguCoin = document.getElementById("penguCoin");
const vanaCoin = document.getElementById("vanaCoin");

// New listing percentage
const usualPer = document.getElementById("usualPer");
const penguPer = document.getElementById("penguPer");
const vanaPer = document.getElementById("vanaPer");

// Select the table body element
const tableBody = document.querySelector(".currency-table .table tbody");

// Websocket for the binance
const socket = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

// display data in the table
const updateTable = (data) => {
    const sortedData = data.sort((a, b) => b.q - a.q);

    const topCurrencies = sortedData.slice(0, 20);

    tableBody.innerHTML = "";

    topCurrencies.forEach((currency) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = currency.s;

        const priceCell = document.createElement("td");
        priceCell.textContent = parseFloat(currency.c).toFixed(2);

        const changeCell = document.createElement("td");
        changeCell.textContent = `${parseFloat(currency.P).toFixed(2)}%`;
        changeCell.style.color = parseFloat(currency.P) >= 0 ? "green" : "red";

        const actionCell = document.createElement("td");
        const actionButton = document.createElement("button");
        actionButton.textContent = "View";
        actionButton.className = "action-button";
        actionCell.appendChild(actionButton);

        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(changeCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
};

// Get the data from the socket
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
            case "USUALUSDT":
                usualCoin.innerText = "$" + +data.c;
                usualPer.innerText = data.P;
                data.P < 0 ? (usualPer.style.color = "red") : (usualPer.style.color = "green");
            case "PENGUUSDT":
                penguCoin.innerText = "$" + +data.c;
                penguPer.innerText = data.P;
                data.P < 0 ? (penguPer.style.color = "red") : (penguPer.style.color = "green");
            case "VANAUSDT":
                vanaCoin.innerText = "$" + +data.c;
                vanaPer.innerText = data.P;
                data.P < 0 ? (vanaPer.style.color = "red") : (vanaPer.style.color = "green");
        }
    });

    updateTable(allData);

};
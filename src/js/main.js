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

let currencyNames = [];

// Websocket for the binance
const socket = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");


// get currency from database
const getData = async () => {
    try {
        const res = await fetch("http://localhost:8010/api/currency");
        const data = await res.json();
        currencyNames = data.data.map((currency) => currency.name);

        createTableRows(currencyNames);
    } catch (error) {
        console.error("Error fetching currency data:", error);
    }
}

// Create table rows for each currency
const createTableRows = (names) => {
    const tableBody = document.querySelector(".currency-table tbody");
    tableBody.innerHTML = "";

    names.forEach((name) => {
        const row = document.createElement("tr");

        // Name column
        const nameCell = document.createElement("td");
        nameCell.id = `name-${name}`;
        nameCell.textContent = name;

        // Price column
        const priceCell = document.createElement("td");
        priceCell.id = `price-${name}`;

        // Percentage column
        const percentCell = document.createElement("td");
        percentCell.id = `percent-${name}`;

        // Action column
        const actionCell = document.createElement("td");
        const actionLink = document.createElement("a");
        actionLink.href = `/trade/${name}USDT`;
        actionLink.textContent = "View";
        actionCell.appendChild(actionLink);

        // Append cells to the row
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(percentCell);
        row.appendChild(actionCell);

        // Append row to the table body
        tableBody.appendChild(row);
    });
};

// Get the data from the socket
socket.onmessage = (event) => {
    const allData = JSON.parse(event.data);

    allData.map(async (data) => {
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

    allData.forEach((data) => {
        const currencyName = data.s.replace("USDT", "");

        if (currencyNames.includes(currencyName)) {
            const priceCell = document.getElementById(`price-${currencyName}`);
            const percentCell = document.getElementById(`percent-${currencyName}`);

            if (priceCell && percentCell) {
                priceCell.textContent = `$${(+data.c).toFixed(2)}`;
                percentCell.textContent = `${(+data.P).toFixed(2)}%`;
                percentCell.style.color = (+data.P) >= 0 ? "green" : "red";
            }
        }
    });

};

getData();
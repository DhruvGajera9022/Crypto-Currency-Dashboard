const currencyTable = document.getElementById("currencyTable");

const socket = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

const displayedCurrencies = {};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const top50 = data
        .filter((ticker) => ticker.s)
        .sort((a, b) => parseFloat(b.c) - parseFloat(a.c))
        .slice(0, 100);

    top50.forEach((ticker) => {
        const name = ticker.s;
        const getChar = (s, n) => s.slice(-n);
        if (getChar(name, 4) == "USDT") {
            const currentPrice = parseFloat(ticker.c);
            const percentage = parseFloat(ticker.P);

            const percentageColor = percentage > 0 ? "green" : percentage < 0 ? "red" : "black";

            let existingRow = document.getElementById(name);
            if (existingRow) {
                const priceCell = existingRow.querySelector(".percentage");
                priceCell.textContent = percentage.toFixed(2);
                priceCell.style.color = percentageColor;

                const priceColumn = existingRow.querySelector(".price");
                priceColumn.textContent = currentPrice.toFixed(2);
            } else {
                const newRow = document.createElement("tr");
                newRow.id = name;
                newRow.innerHTML = `
                    <td>${name}</td>
                    <td class="price">${currentPrice.toFixed(2)}</td>
                    <td class="percentage" style="color: ${percentageColor}">${percentage.toFixed(2)}</td>
                    <td><a href="/trade/${name}" class="btn btn-primary"><i class="fas fa-eye"></i> View</a></td>
                `;
                currencyTable.appendChild(newRow);
            }
        }
    });
};

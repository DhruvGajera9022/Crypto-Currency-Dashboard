const currencyTable = document.getElementById("currencyTable");
const searchInput = document.getElementById("searchInput");

const socket = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

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

// WebSocket message handler
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const top50 = data
        .filter((ticker) => ticker.s)
        .sort((a, b) => parseFloat(b.c) - parseFloat(a.c))
        .slice(0, 100); // Limit to 100 results (can adjust)

    top50.forEach((ticker) => {
        const name = ticker.s;
        const getChar = (s, n) => s.slice(-n);
        if (getChar(name, 4) === "USDT") {  // Filter only USDT pairs
            const currentPrice = parseFloat(ticker.c);
            const percentage = parseFloat(ticker.P);

            const percentageColor = percentage > 0 ? "green" : percentage < 0 ? "red" : "black";

            let existingRow = document.getElementById(name);
            if (existingRow) {
                // Update the existing row
                existingRow.querySelector(".percentage").textContent = percentage.toFixed(2);
                existingRow.querySelector(".percentage").style.color = percentageColor;
                existingRow.querySelector(".price").textContent = currentPrice.toFixed(2);
            } else {
                // Create a new row
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

// Search functionality: Listen for changes in the input field
searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    filterTable(filter);
});

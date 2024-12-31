const currencyCoin = document.getElementById("currencyCoin");
const title = document.getElementById("title");
const mainTitle = document.getElementById("mainTitle");

let data = [];
let chart;

const topCurrency = title.value.slice(0, 3);
const bottomCurrency = title.value.slice(3);
const fixedTitle = `${topCurrency}/${bottomCurrency}`


new TradingView.widget(
    {
        "autosize": true,
        "symbol": `BINANCE:${currencyCoin.value}`,
        "interval": "240",
        "timezone": "Etc/Utc",
        "theme": "dark",
        "style": "1",
        "locate": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "withdateranges": true,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        // "watchlist": [
        //     "BINANCE:BTCUSDT",
        //     "BINANCE:ETHUSDT",
        //     "BINANCE:BNBUSDT"
        // ],
        "details": true,
        "hotlist": true,
        "calendar": true,
        "studies": [
            "STD;SMA"
        ],
        "container_id": "trading-view-chart",
        "show_popup_button": true,
        "popup_width": "1000",
        "popup_height": "650"
    }
)
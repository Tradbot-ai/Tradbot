📈 Tradbot — Virtual Trading App

A full-stack trading simulation platform with real-time data streaming

🚀 Overview

Tradbot is a virtual trading platform built with:

React (frontend)

Go / Golang (backend)

PostgreSQL

Finnhub WebSocket API (live market data)

You can:

✔ Add trades (symbol, qty, price)
✔ View your trade history
✔ Fetch live market prices via REST
✔ Stream real-time market data (US stocks, crypto, forex)
✔ Use a clean and modular frontend structure

🏗 Tech Stack
🔹 Frontend

React (Create React App)

Reusable components

Header

TradeForm

TradeList

LiveStream

Suggestions (crypto suggestions)

🔹 Backend

Go (Golang)

Gorilla WebSocket

Finnhub WebSocket API

PostgreSQL + database/sql

REST API + WebSocket API

📁 Project Structure
Tradbot/
│
├── backend/
│   ├── main.go
│   ├── database/
│   │   └── db.go
│   ├── routes/
│       ├── hello.go
│       ├── time.go
│       ├── trades.go
│       ├── market.go
│       └── live.go
│   └── go.mod
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── TradeForm.js
│   │   │   ├── TradeList.js
│   │   │   ├── LiveStream.js
│   │   │   └── Suggestions.js
│   │   ├── pages/
│   │   │   └── Dashboard.js
│   │   ├── api/
│   │   │   └── api.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   └── package.json
│
└── README.md

🛢 Database Setup
1️⃣ Create PostgreSQL database
CREATE DATABASE trades;

2️⃣ Create table
CREATE TABLE trades (
    id SERIAL PRIMARY KEY,
    symbol TEXT NOT NULL,
    quantity INT NOT NULL,
    price FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

🧠 Backend Setup (Go)
Install dependencies
cd backend
go mod tidy
go get github.com/gorilla/websocket

Environment variables / Config

Inside database/db.go, update:

user=postgres
dbname=trades
password=yourpassword
host=localhost
sslmode=disable

Start backend
go run main.go


Backend runs at:

👉 http://localhost:8080

🖥️ Frontend Setup (React)
cd frontend
npm install
npm start


Frontend runs at:

👉 http://localhost:3000

🔌 API Endpoints
🟢 REST Endpoints
Method	Endpoint	Description
GET	/api/hello	Test endpoint
GET	/api/time	Server time
GET	/api/trades	Fetch all trades
POST	/api/trades	Insert a new trade
GET	/api/price	Get market price (Finnhub)
🔵 WebSocket Endpoint (Live Data)
Endpoint	Description
ws://localhost:8080/api/live?symbol=AAPL	Stream live ticks

Backend receives real-time updates from Finnhub and pushes them to the frontend.

📡 Live Streaming (Finnhub)

Supported symbols:

✔ US Stocks
AAPL
MSFT
TSLA
AMZN

✔ Crypto
BINANCE:BTCUSDT
BINANCE:ETHUSDT
BINANCE:SOLUSDT

✔ Forex
OANDA:USD_INR
OANDA:EUR_USD


❗ NSE equities are not supported in Finnhub's free tier.

🧩 Frontend Live Streaming

Use the <LiveStream /> component:

<LiveStream symbol={symbol} />


It connects to:

ws://localhost:8080/api/live?symbol=YOUR_SYMBOL


and streams real-time ticks.

⭐ Suggestions Component

Auto-suggest crypto symbols for live streaming:

BINANCE:BTCUSDT
BINANCE:ETHUSDT
BINANCE:SOLUSDT
BINANCE:XRPUSDT
BINANCE:DOGEUSDT
BINANCE:ADAUSDT

✔ Current Features Implemented

 Go backend with REST + WebSocket

 PostgreSQL integration

 Live realtime streaming using Finnhub WS

 React dashboard

 Live price UI

 Crypto suggestions

 Trade form + history

 Component separation & clean code

🔮 Upcoming Features

 Candlestick charts (Chart.js)

 Portfolio P/L calculation

 Watchlist with live updates

 User login (JWT)

 Multi-symbol streaming channels

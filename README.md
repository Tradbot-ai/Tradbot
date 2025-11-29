
# 📈 Tradbot - Virtual Trading Platform

A full‑stack **Virtual Trading Application** built using:

- **Golang (REST + WebSocket Backend)**
- **React (Frontend UI)**
- **PostgreSQL (Database)**
- **Finnhub WebSocket (Real‑time Live Market Streaming)**
- **Yahoo Finance / Finnhub REST (Price Fetching)**
- Modular clean architecture (routes/components/api layers)

This README covers everything built **till today**, including installation, architecture, API reference, database schema, and frontend UI structure.

---

## 🚀 Features Completed (As of Today)

### ✔ Backend (Golang)
- REST APIs:
  - `/api/hello` — Backend connectivity test
  - `/api/time` — Server time
  - `/api/trades` — CRUD for virtual trades
  - `/api/price` — Price fetch (Finnhub REST)
  - `/api/live` — Live FINNHUB WebSocket stream proxy
- PostgreSQL database integration
- WebSocket reverse‑proxy architecture:
  - Frontend → Go → Finnhub → Go → Frontend
- Auto reconnect logic with exponential backoff
- One connection per client
- Graceful close handling
- Ping/Pong keepalive

### ✔ Frontend (React)
- Dashboard displaying:
  - Backend message
  - Live server time
  - Trades list
  - Add trade form
- Live market price fetch
- Real‑time WebSocket streaming UI
- Crypto symbol suggestions
- Start/Stop streaming buttons
- Clean modular components:
  - `LiveStream.js`
  - `TradeForm.js`
  - `TradeList.js`
  - `Header.js`
  - `Dashboard.js`

---

## 🧱 Architecture Diagram

```
           ┌──────────────────┐
           │   React Frontend  │
           │  (Dashboard UI)   │
           └───────┬──────────┘
                   │ REST / WS
                   ▼
        ┌──────────────────────────┐
        │        Go Backend        │
        │  /api/*  &  /api/live    │
        └───────────┬─────────────┘
                    │
             WebSocket Proxy
                    │
                    ▼
        ┌──────────────────────────┐
        │     Finnhub WebSocket    │
        │  wss://ws.finnhub.io     │
        └──────────────────────────┘
```

---

## 🗄 Database Schema (PostgreSQL)

```sql
CREATE TABLE trades (
    id SERIAL PRIMARY KEY,
    symbol TEXT NOT NULL,
    quantity INT NOT NULL,
    price FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔌 Backend API Routes

### GET `/api/hello`
Returns simple JSON to verify backend connectivity.

### GET `/api/time`
Returns live server time.

### GET `/api/trades`
Returns all trades.

### POST `/api/trades`
Creates a new trade entry.

### GET `/api/price?symbol=AAPL`
Fetches live price via Finnhub REST.

### WEBSOCKET `/api/live?symbol=AAPL`
Starts streaming live price ticks.

---

## 🌐 Frontend Flow

### 1. Fetch Backend Info
Dashboard loads `/api/hello` and `/api/time`.

### 2. Trades UI
- TradeForm → POST `/api/trades`
- TradeList → GET `/api/trades`

### 3. Market Price
User enters a symbol → `/api/price?symbol=XYZ`

### 4. Live Streaming
`LiveStream.js` connects via:
```
ws://localhost:8080/api/live?symbol=AAPL
```

Displays tick-by-tick updates.

---

## 🧪 Running the Project

### Backend
```bash
cd backend
go mod tidy
go run main.go
```

Runs on:
```
http://localhost:8080
```

### Frontend
```bash
cd frontend
npm install
npm start
```

Runs on:
```
http://localhost:3000
```

React automatically proxies `/api/*` to Go.

---

## 📊 Supported Live Symbols (Finnhub Free)

### Stocks
```
AAPL
AMZN
TSLA
MSFT
GOOGL
```

### Crypto
```
BINANCE:BTCUSDT
BINANCE:ETHUSDT
BINANCE:SOLUSDT
BINANCE:BNBUSDT
```

### Forex
```
OANDA:USD_INR
OANDA:EUR_USD
```

---

## 📁 Project Structure

```
Tradbot/
│── backend/
│   ├── main.go
│   ├── go.mod
│   ├── database/
│   ├── routes/
│   │    ├── hello.go
│   │    ├── time.go
│   │    ├── trades.go
│   │    ├── market.go
│   │    └── live.go
│
│── frontend/
│   ├── src/
│   │    ├── components/
│   │    │    ├── LiveStream.js
│   │    │    ├── Header.js
│   │    │    ├── TradeForm.js
│   │    │    ├── TradeList.js
│   │    ├── pages/
│   │    │    ├── Dashboard.js
│   │    ├── api/
│   │    │    ├── api.js
│   │    ├── App.js
│   │    └── index.js
│
│── README.md
```

---

## 🧩 Next Steps Planned
- User accounts + authentication
- Watchlist system
- Live charts (TradingView/Chart.js)
- P&L calculation engine
- Alerts system
- Docker deployment
- Real NSE data via Angel One

---

## 🏁 Credits
Tradbot is built and architected step‑by‑step for **Intekhab**  
with:

✔ Modular Go backend  
✔ Modern React UI  
✔ Real-Time WebSocket Proxy  
✔ Database‑driven virtual trading  


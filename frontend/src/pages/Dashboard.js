import { useEffect, useState } from "react";
import Header from "../components/Header";
import TradeForm from "../components/TradeForm";
import TradeList from "../components/TradeList";
import { fetchHello, fetchTime, fetchTrades } from "../api/api";

export default function Dashboard() {
  const [message, setMessage] = useState("Loading...");
  const [time, setTime] = useState("Loading...");
  const [trades, setTrades] = useState([]);

  // For Finnhub price testing
  const [symbol, setSymbol] = useState("");
  const [priceData, setPriceData] = useState(null);

  // Load initial data
  useEffect(() => {
    fetchHello().then((d) => setMessage(d.message));
    fetchTime().then((d) => setTime(d.server_time));
    fetchTrades().then((d) => setTrades(d));
  }, []);

  // Fetch Market Price from our Go API
  const getMarketPrice = async () => {
    if (!symbol) return;

    const res = await fetch(`/api/price?symbol=${symbol}`);
    const data = await res.json();
    setPriceData(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <Header />

      {/* Backend info */}
      <p>{message}</p>
      <p>Server Time: {time}</p>

      <hr />

      {/* Finnhub Market Price Section */}
      <h2>🔍 Get Live Market Price (Finnhub)</h2>

      <input
        type="text"
        placeholder="Enter Stock Symbol (e.g., TCS)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <button onClick={getMarketPrice}>Get Price</button>

      {priceData && (
        <pre
          style={{
            marginTop: 20,
            padding: 15,
            background: "#eeeeee",
            borderRadius: 5,
          }}
        >
          {JSON.stringify(priceData, null, 2)}
        </pre>
      )}

      <hr />

      {/* Trade form */}
      <TradeForm setTrades={setTrades} />

      {/* Trade list */}
      <TradeList trades={trades} />
    </div>
  );
}

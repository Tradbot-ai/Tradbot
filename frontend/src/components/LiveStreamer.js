import { useEffect, useRef, useState } from "react";

const popularCrypto = [
  "BINANCE:BTCUSDT",
  "BINANCE:ETHUSDT",
  "BINANCE:BNBUSDT",
  "BINANCE:SOLUSDT",
  "BINANCE:XRPUSDT",
  "BINANCE:DOGEUSDT",
  "BINANCE:ADAUSDT",
];

export default function LiveStream() {
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const wsRef = useRef(null);

  // Start WebSocket connection
  const startStream = () => {
    if (!symbol) {
      alert("Please enter a symbol");
      return;
    }

    if (wsRef.current) {
      wsRef.current.close();
    }

    const ws = new WebSocket(`ws://localhost:8080/api/live?symbol=${symbol}`);
    wsRef.current = ws;

    setIsStreaming(true);
    setPrice("Connecting…");

    ws.onopen = () => {
      console.log("🔌 Connected to backend live stream");
    };

    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        if (data.type === "trade" && data.data?.length > 0) {
          setPrice(data.data[0].p);
        }
      } catch {}
    };

    ws.onclose = () => {
      console.log("❌ Stream closed");
      setIsStreaming(false);
    };
  };

  // Stop WebSocket connection
  const stopStream = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      setIsStreaming(false);
      setPrice(null);
    }
  };

  useEffect(() => {
    return () => {
      // cleanup on component unmount
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  return (
    <div style={{ marginTop: 40, padding: 20, border: "1px solid #999", borderRadius: 8 }}>
      <h2>📡 Live Price Stream (Finnhub)</h2>

      {/* Suggestion Buttons */}
      <div style={{ marginBottom: 10 }}>
        <p>Quick Suggestions:</p>
        {popularCrypto.map((c) => (
          <button
            key={c}
            onClick={() => setSymbol(c)}
            style={{ marginRight: 8, marginBottom: 8 }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Symbol Input */}
      <input
        type="text"
        placeholder="Enter symbol (e.g., AAPL, BINANCE:BTCUSDT)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        style={{ padding: 8, marginRight: 10, width: "60%" }}
      />

      {/* Start / Stop Buttons */}
      {!isStreaming ? (
        <button onClick={startStream} style={{ padding: "8px 16px" }}>
          ▶️ Start Streaming
        </button>
      ) : (
        <button onClick={stopStream} style={{ padding: "8px 16px", background: "red", color: "white" }}>
          ⏹ Stop Streaming
        </button>
      )}

      {/* Live Price */}
      <div style={{ marginTop: 20, fontSize: 22 }}>
        {price !== null && (
          <>
            Live Price for <b>{symbol}</b>: {price === "Connecting…" ? "Connecting…" : `$${price}`}
          </>
        )}
      </div>
    </div>
  );
}

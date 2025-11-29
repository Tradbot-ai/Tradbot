// components/MarketPrice.js
import { useState } from "react";
import SymbolSuggestions from "./SymbolSuggestions";

export default function MarketPrice() {
  const [symbol, setSymbol] = useState("");
  const [priceData, setPriceData] = useState(null);

  const getPrice = async () => {
    const res = await fetch(`/api/price?symbol=${symbol}`);
    const data = await res.json();
    setPriceData(data);
  };

  return (
    <div>
      <h2>🔍 Get Market Price</h2>

      <input
        type="text"
        placeholder="Enter symbol (AAPL, BINANCE:BTCUSDT)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <button onClick={getPrice}>Get Price</button>

      <SymbolSuggestions onSelect={setSymbol} />

      {priceData && (
        <pre
          style={{
            marginTop: 20,
            padding: 15,
            background: "#eee",
            borderRadius: 5,
          }}
        >
          {JSON.stringify(priceData, null, 2)}
        </pre>
      )}
    </div>
  );
}

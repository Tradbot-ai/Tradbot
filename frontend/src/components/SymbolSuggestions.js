// components/SymbolSuggestions.js
import React from "react";

export default function SymbolSuggestions({ onSelect }) {
  const suggestions = [
    "BINANCE:BTCUSDT",
    "BINANCE:ETHUSDT",
    "BINANCE:BNBUSDT",
    "BINANCE:SOLUSDT",
    "BINANCE:XRPUSDT",
    "BINANCE:DOGEUSDT",
    "BINANCE:ADAUSDT",
  ];

  return (
    <div style={{ marginTop: 10 }}>
      <p style={{ marginBottom: 5 }}>Popular Crypto:</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            style={{
              padding: "6px 10px",
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

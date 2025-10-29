import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");
  const [time, setTime] = useState("Loading...");
  const [trades, setTrades] = useState([]);
  const [form, setForm] = useState({ symbol: "", quantity: "", price: "" });

  // Fetch hello, time, and trades on load
  useEffect(() => {
    // Fetch hello
    fetch("/api/hello")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.error("Error fetching /api/hello:", err));

    // Fetch time
    fetch("/api/time")
      .then((res) => res.json())
      .then((data) => setTime(data.server_time))
      .catch((err) => console.error("Error fetching /api/time:", err));

    // Fetch trades
    fetch("/api/trades")
      .then((res) => res.json())
      .then((data) => setTrades(data))
      .catch((err) => console.error("Error fetching /api/trades:", err));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/trades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: form.symbol,
          quantity: parseInt(form.quantity),
          price: parseFloat(form.price),
        }),
      });

      // Refresh trades list
      const res = await fetch("/api/trades");
      const updated = await res.json();
      setTrades(updated);

      // Clear form
      setForm({ symbol: "", quantity: "", price: "" });
    } catch (err) {
      console.error("Error adding trade:", err);
    }
  };

  return (
    <div className="App" style={{ padding: 20, textAlign: "center" }}>
      <h1>📈 Tradbot - Virtual Trading</h1>

      <p>{message}</p>
      <p>🕒 Server time: {time}</p>

      <hr style={{ margin: "20px 0" }} />

      {/* Trade Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: 20,
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          name="symbol"
          placeholder="Stock Symbol"
          value={form.symbol}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Trade</button>
      </form>

      <h2>Existing Trades</h2>
      {trades.length === 0 ? (
        <p>No trades yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {trades.map((t, idx) => (
            <li key={idx}>
              {t.symbol} - {t.quantity} @ ${t.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

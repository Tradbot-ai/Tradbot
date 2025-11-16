import { useState } from "react";
import { addTrade, fetchTrades } from "../api/api";

export default function TradeForm({ setTrades }) {
  const [form, setForm] = useState({ symbol: "", qty: "", price: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTrade(form.symbol, parseInt(form.qty), parseFloat(form.price));
    setTrades(await fetchTrades());
    setForm({ symbol: "", qty: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="symbol" placeholder="Symbol" value={form.symbol} onChange={handleChange} />
      <input name="qty" type="number" placeholder="Qty" value={form.qty} onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />
      <button type="submit">Add Trade</button>
    </form>
  );
}
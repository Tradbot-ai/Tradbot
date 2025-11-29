// pages/Dashboard.js

import { useEffect, useState } from "react";
import Header from "../components/Header";
import TradeForm from "../components/TradeForm";
import TradeList from "../components/TradeList";
import MarketPrice from "../components/MarketPrice";
import LiveStreamer from "../components/LiveStreamer";
import Section from "../components/Section";

import { fetchHello, fetchTime, fetchTrades } from "../api/api";

export default function Dashboard() {
  const [message, setMessage] = useState("Loading...");
  const [time, setTime] = useState("Loading...");
  const [trades, setTrades] = useState([]);

  // Load backend info + trades
  useEffect(() => {
    fetchHello().then((d) => setMessage(d.message));
    fetchTime().then((d) => setTime(d.server_time));
    fetchTrades().then((d) => setTrades(d));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Header />

      <Section title="Backend Status">
        <p>{message}</p>
        <p>Server Time: {time}</p>
      </Section>

      <Section title="Market Price (REST)">
        <MarketPrice />
      </Section>

      <Section title="Live Price Streaming (WebSocket)">
        <LiveStreamer />
      </Section>

      <Section title="Trades">
        <TradeForm setTrades={setTrades} />
        <TradeList trades={trades} />
      </Section>
    </div>
  );
}

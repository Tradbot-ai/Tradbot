import { useEffect, useState } from "react";
import { fetchHello, fetchTime, fetchTrades } from "../api/api";
import Header from "../components/Header";
import TradeForm from "../components/TradeForm";
import TradeList from "../components/TradeList";

export default function Dashboard() {
  const [message, setMessage] = useState("Loading...");
  const [time, setTime] = useState("Loading...");
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    fetchHello().then((d) => setMessage(d.message));
    fetchTime().then((d) => setTime(d.server_time));
    fetchTrades().then((d) => setTrades(d));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Header />
      <p>{message}</p>
      <p>Server Time: {time}</p>
      <TradeForm setTrades={setTrades} />
      <TradeList trades={trades} />
    </div>
  );
}
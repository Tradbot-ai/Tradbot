const API_BASE = "/api";

export async function fetchHello() {
  return (await fetch(`${API_BASE}/hello`)).json();
}

export async function fetchTime() {
  return (await fetch(`${API_BASE}/time`)).json();
}

export async function fetchTrades() {
  return (await fetch(`${API_BASE}/trades`)).json();
}

export async function addTrade(symbol, qty, price) {
  return fetch(`${API_BASE}/trades`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symbol, qty, price }),
  });
}
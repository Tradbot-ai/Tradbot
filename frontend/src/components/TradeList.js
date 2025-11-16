export default function TradeList({ trades }) {
  return (
    <div>
      <h2>Existing Trades</h2>
      <ul>
        {trades.map((t) => (
          <li key={t.id}>
            {t.symbol} - {t.qty} @ ${t.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
import { useMemo } from "react";
import { formatCurrency } from "../utils/formatCurrency";

export default function CategoryBreakdown({ transactions }) {
  const breakdown = useMemo(() => {
    const map = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [transactions]);

  if (breakdown.length === 0) return null;

  const max = breakdown[0][1];

  return (
    <div className="card">
      <div className="card-title">Expense Breakdown</div>
      <ul className="breakdown-list">
        {breakdown.map(([cat, amt]) => (
          <li key={cat} className="breakdown-item">
            <div className="breakdown-row">
              <span className="cat-name">{cat}</span>
              <span className="cat-amt">{formatCurrency(amt)}</span>
            </div>
            <div className="breakdown-bar-track">
              <div
                className="breakdown-bar-fill"
                style={{ width: `${(amt / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

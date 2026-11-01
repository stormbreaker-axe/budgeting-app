import { useState, useMemo } from "react";
import { CATEGORY_ICONS } from "../utils/categories";
import { formatCurrency } from "../utils/formatCurrency";

export default function TransactionList({ transactions, onDelete }) {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    let list = transactions.filter(
      (t) => filter === "all" || t.type === filter
    );
    if (sort === "newest") list = [...list].sort((a, b) => b.id - a.id);
    else if (sort === "oldest") list = [...list].sort((a, b) => a.id - b.id);
    else if (sort === "highest") list = [...list].sort((a, b) => b.amount - a.amount);
    else if (sort === "lowest") list = [...list].sort((a, b) => a.amount - b.amount);
    return list;
  }, [transactions, filter, sort]);

  return (
    <div className="card">
      <div className="list-header">
        <h2>Transactions</h2>
        <div className="filter-row">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest</option>
            <option value="lowest">Lowest</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="tx-empty">No transactions yet. Add one above!</div>
      ) : (
        <ul className="tx-list">
          {filtered.map((tx) => (
            <li key={tx.id} className="tx-item">
              <div className={`tx-icon ${tx.type}`}>
                {CATEGORY_ICONS[tx.category] ?? "📌"}
              </div>

              <div className="tx-info">
                <div className="tx-desc">{tx.description}</div>
                <div className="tx-meta">
                  {tx.category} &bull;{" "}
                  {new Date(tx.date + "T00:00:00").toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>

              <span className={`tx-amount ${tx.type}`}>
                {tx.type === "expense" ? "−" : "+"}
                {formatCurrency(tx.amount)}
              </span>

              <button
                className="btn-delete"
                onClick={() => onDelete(tx.id)}
                title="Delete"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

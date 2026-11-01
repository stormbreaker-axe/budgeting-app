import { useState } from "react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../utils/categories";

const EMPTY = { description: "", amount: "", category: "", date: "" };

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState("expense");
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  const categories = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleTypeChange = (t) => {
    setType(t);
    setForm((f) => ({ ...f, category: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description.trim()) return setError("Please enter a description.");
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      return setError("Please enter a valid amount.");
    if (!form.category) return setError("Please select a category.");
    if (!form.date) return setError("Please pick a date.");

    setError("");
    onAdd({
      id: Date.now().toString(),
      type,
      description: form.description.trim(),
      amount: parseFloat(Number(form.amount).toFixed(2)),
      category: form.category,
      date: form.date,
    });
    setForm(EMPTY);
  };

  return (
    <div className="card">
      <div className="card-title">Add Transaction</div>

      <div className="form-group">
        <label>Type</label>
        <div className="type-toggle">
          <button
            type="button"
            className={type === "expense" ? "active-expense" : ""}
            onClick={() => handleTypeChange("expense")}
          >
            Expense
          </button>
          <button
            type="button"
            className={type === "income" ? "active-income" : ""}
            onClick={() => handleTypeChange("income")}
          >
            Income
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            placeholder="e.g. Coffee, Rent, Salary…"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount ($)</label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={form.amount}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">— Select category —</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
          />
        </div>

        {error && (
          <p style={{ fontSize: ".8rem", color: "var(--expense)", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <button className="btn-submit" type="submit">
          + Add {type === "expense" ? "Expense" : "Income"}
        </button>
      </form>
    </div>
  );
}

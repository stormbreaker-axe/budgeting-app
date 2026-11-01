import { useState } from "react";
import { formatCurrency } from "../utils/formatCurrency";

export default function BudgetGoal({ goal, spent, onUpdate }) {
  const [input, setInput] = useState(goal > 0 ? String(goal) : "");

  const handleSet = () => {
    const val = parseFloat(input);
    if (!isNaN(val) && val > 0) onUpdate(val);
  };

  const pct = goal > 0 ? Math.min((spent / goal) * 100, 100) : 0;
  const over = goal > 0 && spent > goal;

  return (
    <div className="card">
      <div className="card-title">Monthly Spending Goal</div>

      <div className="goal-row">
        <input
          type="number"
          min="1"
          placeholder="Set goal amount…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSet()}
        />
        <button onClick={handleSet}>Set</button>
      </div>

      {goal > 0 && (
        <>
          <div className="progress-bar-track">
            <div
              className={`progress-bar-fill ${over ? "over" : ""}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="progress-label">
            {formatCurrency(spent)} spent of {formatCurrency(goal)} goal
            {over && (
              <span style={{ color: "var(--expense)", fontWeight: 700 }}>
                {" "}— Over budget by {formatCurrency(spent - goal)}!
              </span>
            )}
          </p>
        </>
      )}
    </div>
  );
}

import { useState, useMemo } from "react";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import BudgetGoal from "./components/BudgetGoal";
import CategoryBreakdown from "./components/CategoryBreakdown";

const STORAGE_KEY = "budget_transactions";
const GOAL_KEY = "budget_goal";

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [transactions, setTransactions] = useState(() =>
    loadFromStorage(STORAGE_KEY, [])
  );
  const [goal, setGoal] = useState(() =>
    loadFromStorage(GOAL_KEY, 0)
  );

  const save = (txs) => {
    setTransactions(txs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(txs));
  };

  const addTransaction = (tx) => save([tx, ...transactions]);

  const deleteTransaction = (id) =>
    save(transactions.filter((t) => t.id !== id));

  const updateGoal = (g) => {
    setGoal(g);
    localStorage.setItem(GOAL_KEY, JSON.stringify(g));
  };

  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    let inc = 0, exp = 0;
    transactions.forEach((t) => {
      if (t.type === "income") inc += t.amount;
      else exp += t.amount;
    });
    return { totalIncome: inc, totalExpenses: exp, balance: inc - exp };
  }, [transactions]);

  return (
    <div className="app-wrapper">
      <header>
        <h1>💰 Budget Tracker</h1>
        <p>Track your income and expenses in one place.</p>
      </header>

      <SummaryCards
        balance={balance}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
      />

      <div className="main-cols">
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <TransactionForm onAdd={addTransaction} />
          <BudgetGoal
            goal={goal}
            spent={totalExpenses}
            onUpdate={updateGoal}
          />
          <CategoryBreakdown transactions={transactions} />
        </div>

        {/* Right column */}
        <TransactionList
          transactions={transactions}
          onDelete={deleteTransaction}
        />
      </div>
    </div>
  );
}
